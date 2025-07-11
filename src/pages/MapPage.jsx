import { useEffect, useRef, useState } from "react";
import StepCard from "../components/RouteGuide/StepCard";

const MapPage = () => {
  const mapRef = useRef(null);
  const [isTmapReady, setIsTmapReady] = useState(false);
  const [map, setMap] = useState(null);

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
      const mapInstance = new window.Tmapv2.Map(mapRef.current, {
        center: new window.Tmapv2.LatLng(37.504585233865086, 127.02479803562213),
        width: "500px",
        height: "500px",
        zoom: 18,
        scrollwheel: false,
        zoomControl: false,
        draggable: true,
      });
      setMap(mapInstance);

    }
  }, [isTmapReady]);

  // 3. 경로 API 호출
  useEffect(() => {
    if (!map) return;

    const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    appKey: 'DY5ObGPcHE9wzIuAnS2vKaqXbpDC0yqd1MrO0NmP'
  },
  body: JSON.stringify({
    startX: 126.9244198988444,
    startY: 37.55275314791241,
    angle: 20,
    speed: 30,
    endPoiId: '10001',
    endX: 126.9223603996487,
    endY: 37.552578369577645,
    // passList: '126.92774822,37.55395475_126.92577620,37.55337145',
    reqCoordType: 'WGS84GEO',
    startName: '%EC%B6%9C%EB%B0%9C',
    endName: '%EB%8F%84%EC%B0%A9',
    searchOption: '0',
    resCoordType: 'WGS84GEO',
    sort: 'index'
  })
};

fetch('https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&callback=function', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
  }, [map]);

  return (
    <div className="relative flex flex-col items-center h-screen overflow-hidden">
      <h2>Tmap 대중교통 경로 예제</h2>
      <div
        ref={mapRef}
        className="w-[100%] h-[500px]"

      ></div>

      <div>
        <StepCard />
      </div>
    </div>
  );
};

export default MapPage;

