// src/components/SavedRoutes/SavedRoutes.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import EditIcon from "../../icons/edit.svg";
import SavedRouteItem from "./SavedRouteItem";
import { FaChevronDown } from "react-icons/fa";
import { getSavedRoutes, deleteSavedRoute} from "../../api/routes";

export default function SavedRoutes() {
  const navigate = useNavigate();
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
  if (loading) return <div className="py-4 text-center text-gray-500">잠시만 기다려주세요...</div>;
  if (error) {
    // 에러가 났으면 로그인 페이지로 보내기
    return <Navigate to="/login" replace />;
  }

  // 정렬 로직 (date 필드 기준)
  // 최신순: id 내림차순, 오래된순: id 오름차순
   const sortedData = [...routes].sort((a, b) => {
     return sortOrder === "latest"
       ? b.id - a.id
       : a.id - b.id;
   });

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

  return (
    <section className="mt-8">
    {/* ───────────────────── 헤더 ───────────────────── */}
    <div className="flex items-center justify-start mb-2">
  <h2 className="text-[20px] font-medium text-[#272727]">저장된 길</h2>

  {/* 세로 구분선 (양옆 9px 패딩) */}
  <div className="px-[9px]">
    <span
      className="block w-[1px] h-[13px] bg-[#DBDBDB]"
      aria-hidden="true"
    />
  </div>

  <button
   type="button"
   onClick={() => navigate("/edit", { state: { sortOrder } })}
   className="flex items-center gap-1 focus:outline-none"
 >
    <img
      src={EditIcon}
      alt="삭제하기"
      className="w-[12px] h-[11.18px]"
    />
    <span className="text-[15px] text-[#939393]">길 지우기</span>
  </button>
</div>
      {/* ───────────────────── 카운트 & 정렬 ───────────────────── */}
      <div className="flex items-center justify-between text-[15px] text-gray-600 mb-4">
        <span>{routes.length}개</span>
        <button onClick={toggleSort} className="flex items-center gap-1 focus:outline-none">
          {sortOrder === "latest" ? "최신순" : "오래된순"}
          <FaChevronDown className="text-gray-600" />
        </button>
      </div>

     {/* ───────────────────── 리스트 ───────────────────── */}
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