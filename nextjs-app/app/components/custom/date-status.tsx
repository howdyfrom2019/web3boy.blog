"use client";

export default function DateStatus() {
  const hours = new Date().getHours();
  const dateStatus =
    hours < 12
      ? hours < 6
        ? "조용한 새벽입니다.🌙"
        : "좋은 아침입니다.☀️"
      : hours < 19
        ? "좋은 오후입니다.🥤"
        : "즐거운 저녁이네요.🍕";

  return <>{dateStatus}</>;
}
