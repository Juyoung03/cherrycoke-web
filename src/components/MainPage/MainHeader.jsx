// src/components/MainPage/MainHeader.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import CallIcon from "../../icons/call.svg";
import { getEmergencyContact } from "../../api/member";

export default function Header() {
  const navigate = useNavigate();    

  const handleEmergencyClick = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return navigate("/login");
  
    let phone = localStorage.getItem("emergencyPhone");
    if (!phone) {
      // 로컬에 없으면 API 로 다시 한 번 시도
      try {
        const data = await getEmergencyContact();
        phone = data.phoneNumber;
        if (phone) localStorage.setItem("emergencyPhone", phone);
      } catch (err) {
        console.error("비상연락망 조회 실패:", err);
        return alert("저장된 번호가 없습니다.");
      }
    }
  
    // 이제 진짜 전화 걸기
    window.location.href = `tel:${phone}`;
  };

  return (
    <header
      className="
        fixed top-0 z-50
        h-[88px] w-full
        flex items-center justify-between
        px-6 bg-white
      "
    >
      {/* 로고 */}
      <img
        src="/cherry-favicon.svg"
        alt="Cherry Logo"
        className="w-[46px] h-[46px] rounded-md flex-shrink-0"
      />

      {/* 비상연락망 버튼 */}
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