// src/pages/SettingPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import prevImg from "../icons/prevImg.svg";
import Setting from "../components/SettingPage/Setting";
import EmergencyContactEdit from "../components/SettingPage/EmergencyContactEdit";
import Footer  from "../components/MainPage/Footer";

export default function SettingPage() {
  const navigate = useNavigate();
  const [view, setView] = useState("main");

  const title = view === "main" ? "설정" : "비상 연락처";

  // ① 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("이미 로그아웃 상태입니다.");

      // 1) 서버에 로그아웃 요청
      const res = await fetch("https://cherrymap.click/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 서버가 Authorization 헤더를 기대한다면 Bearer 토큰으로 전달
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",  // 쿠키 기반 리프레시 토큰도 같이 만료시키려면
      });
      if (!res.ok) {
        console.warn(`logout 실패: ${res.status}`);
        // 그래도 클라이언트에서 토큰 날리고 리다이렉트
      }

      // 2) 로컬 스토리지 정리
      localStorage.removeItem("accessToken");
      localStorage.removeItem("emergencyPhone");
      // (필요한 다른 키들도 모두 제거)
    } catch (err) {
      console.error("로그아웃 중 오류 발생:", err);
    } finally {
      // 3) 로그인 페이지로 이동
      navigate("/login");
    }
  };

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
          onClick={() => {
            if (view === "phone") {
              setView("main");
            } else {
              navigate(-1);
            }
          }}
          className="focus:outline-none"
          aria-label="뒤로가기"
        >
          <img src={prevImg} alt="뒤로가기" className="w-[10px] h-[18px]" />
        </button>
        
        {/* 중앙 타이틀 */}
        <h1 className="flex-1 text-center text-[18px] font-medium text-gray-800">
          설정
        </h1>

        {/* 오른쪽 빈 공간 (왼쪽 버튼과 같은 크기) */}
        <div className="w-[10px] h-[18px]" />
      </header>

      {/* ─────────── 메인 컨텐츠 ─────────── */}
      <main className="flex-1 pt-[88px] pb-[49px] overflow-auto">
        {view === "main" && (
          <Setting onEditPhone={() => setView("phone")} />
        )}
        {view === "phone" && (
          <EmergencyContactEdit
            onDone={() => setView("main")}
          />
        )}
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