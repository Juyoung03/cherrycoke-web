// src/components/SavedRoutes/SavedRoutes.jsx
import React, { useState } from "react";
import SavedRouteItem from "./SavedRouteItem";
import { FaChevronDown } from "react-icons/fa";

export default function SavedRoutes({ data = [] }) {
  // 정렬 상태: "latest" 또는 "oldest"
  const [sortOrder, setSortOrder] = useState("latest");
  const toggleSort = () => {
    setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
  };

  // 실제 정렬 로직 (예시: date 프로퍼티 기준)
  const sortedData = [...data];
  if (sortOrder === "latest") {
    sortedData.sort((a, b) => (b.date || 0) - (a.date || 0));
  } else {
    sortedData.sort((a, b) => (a.date || 0) - (b.date || 0));
  }

  return (
    <section className="mt-8">
      {/* 제목 */}
      <h2 className="text-lg font-medium text-gray-800">저장된 길</h2>

      {/* 카운트 + 정렬 토글 */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <span>{data.length}개</span>
        <button
          type="button"
          onClick={toggleSort}
          className="flex items-center gap-1 focus:outline-none"
        >
          {sortOrder === "latest" ? "최신순" : "오래된순"}
          <FaChevronDown className="text-gray-600" />
        </button>
      </div>

      {/* 리스트 */}
      <div className="space-y-4">
        {sortedData.map((route) => (
          <SavedRouteItem key={route.id} route={route} />
        ))}
      </div>
    </section>
  );
}