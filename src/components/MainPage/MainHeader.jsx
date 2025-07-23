// src/components/MainPage/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();    

  return (
    <header
      className="
        fixed top-0 z-50
        h-[88px]            /* 높이 88px */
        w-full
        flex items-center   /* 세로 중앙 정렬 */
        justify-between     /* 좌우 요소 간격 */
        px-6                /* 좌우 패딩 */
        bg-white            /* 배경 흰색 */
      "
    >

     {/* 실제 로고 이미지 */}
     <img
       src="/cherry-favicon.svg" 
       alt="Cherry Logo"
       className="
         w-[46px] h-[46px]
         rounded-md
         flex-shrink-0
       "
     />

      {/* 우측 로그인 버튼 */}
      <button
        onClick={() => navigate("/login")}
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