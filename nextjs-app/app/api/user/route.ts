import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const walletAddress = req.nextUrl.searchParams.get("walletAddress");

  if (!walletAddress) {
    return NextResponse.json({ message: "Invalid parameter" }, { status: 400 });
  }
  const query = groq`*[_type == "user" && userId == $userId][0]`;
  const user = await client.fetch(query, { userId: walletAddress });
  return NextResponse.json({ user: user ?? null }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { walletAddress, provider, name } = await req.json();

  try {
    const newUser = {
      _type: "user",
      userId: walletAddress,
      name,
      createdAt: new Date().toISOString(),
      authProvider: provider,
    };

    const createdUser = await client.create(newUser);

    return NextResponse.json({ user: createdUser }, { status: 200 });
  } catch (error) {
    console.error("Error adding new user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
