// src/components/SavedRoutes/EditHeader.jsx
import React from "react";
import PrevImg from "../../icons/prevImg.svg";

export default function EditHeader({ onBack }) {
  return (
    <header className="
      fixed top-0 left-0 w-full bg-white
      px-4 py-[27px] z-10
      flex items-center">
      <button
        onClick={onBack}
        className="p-2 focus:outline-none"
        aria-label="뒤로가기"
      >
        <img
          src={PrevImg}
          alt="뒤로가기"
          className="w-[10px] h-[18px]"
        />
      </button>
      <h1 className="flex-1 text-center text-lg font-medium text-gray-800">
        수정하기
      </h1>
      {/* 오른쪽 빈 공간: 균형용 */}
      <div className="w-8" />
    </header>
  );
}