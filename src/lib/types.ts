export interface GenerateRequest {
  input_type: "url" | "text";
  content: string;
}

export interface InstagramPost {
  caption: string;
  hashtags: string;
}

export interface TikTokScript {
  hook: string;
  body: string;
  cta: string;
}

export interface GenerateResponse {
  twitter: string[];
  linkedin: string[];
  instagram: InstagramPost[];
  facebook: string[];
  tiktok: TikTokScript[];
}

export interface APIError {
  error: string;
  code: "MISSING_INPUT" | "SCRAPE_FAILED" | "AI_FAILED" | "RATE_LIMITED" | "INVALID_RESPONSE";
}
