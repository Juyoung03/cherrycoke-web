// src/components/SavedRoutes/SavedRouteItem.jsx
import React, { useState } from "react";
import { useNavigate }     from "react-router-dom";
import RouteHeader         from "./RouteHeader";
import RouteReactions      from "./RouteReactions";

export default function SavedRouteItem({ route }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(prev => !prev);
  const navigate = useNavigate();

  // “바로 안내시작” 버튼 클릭 핸들러
  const handleStart = (e) => {
      e.stopPropagation(); // 카드 클릭 토글과 겹치지 않도록
      if (route.mode === "walk") {
        navigate(`/routeguide/walk/${route.id}`);
      } else {
        navigate(`/routeguide/transit/${route.id}`);
      }
    };

  return (
    <div
      onClick={handleToggle}                         /* 카드 전체 클릭 시 토글 */
      className={`
        bg-white p-4 rounded-[10px] border
        ${isOpen ? "border-[#FF2655]" : "border-gray-200"}
        cursor-pointer                               /* 클릭 커서 표시 */
      `}
    >
      {/* 카드 상단: 제목, 모드, 펼치기 토글 */}
      <RouteHeader
        title={route.name}
        mode={route.mode}
        isOpen={isOpen}
        onToggle={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
      />

      {/* 펼쳐졌을 때 보일 리액션 및 날짜 */}
      {isOpen && (
        <div className="mt-2 mb-4 ">
          <RouteReactions reactions={route.reactions} />
        </div>
      )}

      {/* 바로 안내시작 버튼 */}
      <button
        onClick={handleStart}
        className={`
          w-full 
          px-4 py-3
          text-center text-[#FF2655] font-medium
          border-t border-gray-200
          hover:bg-gray-50 
          transition
        `}
      >
        바로 안내 시작
      </button>
    </div>
  );
}