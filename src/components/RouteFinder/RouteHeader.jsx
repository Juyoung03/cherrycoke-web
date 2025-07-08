// src/components/RouteFinder/RouteHeader.jsx
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

export default function RouteHeader({ mode, onModeChange }) {
  const nav = useNavigate();

  return (
    <div className="flex items-center bg-white px-4 py-3 shadow-sm">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => nav(-1)}
        className="p-2 focus:outline-none"
        aria-label="뒤로가기"
      >
        <FaChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      {/* 걷기 / 대중교통 토글 */}
      <div className="flex-1 flex justify-center items-center space-x-4">
        <button
          onClick={() => onModeChange("walk")}
          className={`text-sm font-medium focus:outline-none ${
            mode === "walk" ? "text-black" : "text-gray-400"
          }`}
        >
          걷기
        </button>
        <button
          onClick={() => onModeChange("transit")}
          className={`text-sm font-medium focus:outline-none ${
            mode === "transit" ? "text-black" : "text-gray-400"
          }`}
        >
          대중교통
        </button>
      </div>

      {/* 우측 빈 공간 (정렬용) */}
      <div className="w-6" />
    </div>
  );
}