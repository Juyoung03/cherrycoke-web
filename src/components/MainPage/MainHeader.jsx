// src/components/MainPage/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import CallIcon from "../../icons/call.svg";

export default function Header() {
  const navigate = useNavigate();    
  
  const handleEmergencyClick = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      // 로그인 되어 있지 않으면 로그인 페이지로
      return navigate("/login");
    }

    try {
      // 1) 비상연락처 조회 API 호출
      const res = await fetch(
        `https://cherrymap.click/api/${userId}/phone`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // swagger 예시가 "string" 형태이므로 res.json() 으로 파싱하면 문자열이 나옵니다.
      const phone = await res.json(); 

      // 2) tel: URL 열기
      window.location.href = `tel:${phone}`;
    } catch (err) {
      console.error("비상연락처 조회 실패", err);
      alert("비상연락처를 가져오는 데 실패했습니다.");
    }
  };

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

      <button
        onClick={handleEmergencyClick}
        className="p-0 focus:outline-none"
        aria-label="비상연락망"
      >
        <img
          src={CallIcon}
          alt="비상연락망"
          className="w-[26px] h-[32px]"
        />
      </button>
    </header>
  );
}