import { useEffect, useRef, useState } from "react";

const MapPage = () => {
  const mapRef = useRef(null);
  const [isTmapReady, setIsTmapReady] = useState(false);

  useEffect(() => {
    // Tmap 스크립트가 로드되어 window.Tmapv2가 생길 때까지 주기적으로 체크
    const checkInterval = setInterval(() => {
      if (window.Tmapv2) {
        setIsTmapReady(true);
        clearInterval(checkInterval);
      }
    }, 100);

    return () => clearInterval(checkInterval);
  }, []);

  useEffect(() => {
    if (isTmapReady && mapRef.current) {
      new window.Tmapv2.Map(mapRef.current, {
        center: new window.Tmapv2.LatLng(37.570028, 126.989072),
        width: "300px",
        height: "500px",
        zoom: 19,
        scrollwheel: false,  // 마우스 휠 줌 방지
        zoomControl: false,  // 우측 + - 버튼 제거
        draggable: true,  
        
      });
      
    }
  }, [isTmapReady]);

  return (
    <div className="relative flex flex-col items-center h-screen overflow-hidden">
      <h2>Tmap 지도 예제</h2>
      <div
        ref={mapRef}
        className="border border-black w-[300px] h-[400px]"
      ></div>
    </div>
  );
};

export default MapPage;



