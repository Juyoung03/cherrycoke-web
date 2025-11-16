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

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // 토큰이 없으면 바로 로그인 페이지로
      return navigate("/login");
    }
    try {
      const res = await fetch("https://cherrymap.click/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (!res.ok) {
        // 이미 로그아웃된 경우 서버가 400을 리턴
        console.warn("logout 실패:", res.status);
      }
    } catch (err) {
      console.error("로그아웃 중 오류 발생:", err);
    } finally {
      // 클라이언트 상태 무조건 정리
      localStorage.removeItem("accessToken");
      localStorage.removeItem("emergencyPhone");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-[72px]">
      <header className="fixed top-0 z-50 w-full h-[88px] flex items-center justify-between bg-white px-4">
        {view === "phone" ? (
          <button onClick={() => setView("main")} className="focus:outline-none">
            <img src={prevImg} alt="뒤로가기" className="w-[10px] h-[18px]" />
          </button>
        ) : (
          <div className="w-[10px] h-[18px]" />
        )}
        <h1 className="flex-1 text-center text-[18px] font-medium text-gray-800">
          설정
        </h1>
        <div className="w-[10px] h-[18px]" />
      </header>

      <main className="flex-1 pt-[88px] pb-[90px] overflow-auto">
        {view === "main" && <Setting onEditPhone={() => setView("phone")} />}
        {view === "phone" && <EmergencyContactEdit onDone={() => setView("main")} />}
      </main>

      <div className="absolute bottom-[85px] right-[31px]">
        <button
          onClick={handleLogout}
          className="w-[72px] h-[29px] border border-[#E7E7E7] rounded-md text-[#767676] text-[13px]"
        >
          로그아웃
        </button>
      </div>

      <Footer />
    </div>
  );
}