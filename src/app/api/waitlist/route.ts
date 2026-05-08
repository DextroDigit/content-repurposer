import { NextRequest, NextResponse } from "next/server";

// In-memory store for development (Vercel Blob in production)
// Uses Vercel Blob when BLOB_READ_WRITE_TOKEN is set
const devStore: string[] = [];

export async function POST(request: NextRequest) {
  let email: string;

  try {
    const json = await request.json();
    email = json.email?.trim().toLowerCase();
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 }
    );
  }

  try {
    // Try Vercel Blob if available, fall back to in-memory for dev
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import("@vercel/blob");
      const key = `waitlist/${email.replace(/[^a-z0-9]/g, "-")}.json`;
      await put(key, JSON.stringify({ email, joinedAt: new Date().toISOString() }), {
        access: "public",
        contentType: "application/json",
      });
    } else {
      if (devStore.includes(email)) {
        return NextResponse.json({
          message: "You're already on the list!",
          alreadyJoined: true,
        });
      }
      devStore.push(email);
    }

    return NextResponse.json({
      message: "You're on the list! Generating your posts...",
      alreadyJoined: false,
    });
  } catch (err) {
    // If Blob fails in dev without token, still return success
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      if (!devStore.includes(email)) {
        devStore.push(email);
      }
      return NextResponse.json({
        message: "You're on the list! Generating your posts...",
        alreadyJoined: devStore.indexOf(email) !== devStore.lastIndexOf(email),
      });
    }
    return NextResponse.json(
      { error: "Failed to save email. Try again." },
      { status: 500 }
    );
  }
}
