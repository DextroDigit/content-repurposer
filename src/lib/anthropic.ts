import { SYSTEM_PROMPT } from "./prompts";
import type { GenerateResponse } from "./types";

function getConfig() {
  const isDeepSeek =
    !!process.env.DEEPSEEK_API_KEY || !process.env.ANTHROPIC_API_KEY;

  const apiKey = process.env.DEEPSEEK_API_KEY || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing API key. Set DEEPSEEK_API_KEY or ANTHROPIC_API_KEY in .env.local"
    );
  }

  return {
    apiKey,
    isDeepSeek,
    baseUrl: isDeepSeek
      ? "https://api.deepseek.com/anthropic/v1/messages"
      : "https://api.anthropic.com/v1/messages",
    model: isDeepSeek ? "deepseek-chat" : "claude-sonnet-4-20250514",
  };
}

export async function generateContent(
  articleText: string
): Promise<GenerateResponse> {
  const { apiKey, isDeepSeek, baseUrl, model } = getConfig();

  const body: Record<string, unknown> = {
    model,
    max_tokens: 4096,
    temperature: 0.8,
    system: [{ type: "text", text: SYSTEM_PROMPT }],
    messages: [
      {
        role: "user",
        content: `Here is the article to repurpose:\n\n${articleText}`,
      },
    ],
  };

  if (!isDeepSeek) {
    (body.system as Record<string, unknown>[])[0].cache_control = {
      type: "ephemeral",
    };
  }

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(
      `API request failed (${response.status}): ${errText.slice(0, 200)}`
    );
  }

  const data = await response.json();
  const text: string = data.content
    .filter((block: { type: string }) => block.type === "text")
    .map((block: { text: string }) => block.text)
    .join("\n");

  let parsed: GenerateResponse;
  try {
    parsed = JSON.parse(text);
  } catch {
    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/, "")
      .replace(/\s*```$/, "")
      .trim();
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      throw new Error("Failed to parse AI response as JSON");
    }
  }

  if (
    !Array.isArray(parsed.twitter) ||
    !Array.isArray(parsed.linkedin) ||
    !Array.isArray(parsed.instagram) ||
    !Array.isArray(parsed.facebook) ||
    !Array.isArray(parsed.tiktok)
  ) {
    throw new Error("AI response missing required fields");
  }

  return parsed;
}
