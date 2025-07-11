import { useEffect, useRef, useState } from "react";

const MapPage = () => {
  const mapRef = useRef(null);
  const [isTmapReady, setIsTmapReady] = useState(false);
  const [clickedCoord, setClickedCoord] = useState(""); // 클릭한 좌표 저장용

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
        setClickedCoord(`${lon}, ${lat}`);
      });

      
    }
  }, [isTmapReady]);

  return (
    <div className="relative flex flex-col items-center h-screen overflow-hidden p-4">
      <h2 className="text-xl font-semibold mb-4">Tmap 클릭 좌표 표시</h2>

      <div className="mb-4 text-sm text-gray-700">
        클릭한 좌표: {clickedCoord || "지도에서 위치를 클릭해보세요"}
      </div>

      <div
        ref={mapRef}
        className="border border-black w-full max-w-[600px] h-[400px]"
      ></div>
    </div>
  );
};

export default MapPage;