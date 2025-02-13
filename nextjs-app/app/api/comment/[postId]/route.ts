import { client } from "@/sanity/lib/client";
import { uuid } from "@sanity/uuid";
import { NextRequest, NextResponse } from "next/server";

type Param = Promise<{ postId: string }>;

export async function PATCH(req: NextRequest, props: { params: Param }) {
  try {
    const { postId } = await props.params;
    const { name, content } = await req.json();

    if (!postId || !name || !content) {
      return NextResponse.json(
        { message: "올바르지 않은 payload" },
        { status: 400 }
      );
    }

    const newComment = {
      _type: "comment",
      _key: uuid(),
      name,
      content,
      timestamp: new Date().toISOString(),
    };

    const updatedPost = await client
      .patch(postId)
      .setIfMissing({ comments: [] })
      .append("comments", [newComment])
      .commit();
    return NextResponse.json(
      { message: "CommentAdded", post: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
