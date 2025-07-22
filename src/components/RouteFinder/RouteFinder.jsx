// src/components/RouteFinder/RouteFinder.jsx
import { useState, useEffect, useRef }      from "react";
import { useLocation, useNavigate }   from "react-router-dom";
import RouteHeader       from "./RouteHeader";
import RouteFooter       from "./RouteFooter";  // ① RouteFooter 임포트

export default function RouteFinder({ onSaveRoute }) {
  const nav = useNavigate();
  const { state } = useLocation();
  const [mode, setMode] = useState(state?.mode ?? "transit");
  const [destination]  = useState(state?.destination ?? "");
  const [startLat, setStartLat] = useState(state?.startLat ?? null);
  const [startLng, setStartLng] = useState(state?.startLng ?? null);

  // 예시용: 대중교통 39분, 오후 12:30 / 도보 12분, 오전 11:45, 거리 1.2km
  const duration    = mode === "walk" ? 12 : 39;
  const arrivalTime = mode === "walk" ? "11:45" : "12:30";
  const distance    = mode === "walk" ? "1.2km" : undefined;

  const handleStart = () => {
    // 안내 시작 눌렀을 때 로직
    console.log("안내 시작!", { mode, destination });
    nav("/map", {
      state: {
        mode,
        destination,
        endLat: clickedCoord.lat,
        endLng: clickedCoord.lng,
        startLat,
        startLng
      }
    });
  };

  const mapRef = useRef(null);
    const [isTmapReady, setIsTmapReady] = useState(false);
    //const [clickedCoord, setClickedCoord] = useState(""); // 클릭한 좌표 저장용
    const [clickedCoord, setClickedCoord] = useState({ lat: null, lng: null });

    // Tmap 스크립트 로드 감지
    useEffect(() => {
      const checkInterval = setInterval(() => {
        if (window.Tmapv2) {
          setIsTmapReady(true);
          clearInterval(checkInterval);
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }, []);
  
    // 지도 생성 및 클릭 이벤트 등록
    useEffect(() => {
  
      if (isTmapReady && mapRef.current) {
        console.log("지도 생성됨");
        const map = new window.Tmapv2.Map(mapRef.current, {
          center: new window.Tmapv2.LatLng(37.570028, 126.989072),
          width: "100%",
          height: "400px",
          zoom: 17,
          scrollwheel: true,
          zoomControl: true,
        });
        console.log("클릭 이벤트 등록됨");
        map.addListener("mousedown", function onClick(evt) {
          console.log("지도 클릭됨");
          const lat = evt.latLng.lat();
          const lon = evt.latLng.lng();
          console.log("클릭된 좌표:", lon, lat);
          //setClickedCoord(`${lon}, ${lat}`);
          setClickedCoord({lat, lng: lon});
        });
        // Tmapv2 전용 클릭 리스너로 교체
      //  window.Tmapv2.EventListener.addListener(map, "click", (evt) => {
      //      const lat = evt.latLng.getLatitude();
      //      const lng = evt.latLng.getLongitude();
      //      // **객체** 형태로 저장해야 props.endLat/endLng 가 제대로 넘어갑니다
      //      setClickedCoord({ lat, lng });
      //    });
  
        
      }
    }, [isTmapReady]);

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
        {/* <p className="text-gray-500">
          {mode === "walk" ? "도보 모드 콘텐츠 자리" : "대중교통 모드 콘텐츠 자리"}
        </p> */}
        <div
        ref={mapRef}
        className="border border-black w-full max-w-[600px] h-[400px]"
      ></div>
      </div>

      {/* 3) RouteFooter: flex-컬럼의 마지막, 고정 아래 배치 */}
      <RouteFooter
        mode={mode}
        duration={duration}
        arrivalTime={arrivalTime}
        distance={distance}
        onStartNavigation={handleStart}
        destination={destination}
        endLat={clickedCoord.lat}
        endLng={clickedCoord.lng}
        onSaveRoute={onSaveRoute}
      />
    </div>
  );
}