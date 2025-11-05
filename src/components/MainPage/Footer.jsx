// src/components/MainPage/Footer.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "../../icons/home.svg";
import NoteIcon from "../../icons/note.svg";
import SettingIcon from "../../icons/setting.svg";

export default function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isHome    = pathname === "/";
  const isRecords = pathname === "/records";
  const isSettings = pathname === "/setting";

  return (
    <>
      {/* Footer 아래 공간 가리기 */}
      <div className="fixed bottom-0 left-0 right-0 h-[34px] bg-white z-40" />
      <footer
        className="
          fixed left-0 right-0
          bottom-[34px]
          h-[57px] bg-white
          flex justify-around items-center
          z-50
        "
      >
      {/* 홈 버튼 */}
      <button
        onClick={() => navigate("/")}
        className="focus:outline-none"
      >
        <img
          src={HomeIcon}
          alt="홈"
          className={`
            w-[23px] h-[41px]
            ${isHome ? "filter brightness-0" : ""}
          `}
        />
      </button>

      {/* 기록 버튼 */}
      <button
        onClick={() => navigate("/records")}
        className="focus:outline-none"
      >
        <img
          src={NoteIcon}
          alt="기록"
          className={`
            w-[23px] h-[41px]
            ${isRecords ? "filter brightness-0" : ""}
          `}
        />
      </button>


      {/* 설정 버튼 */}
      <button
        onClick={() => navigate("/setting")}
        className="focus:outline-none"
      >
        <img
          src={SettingIcon}
          alt="설정"
          className={`w-[23px] h-[41px] ${isSettings ? "filter brightness-0" : ""}`}
        />
      </button>
    </footer>
    </>
  );
}