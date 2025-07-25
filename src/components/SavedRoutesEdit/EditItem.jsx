// src/components/SavedRoutes/SavedRouteItem.jsx
import React from "react";
import DeleteIcon from "../../icons/delete.svg";

export default function EditItem({ route, onDelete }) {
  return (
    <li className="
      flex items-center justify-between 
      bg-white border border-gray-200 
      rounded-lg p-4
    ">
      {/* 1) 왼쪽: 경로 이름 */}
      <p className="text-[17px] font-medium text-gray-800">
        {route.routeName || route.name}
      </p>

      {/* 2) 오른쪽: 모드 텍스트 + 삭제 버튼 */}
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-[#FF2655]">
          {route.mode === "walk" ? "걷기" : "대중교통"}
        </span>
        <button
          onClick={onDelete}
          className="p-2 focus:outline-none"
          aria-label="삭제"
        >
          <img
            src={DeleteIcon}
            alt="삭제"
            className="w-[11px] h-[11px]"
          />
        </button>
      </div>
    </li>
  );
}