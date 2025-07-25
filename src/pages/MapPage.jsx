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

  //console.log("받은 값들:", mode, destination, endLat, endLng, startLat, startLng);

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
        height: "550px",
        zoom: 18,
        scrollwheel: false,
        zoomControl: false,
        draggable: true,
      });
      setMap(mapInstance);

    }
  }, [isTmapReady]);
  // console.log(window.Tmapv2);
  // console.log("mapRef.current:", mapRef.current);


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
        appKey: import.meta.env.VITE_TMAP_APP_KEY
      },
      body: JSON.stringify({
        startX: startLng,
        startY: startLat,
        endX: endLng,
        endY: endLat,
        format: "json",
        count: 10
      })
    };

    fetch('https://apis.openapi.sk.com/transit/routes', options)
      .then(res => res.json())
      .then(res => {
        const minTransfer = res.metaData.plan.itineraries.reduce((min, current) => {
          return current.transferCount < min.transferCount ? current : min;
        });
        setTransitRoute(minTransfer)})
      .catch(error => console.log(error));
  }, [map]);

  useEffect(() => {
    if (!map) return;

    let polyline = null;

    if (mode === "walk" && route?.features) {
      // 🚶‍♂️ 도보 경로 그리기
      const linePath = [];

      for (let i = 0; i < route.features.length; i++) {
        const geometry = route.features[i].geometry;
        if (geometry?.type === "LineString") {
          geometry.coordinates.forEach(coord => {
            const latLng = new window.Tmapv2.LatLng(coord[1], coord[0]);
            linePath.push(latLng);
          });
        }
      }

      polyline = new window.Tmapv2.Polyline({
        path: linePath,
        strokeColor: "#3396F4",
        strokeWeight: 6,
        map,
      });

    } else if (mode === "transit" && transitRoute?.legs) {
      const linePath = [];

      transitRoute.legs.forEach((leg, idx) => {
      const shape = leg.passShape;

      if (Array.isArray(shape)) {
        // 배열 형식인 경우 (거의 없음)
        shape.forEach(coord => {
          const latLng = new window.Tmapv2.LatLng(coord.latitude, coord.longitude);
          linePath.push(latLng);
        });

      } else if (shape?.linestring) {
        // linestring 문자열 형태인 경우 (대중교통 경로)
        const coords = shape.linestring.split(" ");
        coords.forEach(coordStr => {
          const [lng, lat] = coordStr.split(",").map(Number);
          if (!isNaN(lat) && !isNaN(lng)) {
            const latLng = new window.Tmapv2.LatLng(lat, lng);
            linePath.push(latLng);
          }
        });
      } else {
        console.log(`leg[${idx}]에 경로 정보 없음 또는 도보 구간`);
      }
    });

      polyline = new window.Tmapv2.Polyline({
        path: linePath,
        strokeColor: "#3396F4", // 같은 색으로 표시
        strokeWeight: 6,
        map,
      });
    }

    return () => {
      if (polyline) polyline.setMap(null);
    };
  }, [map, route, transitRoute, mode]);


  return (
    <div className="relative flex flex-col items-center h-screen overflow-hidden">
      <div
        ref={mapRef}
        className="w-full h-[550px] mb-[15px]"
      ></div>

      <div className="max-h-[80vh] overflow-y-auto mt-[38px]">
        {mode === "walk" ? 
        ( <StepCard data={route} /> ) : 
        ( <TransitStepCard data={transitRoute} /> )
        }
      </div>
    </div>
  );
};

export default MapPage;

