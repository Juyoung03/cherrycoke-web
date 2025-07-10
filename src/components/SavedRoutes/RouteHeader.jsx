// src/components/SavedRoutes/RouteHeader.jsx
import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function RouteHeader({
  title,     // 경로명, ex) "홍익대학교"
  mode,      // "walk" 또는 "transit"
  isOpen,    // 카드가 펼쳐진 상태인지 boolean
  onToggle,  // 펼침/접힘 토글 콜백
}) {
  return (
    <div className="flex justify-between items-center mb-2">
      {/* 제목 */}
      <h2 className="text-lg font-medium text-gray-800">
        {title}
      </h2>

      {/* 우측: 모드 표시 + 토글 버튼 */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          {mode === "transit" ? "대중교통" : "걷기"}
        </span>
        <button
          onClick={onToggle}
          className="p-1 focus:outline-none"
          aria-label={isOpen ? "접기" : "펼치기"}
        >
          {isOpen
            ? <FaChevronUp className="text-gray-600" />
            : <FaChevronDown className="text-gray-600" />
          }
        </button>
      </div>
    </div>
  );
}