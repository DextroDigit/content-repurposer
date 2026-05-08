import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    hasDeepSeekKey: !!process.env.DEEPSEEK_API_KEY,
    hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
    nodeVersion: process.version,
  });
}
