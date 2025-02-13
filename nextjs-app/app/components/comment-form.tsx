"use client";

import SigninButton from "@/app/components/signin-button";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import { z } from "zod";

const schema = z.object({
  content: z
    .string({ message: "댓글 입력란을 비워둘 수 없습니다." })
    .min(3, "3글자 이상 입력해주세요."),
});

type FormType = z.infer<typeof schema>;

const CommentForm = ({ postId }: { postId: string }) => {
  const activeAccount = useActiveAccount();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  const form = useForm<FormType>({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: FormType) => {
    if (!activeAccount) return;
    try {
      const { data: newComment } = await axios.patch(`/api/comment/${postId}`, {
        postId,
        name: activeAccount.address,
        content: data.content,
      });
      console.log(newComment);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className={"flex flex-col gap-2 items-end"}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <textarea
        disabled={!activeAccount?.address}
        className={"mb-2 p-4 rounded-xl border border-gray-100 w-full"}
        maxLength={1000}
        placeholder={
          activeAccount?.address
            ? "댓글을 작성해주세요."
            : "댓글 작성을 위해 로그인 먼저 해주세요."
        }
        {...form.register("content")}
      />
      {activeAccount?.address ? (
        <>
          <button
            className={
              "px-4 py-3 min-w-[120px] rounded-full bg-blue-500 hover:bg-blue-500/90 text-white"
            }
            type="submit"
          >
            댓글 달기
          </button>
          {/* <button onClick={() => disconnect(wallet!)}>연결해제</button> */}
        </>
      ) : (
        <SigninButton />
      )}
    </form>
  );
};

export default CommentForm;
