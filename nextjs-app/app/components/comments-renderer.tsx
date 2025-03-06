import { sanityFetch } from "@/sanity/lib/live";
import { formatDistanceToNow } from "date-fns";

export interface CommentProps {
  name: string;
  content: string;
  timestamp: string;
  edited: boolean;
  mentions: CommentProps[];
}

export default async function CommentsRenderer({ postId }: { postId: string }) {
  const { data: comments } = await sanityFetch({
    query: `*[_type == "post" && _id == $postId][0].comments`,
    params: { postId },
    perspective: "published",
    stega: false,
  });

  return (
    <div className={"flex flex-col w-full gap-3"}>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
        댓글{comments?.length === 0 ? "" : ` (${comments?.length} ?? 0)`}
      </h2>
      <hr />
      {comments?.length === 0 && <p>아직 댓글이 없습니다.</p>}
      {comments?.map((comment: CommentProps, index: number) => (
        <div
          key={index}
          className={"flex w-full items-center gap-4 justify-between"}
        >
          <p>
            <b className={"p-1 rounded-md bg-zinc-100 border mr-3"}>
              {comment.name}
            </b>
            {comment.content}
          </p>
          <small className={"text-gray-300"}>
            {formatDistanceToNow(new Date(comment.timestamp))}
          </small>
        </div>
      ))}
    </div>
  );
}
