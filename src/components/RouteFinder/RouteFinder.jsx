// src/components/RouteFinder/RouteFinder.jsx
import { useState }      from "react";
import { useLocation }   from "react-router-dom";
import RouteHeader       from "./RouteHeader";
import RouteFooter       from "./RouteFooter";  // ① RouteFooter 임포트

export default function RouteFinder() {
  const { state } = useLocation();
  const [mode, setMode] = useState(state?.mode ?? "transit");
  const [destination]  = useState(state?.destination ?? "");

  // 예시용: 대중교통 39분, 오후 12:30 / 도보 12분, 오전 11:45, 거리 1.2km
  const duration    = mode === "walk" ? 12 : 39;
  const arrivalTime = mode === "walk" ? "11:45" : "12:30";
  const distance    = mode === "walk" ? "1.2km" : undefined;

  const handleStart = () => {
    // 안내 시작 눌렀을 때 로직
    console.log("안내 시작!", { mode, destination });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 1) 헤더 */}
      <RouteHeader
        mode={mode}
        onModeChange={setMode}
        address={destination}
      />

      {/* 2) 실제 콘텐츠 영역 */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">
          {mode === "walk" ? "도보 모드 콘텐츠 자리" : "대중교통 모드 콘텐츠 자리"}
        </p>
      </div>

      {/* 3) RouteFooter: flex-컬럼의 마지막, 고정 아래 배치 */}
      <RouteFooter
        mode={mode}
        duration={duration}
        arrivalTime={arrivalTime}
        distance={distance}
        onStartNavigation={handleStart}
      />
    </div>
  );
}