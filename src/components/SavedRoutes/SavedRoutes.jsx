// src/components/SavedRoutes/SavedRoutes.jsx
import React, { useState, useEffect } from "react";
import SavedRouteItem from "./SavedRouteItem";
import { FaChevronDown } from "react-icons/fa";
import { getSavedRoutes } from "../../api/routes";

export default function SavedRoutes({ providerId }) {
  // 로딩 / 에러 / 원본 데이터 상태
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 정렬 상태: "latest" 또는 "oldest"
  const [sortOrder, setSortOrder] = useState("latest");
  const toggleSort = () => {
    setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
  };

  // 백엔드에서 저장된 경로 가져오기
  useEffect(() => {
    if (!providerId) {
      setError("유효한 사용자 ID가 필요합니다.");
      setLoading(false);
      return;
    }
    setLoading(true);
    getSavedRoutes(providerId)
      .then((data) => {
        setRoutes(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "경로 목록을 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => setLoading(false));
  }, [providerId]);

  // 로딩/에러 표시
  if (loading) {
    return <div className="py-4 text-center text-gray-500">로딩 중...</div>;
  }
  if (error) {
    return <div className="py-4 text-center text-red-500">{error}</div>;
  }

  // 정렬 로직 (date 필드 기반)
  const sortedData = [...routes];
  if (sortOrder === "latest") {
    sortedData.sort((a, b) => (b.date || 0) - (a.date || 0));
  } else {
    sortedData.sort((a, b) => (a.date || 0) - (b.date || 0));
  }

  return (
    <section className="mt-8">
      {/* 제목 */}
      <h2 className="text-xl font-medium text-gray-800">저장된 길</h2>

      {/* 카운트 + 정렬 토글 */}
      <div className="flex items-center justify-between text-[15px] text-gray-600 mb-4">
        <span>{routes.length}개</span>
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