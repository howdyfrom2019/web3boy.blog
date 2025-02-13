import { client } from "@/sanity/lib/client";

export async function addComment({
  postId,
  name,
  content,
}: {
  postId: string;
  name: string;
  content: string;
}) {
  const newComment = {
    _type: "comment",
    name,
    content,
    timestamp: new Date().toISOString(),
  };

  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append("comments", [newComment])
    .commit();
}

export async function getComments(postId: string) {
  const query = `*[_type == "post" && _id == $postId][0].comments`;
  return client.fetch(query, { postId });
}
