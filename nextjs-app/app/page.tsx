import { Suspense } from "react";

import { AllPosts } from "@/app/components/Posts";

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
                안녕하세요! 블록체인 도메인에 관심이 많은 프론트엔드
                엔지니어입니다. 제가 가장 자신있어하는 영역은 비기술적인
                요구사항을 사용자 경험까지 이어주는 일입니다. 프리랜서,
                파트타임, 풀타임 모든 협업과 합류제안에 열려있습니다.
              </p>
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
