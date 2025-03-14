import { Suspense } from "react";

import DateStatus from "@/app/components/custom/date-status";
import { AllPosts } from "@/app/components/Posts";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-100 from-0% via-white via-30%  relative">
        <div className="bg-gradient-to-b from-white w-full h-40 absolute top-0"></div>
        <div className="bg-gradient-to-t from-white w-full h-40 absolute bottom-0"></div>
        <div className="container relative">
          <div className="mr-auto max-w-2xl py-20 lg:max-w-4xl">
            <div className="flex flex-col gap-4">
              <div className="text-sm leading-6 flex items-center gap-2">
                {["frontend", "blockchain", "node.js"].map((val) => (
                  <div
                    className={"px-2 py-1 rounded-2xl bg-blue-600 text-white"}
                    key={val}
                  >
                    {val}
                  </div>
                ))}
              </div>
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-black flex items-center">
                <em className="text-blue-500 not-italic whitespace-pre">
                  웹3보이
                </em>
                <p className="text-[#000] whitespace-pre"> 의 결과노트</p>
              </h1>
            </div>
            <div className="flex flex-col mt-6 space-y-2 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700">
              <p>
                {<DateStatus />} 전 Web3와 블록체인에 관심이 많은 프로덕트
                엔지니어입니다. 제가 가장 자신있어하는 영역은 비기술적인
                요구사항을 사용자 경험까지 이어주는 일입니다. 이 블로그에서는
                제가 고민했던 내용 중 한국 빌더분들에게 도움이 될 만한 내용을
                모아서 정리하고 있습니다.
              </p>
              <Link
                className={
                  "flex items-center gap-2 hover:underline hover:underline-offset-4 text-blue-500 font-medium text-sm md:text-base mr-auto"
                }
                href={"/about"}
              >
                More about me
                <svg
                  className={"stroke-blue-500"}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-10">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>{await AllPosts()}</Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
