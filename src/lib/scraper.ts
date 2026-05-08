import { JSDOM } from "jsdom";

// Dynamic import because readability is ESM-only
export async function scrapeUrl(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "ContentRepurposer/1.0 (bot)",
      Accept: "text/html",
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status}`);
  }

  const html = await response.text();
  const doc = new JSDOM(html, { url });
  const { Readability } = await import("@mozilla/readability");

  const reader = new Readability(doc.window.document);
  const article = reader.parse();

  if (article?.textContent) {
    return article.textContent.slice(0, 5000);
  }

  // Fallback: meta description + body text
  const metaDesc = doc.window.document.querySelector(
    'meta[name="description"]'
  );
  const bodyText = doc.window.document.body?.textContent || "";
  const fallback =
    (metaDesc?.getAttribute("content") || "") + "\n\n" + bodyText;
  return fallback.trim().slice(0, 5000);
}
