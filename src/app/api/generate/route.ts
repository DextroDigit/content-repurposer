import { NextRequest, NextResponse } from "next/server";
import { scrapeUrl } from "@/lib/scraper";
import { generateContent } from "@/lib/anthropic";
import { checkRateLimit } from "@/lib/rate-limiter";
import type { APIError } from "@/lib/types";

export async function POST(request: NextRequest) {
  // Get client IP for rate limiting
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    const body: APIError = {
      error: "Rate limit reached. You get 5 generations per hour. Try again later.",
      code: "RATE_LIMITED",
    };
    return NextResponse.json(body, { status: 429 });
  }

  // Parse request body
  let inputType: "url" | "text";
  let content: string;

  try {
    const json = await request.json();
    inputType = json.input_type;
    content = json.content;
  } catch {
    const body: APIError = {
      error: "Invalid request body. Expected JSON with input_type and content.",
      code: "MISSING_INPUT",
    };
    return NextResponse.json(body, { status: 400 });
  }

  if (!content || typeof content !== "string" || content.trim().length === 0) {
    const body: APIError = {
      error: "Please provide content to repurpose.",
      code: "MISSING_INPUT",
    };
    return NextResponse.json(body, { status: 400 });
  }

  if (content.length > 10000) {
    const body: APIError = {
      error: "Content is too long. Maximum 10,000 characters.",
      code: "MISSING_INPUT",
    };
    return NextResponse.json(body, { status: 400 });
  }

  // Scrape if URL, use directly if text
  let articleText: string;
  try {
    if (inputType === "url") {
      articleText = await scrapeUrl(content.trim());
      if (!articleText || articleText.trim().length < 50) {
        const body: APIError = {
          error: "Couldn't extract enough content from that URL. Try pasting the text directly.",
          code: "SCRAPE_FAILED",
        };
        return NextResponse.json(body, { status: 400 });
      }
    } else {
      articleText = content.trim();
    }
  } catch (err) {
    const body: APIError = {
      error:
        err instanceof Error
          ? `Failed to scrape URL: ${err.message}`
          : "Failed to scrape URL. Try pasting the text directly.",
      code: "SCRAPE_FAILED",
    };
    return NextResponse.json(body, { status: 400 });
  }

  // Generate content via Claude
  try {
    const result = await generateContent(articleText);
    return NextResponse.json(result, {
      status: 200,
      headers: {
        "X-RateLimit-Remaining": String(rateCheck.remaining),
      },
    });
  } catch (err) {
    const body: APIError = {
      error:
        err instanceof Error
          ? `AI generation failed: ${err.message}`
          : "AI generation failed. Please try again.",
      code: "AI_FAILED",
    };
    return NextResponse.json(body, { status: 500 });
  }
}
