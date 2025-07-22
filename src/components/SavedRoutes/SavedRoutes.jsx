// src/components/SavedRoutes/SavedRoutes.jsx
import React, { useState, useEffect } from "react";
import SavedRouteItem from "./SavedRouteItem";
import { FaChevronDown } from "react-icons/fa";
import { getSavedRoutes, deleteSavedRoute} from "../../api/routes";

export default function SavedRoutes() {
  // 로딩 / 에러 / 원본 데이터 상태
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [endLat, setEndLat] = useState(null);
  // const [endLng, setEndLng] = useState(null);
  // const [endName, setEndName] = useState(null);

  // 정렬 상태: "latest" 또는 "oldest"
  const [sortOrder, setSortOrder] = useState("latest");
  const toggleSort = () => {
    setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
  };

  // — 여기서 providerId 조건 제거 — 
  useEffect(() => {
    setLoading(true);
    getSavedRoutes()
      .then((data) => setRoutes(data))
      .catch((err) => {
        console.error(err);
        setError(err.message || "경로 목록을 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => setLoading(false));
  }, []);

  // 로딩/에러 표시
  if (loading) return <div className="py-4 text-center text-gray-500">로딩 중...</div>;
  if (error)   return <div className="py-4 text-center text-red-500">{error}</div>;

  // 정렬 로직 (date 필드 기준)
  const sortedData = [...routes].sort((a, b) =>
    sortOrder === "latest"
      ? (b.date || 0) - (a.date || 0)
      : (a.date || 0) - (b.date || 0)
  );

  // 삭제 핸들러
  const handleDelete = async (id) => {
    try {
      await deleteSavedRoute(id);
      setRoutes((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      console.error("삭제 실패", e);
      alert("삭제에 실패했습니다.");
    }
  };

  // const handleStart = async (id) => {
  //   try {
  //     const data = await sendSavedRoute(id);
  //     setEndName(data.endName);
  //     setEndLat(data.endLat);
  //     setEndLng(data.endLng);
  //   } catch (e) {
  //   console.error("경로 시작 실패", e);
  //   alert("경로 시작에 실패했습니다.");
  //   }
  // }
// console.log(endName, endLat, endLng);
  return (
    <section className="mt-8">
      <h2 className="text-xl font-medium text-gray-800">저장된 길</h2>

      <div className="flex items-center justify-between text-[15px] text-gray-600 mb-4">
        <span>{routes.length}개</span>
        <button onClick={toggleSort} className="flex items-center gap-1 focus:outline-none">
          {sortOrder === "latest" ? "최신순" : "오래된순"}
          <FaChevronDown className="text-gray-600" />
        </button>
      </div>

      <div className="space-y-4">
        {sortedData.map((route) => (
          <SavedRouteItem
            key={route.id}
            route={route}
            onDelete={() => handleDelete(route.id)}
            // onClick={() => handleStart(route.id)}
          />
        ))}
      </div>
    </section>
  );
}