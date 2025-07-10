// src/components/RouteFinder/RouteFinder.jsx
import { useState } from "react";
import RouteHeader from "./RouteHeader";
import { useLocation } from "react-router-dom";

export default function RouteFinder() {
  // "walk" 또는 "transit"
  const { state } = useLocation();
  const [mode, setMode]           = useState(state?.mode ?? "transit");
  const [destination, setDestination] = useState(
    state?.destination ?? ""
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 헤더 */}
      <RouteHeader mode={mode}
      onModeChange={setMode}
      address={destination}
      />

      {/* 헤더 아래로 들어갈 실제 길찾기 콘텐츠 자리 */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">
          {mode === "walk" ? "도보 모드 콘텐츠 자리" : "대중교통 모드 콘텐츠 자리"}
        </p>
      </div>
    </div>
  );
}