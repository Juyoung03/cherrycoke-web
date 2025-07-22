// src/components/SavedRoutes/SavedRouteItem.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RouteHeader        from "./RouteHeader";
import RouteReactions     from "./RouteReactions";
import { sendSavedRoute } from "../../api/routes";

export default function SavedRouteItem({ route }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen((p) => !p);
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
      onClick={handleToggle}
      className={`
        bg-white p-4 rounded-[10px] border
        ${isOpen ? "border-[#FF2655]" : "border-gray-200"}
        cursor-pointer
      `}
    >
      <RouteHeader
        title={route.routeName ?? route.name}
        mode={route.mode}
        isOpen={isOpen}
        onToggle={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
      />

      {isOpen && (
        <div className="mt-2 mb-4">
          <RouteReactions reactions={route.reactions} />
        </div>
      )}

      <button
        onClick={handleStart}
        className="
          w-full px-4 py-3 text-center text-[#FF2655] font-medium
          border-t border-gray-200 hover:bg-gray-50 transition
        "
      >
        바로 출발하기
      </button>
    </div>
  );
}