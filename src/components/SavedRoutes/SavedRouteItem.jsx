// src/components/SavedRoutes/SavedRouteItem.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RouteHeader        from "./RouteHeader";
import RouteReactions     from "./RouteReactions";
import { sendSavedRoute } from "../../api/routes";

export default function SavedRouteItem({ route }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((p) => !p);
  const navigate = useNavigate();

/** 바로 안내 시작 → /map 이동 */
const handleStart = async (e) => {
  e.stopPropagation(); // 카드 토글과 충돌 방지

  // 1) 먼저 sendSavedRoute 호출해서 backend 로부터 정확한 destination, endLat, endLng 을 받아옵니다.
  let dest, lat, lng;
  try {
    ({ destination: dest, endLat: lat, endLng: lng } = await sendSavedRoute(route.id));
  } catch (err) {
    console.error("sendSavedRoute 실패:", err);
    // 그래도 최소한 리스트에 있던 기본값이라도 쓰려면 route 객체에 기록해두셨으면 꺼내 씁니다.
    dest = route.destination || route.name;
    lat  = route.endLat;
    lng  = route.endLng;
  }

  // 2) geolocation 으로 출발 좌표를 얻고, → navigate
  const go = (startLat = null, startLng = null) => {
    navigate("/map", {
      state: {
        mode:        route.mode === "도보" || route.mode === "walk" ? "walk" : "transit",
        destination: dest,
        endLat:      lat,
        endLng:      lng,
        startLat,
        startLng,
      },
    });
  };

  if (!navigator.geolocation) {
    go();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => go(coords.latitude, coords.longitude),
    ()             => go(),
    { enableHighAccuracy: true, timeout: 5000 }
  );
};


return (
  <div
    onClick={toggle}
    className={`
      bg-white rounded-[10px] border
      ${isOpen ? "border-[#FF2655]" : "border-gray-200"}
      cursor-pointer select-none             /* 드래그 금지 */
      flex flex-col                          /* ⬅︎ 상·하를 세로로 쌓기 */
    `}
  >
    {/* ───── 상단 영역 ───── */}
    <div className="px-4 pt-4 pb-4">
      <RouteHeader
        title={route.routeName || route.name}
        mode={route.mode}
        isOpen={isOpen}
        onToggle={(e) => { e.stopPropagation(); toggle(); }}
      />

      {isOpen && (
        <div className="mt-2 mb-3">
          <RouteReactions reactions={route.reactions} />
          {/* 필요하다면 삭제 버튼 등… */}
        </div>
      )}
    </div>

    {/* 얇은 구분선 */}
    <div className="border-t border-gray-200 w-full" />

    {/* ───── 하단 버튼 영역 ───── */}
    <button
      onClick={(e) => { e.stopPropagation(); onSend?.(route); }}
      className="
        w-full py-3 text-center text-[#FF2655] font-medium
        hover:bg-gray-50 transition rounded-b-[10px]
      "
    >
      바로 출발하기
    </button>
  </div>
);
}