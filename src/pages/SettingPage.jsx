// src/pages/SettingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import prevImg from "../icons/prevImg.svg";
import Setting from "../components/SettingPage/Setting";
import Footer  from "../components/MainPage/Footer";

export default function SettingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white pb-[57px]">
      {/* ─────────── 헤더 (직접 그리기) ─────────── */}
      <header
        className="
          fixed top-0 z-50
          w-full h-[88px]
          flex items-center justify-between
          bg-white
          px-4
        "
      >
        {/* 뒤로가기 */}
        <button
          onClick={() => navigate(-1)}
          className="focus:outline-none"
          aria-label="뒤로가기"
        >
          <img
            src={prevImg}
            alt="뒤로가기"
            className="w-[10px] h-[18px]"
          />
        </button>
        {/* 중앙 타이틀 */}
        <h1 className="flex-1 text-center text-[18px] font-medium text-gray-800">
          설정
        </h1>

        {/* 오른쪽 빈 공간 (왼쪽 버튼과 같은 크기) */}
        <div className="w-[10px] h-[18px]" />
      </header>

      {/* ─────────── 메인 컨텐츠 ─────────── */}
      <main className="flex-1 pt-[88px] pb-[49px]">
        <Setting />
      </main>

      {/* 로그아웃 버튼 */}
      <div className="absolute bottom-[67px] right-[31px]">
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="w-[72px] h-[29px] border border-[#E7E7E7] rounded-md text-[#767676] text-[13px]"
        >
          로그아웃
        </button>
      </div>

      {/* ─────────── 푸터 ─────────── */}
      <Footer />
    </div>
  );
}