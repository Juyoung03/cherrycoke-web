// src/components/Header/Header.jsx
import React from "react";

export default function Header() {
  return (
    <header
      className="
        h-[88px]            /* 높이 88px */
        w-full
        flex items-center   /* 세로 중앙 정렬 */
        justify-between     /* 좌우 요소 간격 */
        px-6                /* 좌우 패딩 */
        bg-white            /* 배경 흰색 */
        shadow-md           /* 그림자 */
      "
    >
      {/* 회색 박스 로고 플레이스홀더 */}
      <div
        className="
          w-[46px] h-[46px]    /* 46×46px */
          bg-gray-300          /* 회색 배경 */
          rounded-md           /* 모서리 둥글게 */
          flex-shrink-0
        "
      />

      {/* 우측 로그인 버튼 (필요시 교체) */}
      <button
        onClick={() => {/* 로그인 페이지 이동 로직 */}}
        className="
          px-3 py-1
          text-sm font-medium
          text-gray-600
          hover:text-gray-800
          transition
        "
      >
        로그인
      </button>
    </header>
  );
}