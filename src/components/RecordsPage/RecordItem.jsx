// src/pages/RecordsPage/RecordItem.jsx
import React from "react";

export default function RecordItem({ icon, label, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative inline-flex flex-col items-center justify-start w-[63px] h-[78px] cursor-pointer"
    >
        
      {/* 선택 시 아이콘 뒤에 보일 114×114 원형 배경 */}
      {selected && (
        <div
          className="absolute inset-1/2 w-[114px] h-[114px] -translate-x-1/2 -translate-y-1/2
                     bg-[#FFF5F7] rounded-full"
        />
      )}

      {/* 실제 아이콘 이미지: layout 영향을 주는 요소 */}
      <img src={icon} alt={label} className="z-10 w-[63px] h-[53px]" />
      <div className="h-[7px]" />
      <span
        className={`
          z-10 w-[63px] h-[18px] text-center text-sm leading-[18px]
          ${selected ? "text-[#4C3B3F]" : "text-[#B4989E]"}
        `}
      >
        {label}
      </span>
    </div>
  );
}