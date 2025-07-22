import { useEffect, useRef, useState } from "react";
import StepCard from "../components/RouteGuide/StepCard";
import TransitStepCard from "../components/RouteGuide/TransitStepCard";
import { useLocation } from "react-router-dom";

const MapPage = () => {
  const mapRef = useRef(null);
  const [isTmapReady, setIsTmapReady] = useState(false);
  const [map, setMap] = useState(null);
  const [route, setRoute] = useState(null);
  const [transitRoute, setTransitRoute] = useState(null);
  const { mode, destination, endLat, endLng, startLat, startLng } = useLocation().state || {};

  console.log("받은 값들:", mode, destination, endLat, endLng, startLat, startLng);

  //Tmap 스크립트 로드 감지
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
        center: new window.Tmapv2.LatLng(startLat, startLng),
        width: "100%",
        height: "480px",
        zoom: 18,
        scrollwheel: false,
        zoomControl: false,
        draggable: true,
      });
      setMap(mapInstance);

    }
  }, [isTmapReady]);
  console.log(window.Tmapv2);
  console.log("mapRef.current:", mapRef.current);


  // 3. 경로 API 호출
  useEffect(() => {
    if (!map) return;

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        appKey: import.meta.env.VITE_TMAP_APP_KEY
      },
      body: JSON.stringify({
        startX: startLng,
        startY: startLat,
        angle: 20,
        speed: 30,
        endPoiId: '10001',
        endX: endLng,
        endY: endLat,
        reqCoordType: 'WGS84GEO',
        startName: '출발지',
        endName: destination,
        searchOption: '0',
        resCoordType: 'WGS84GEO',
        sort: 'index'
      })
    };

    fetch('https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&callback=function', options)
      .then(res => res.json())
      .then(res => setRoute(res))
      .catch(err => console.error(err));
      }, [map]);
      //console.log(route);

  useEffect(() => {
    if (!map) return;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        appKey: import.meta.env.VITE_TRANSIT_APP_KEY
      },
      body: JSON.stringify({
        startX: startLng,
        startY: startLat,
        endX: endLng,
        endY: endLat,
        format: "json",
        count: 1
      })
    };

    fetch('https://apis.openapi.sk.com/transit/routes', options)
      .then(res => res.json())
      .then(res => setTransitRoute(res))
      .catch(error => console.log(error));
  }, [map]);

  //console.log(transitRoute);

  useEffect(() => {
  if (!map || !route) return;

  const features = route.features;
  const linePath = [];

  for (let i = 0; i < features.length; i++) {
    const geometry = features[i].geometry;

    if (geometry.type === "LineString") {
      const coords = geometry.coordinates;

      coords.forEach(coord => {
        // [lng, lat] -> new Tmapv2.LatLng(lat, lng)
        const latLng = new window.Tmapv2.LatLng(coord[1], coord[0]);
        linePath.push(latLng);
      });
    }
  }

  const polyline = new window.Tmapv2.Polyline({
    path: linePath,
    strokeColor: "#3396F4", // 파란색
    strokeWeight: 6,
    map: map,
  });

  return () => {
    polyline.setMap(null); // unmount 시 제거
  };
}, [map, route]);


  return (
    <div className="relative flex flex-col items-center h-screen overflow-hidden">
      <div
        ref={mapRef}
        className="w-full h-[480px]"
      ></div>

      <div className="max-h-[80vh] overflow-y-auto">
        {mode === "walk" ? 
        ( <StepCard data={route} /> ) : 
        ( <TransitStepCard data={transitRoute} /> )
        }
      </div>
    </div>
  );
};

export default MapPage;

