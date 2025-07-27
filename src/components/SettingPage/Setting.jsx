// src/components/SettingPage/Setting.jsx
import React from "react";
import nextImg from "../../icons/nextImg.svg";
import { useNavigate } from "react-router-dom";

export default function Setting() {
  const navigate = useNavigate();

  return (
    <main className="relative flex-1 w-full flex flex-col items-center pt-0 px-4">
      {/* 프로필 */}
      <div className="flex w-full h-[52px] justify-between items-center mt-[34px]">
        <div>
          <p className="text-[24px]">OOO님</p>
          <p className="text-[#979797] text-[15px]">id</p>
        </div>
        <img src={nextImg} alt="more info" className="w-[10px]" />
      </div>

      {/* 내 정보 섹션 */}
      <section className="w-full mt-[43px]">
        <p className="text-[#909090] mb-[15px]">내 정보</p>
        <div className="flex w-full h-[21px] justify-between items-center mb-[13px]">
          <p className="text-lg">비밀번호</p>
          <img src={nextImg} alt="more info" className="w-[10px]" />
        </div>
        <hr className="border-[#ECECEC]" />
        <div className="flex w-full h-[21px] justify-between items-center mt-[13px]">
          <p className="text-lg">비상 연락처</p>
          <img src={nextImg} alt="more info" className="w-[10px]" />
        </div>
      </section>

      {/* 음성 지원 섹션 */}
      <section className="w-full mt-[43px]">
        <p className="text-[#909090] mb-[15px]">음성 지원</p>
        <div className="flex w-full h-[21px] justify-between items-center mb-[13px]">
          <p className="text-lg">안내 음성</p>
          <img src={nextImg} alt="more info" className="w-[10px]" />
        </div>
        <hr className="border-[#ECECEC]" />
        <div className="flex w-full h-[21px] justify-between items-center mt-[13px]">
          <p className="text-lg">음성 크기 조절</p>
          <div className="flex items-center">
            <p className="text-[17px] text-[#909090] mr-[5px]">크게</p>
            <img src={nextImg} alt="more info" className="w-[10px]" />
          </div>
        </div>
      </section>

    </main>
  );
}