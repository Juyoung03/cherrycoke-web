import { useEffect, useRef, useState, useCallback } from "react";
import StepCard from "../components/RouteGuide/StepCard";
import TransitStepCard from "../components/RouteGuide/TransitStepCard";
import { useLocation, useNavigate } from "react-router-dom";
import glassImg from "../icons/glass.svg";
import { getEmergencyContact } from "../api/member";
import pinImg from "../icons/pinsmall.svg";
import { watchPosition, clearWatch } from "../utils/geolocation";

const MapPage = () => {
  const mapRef = useRef(null);
  const nav = useNavigate();
  const [isTmapReady, setIsTmapReady] = useState(false);
  const [map, setMap] = useState(null);
  const [route, setRoute] = useState(null);
  const [transitRoute, setTransitRoute] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const { mode, destination, endLat, endLng, startLat, startLng } = useLocation().state || {};
  const hasInitialCentered = useRef(false);


  // 헤더와 동일한 비상연락 함수
  const handleEmergencyCall = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return nav("/login");
    }

    // 로컬저장소에 번호가 있으면 쓰고, 없으면 API 호출
    let phone = localStorage.getItem("emergencyPhone");
    if (!phone) {
      try {
        const data = await getEmergencyContact();
        phone = data.phoneNumber;
        if (phone) localStorage.setItem("emergencyPhone", phone);
      } catch (err) {
        console.error("비상연락망 조회 실패:", err);
        return alert("저장된 번호가 없습니다.");
      }
    }

    // 실제 전화 걸기
    window.location.href = `tel:${phone}`;
  };

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
      if (window.Tmapv2 && window.Tmapv2.setHttpsMode) {
        window.Tmapv2.setHttpsMode(true);
      }

      const mapInstance = new window.Tmapv2.Map(mapRef.current, {
        center: new window.Tmapv2.LatLng(startLat, startLng),
        width: "100%",
        height: "430px",
        zoom: 18,
        // scrollwheel: false, // 확대 축소 가능하게
        zoomControl: false,
        draggable: true,
        httpsMode: true,
      });
          // SDK가 지원하는 전체 허용 레벨 안에서 10~20으로 클램프
    const minSdk = mapInstance.getMinZoomLevels();
    const maxSdk = mapInstance.getMaxZoomLevels();
    const min = Math.max(13, minSdk);
    const max = Math.min(20, maxSdk);
    mapInstance.setZoomLimit(min, max);

    // 혹시 모를 과도 확대/축소를 즉시 되돌림(보조 안전장치)
    mapInstance.addListener("zoom_changed", () => {
      const z = mapInstance.getZoom();
      if (z < min) mapInstance.setZoom(min);
      if (z > max) mapInstance.setZoom(max);
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
      console.log(route);

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

  // 기존 polyline 제거용 배열
  const polylines = [];

  if (mode === "walk" && route?.features) {
    // 도보 전용 모드
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

    const polyline = new window.Tmapv2.Polyline({
      path: linePath,
      strokeColor: "#3396F4",
      strokeWeight: 6,
      map,
    });
    polylines.push(polyline);

  } else if (mode === "transit" && transitRoute?.legs) {
    // 대중교통 모드
    transitRoute.legs.forEach((leg, idx) => {
      const linePath = [];

      if (leg.mode === "WALK" && Array.isArray(leg.steps)) {
        // 도보 구간 (steps 안의 linestring 사용)
        leg.steps.forEach(step => {
          if (step.linestring) {
            const coords = step.linestring.split(" ");
            coords.forEach(coordStr => {
              const [lng, lat] = coordStr.split(",").map(Number);
              if (!isNaN(lat) && !isNaN(lng)) {
                const latLng = new window.Tmapv2.LatLng(lat, lng);
                linePath.push(latLng);
              }
            });
          }
        });

        const walkLine = new window.Tmapv2.Polyline({
          path: linePath,
          strokeColor: "#3396F4", 
          strokeWeight: 4,
          strokeStyle: "dash", // 점선으로 표시
          map,
        });
        polylines.push(walkLine);

      } else if (leg.passShape?.linestring) {
        // 버스/지하철 구간 (passShape 사용)
        const coords = leg.passShape.linestring.split(" ");
        coords.forEach(coordStr => {
          const [lng, lat] = coordStr.split(",").map(Number);
          if (!isNaN(lat) && !isNaN(lng)) {
            const latLng = new window.Tmapv2.LatLng(lat, lng);
            linePath.push(latLng);
          }
        });

        const transitLine = new window.Tmapv2.Polyline({
          path: linePath,
          strokeColor: "#3396F4",
          strokeWeight: 6,
          map,
        });
        polylines.push(transitLine);
      } else {
        console.log(`leg[${idx}]에 경로 정보 없음`);
      }
    });
  }

  // cleanup
  return () => {
    polylines.forEach(line => line.setMap(null));
  };
}, [map, route, transitRoute, mode]);



  useEffect(() => {
    if (!map) return;

    let marker = null;
    let watchId = null;

    watchPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        const latLng = new window.Tmapv2.LatLng(latitude, longitude);

        if (!marker) {
          marker = new window.Tmapv2.Marker({
            position: latLng,
            map,
            icon: pinImg
          });
        } else {
          marker.setPosition(latLng);
        }
        setCurrentPosition({ latitude, longitude });

        if (!hasInitialCentered.current) {
          map.setCenter(latLng);
          hasInitialCentered.current = true;
        }
      }, 
      (error) => {console.log(error)},
      {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}
    ).then((id) => {
      watchId = id;
    }).catch((error) => {
      console.error('GPS 위치 추적 시작 실패:', error);
    });

    return () => {
      if (watchId) {
        clearWatch(watchId);
      }
      if (marker) marker.setMap(null);
    }

  }, [map]);

  const handleCenterOnUser = useCallback(() => {
    if (!map || !currentPosition) return;
    const latLng = new window.Tmapv2.LatLng(currentPosition.latitude, currentPosition.longitude);
    map.setCenter(latLng);
  }, [map, currentPosition]);

  

  // console.log(curLat, curLng);
  // console.log(startLat, startLng);

  const handleClick = () => {
    nav("/chatbot", {state: {
      destination: destination, 
      mode: mode,
    }})
  }

  return (
    <div className="relative flex flex-col items-center h-screen overflow-hidden">
      <div
        ref={mapRef}
        className="w-full h-[430px] mb-[15px] relative"
      />
      <div className="absolute h-[35px] top-[50px] left-[16px] z-10 flex flex-row gap-[8px]">
        <button 
          className="bg-white rounded-[5px] px-[11px] flex flex-row items-center gap-[6px] cursor-pointer"
          onClick={handleClick}
        >
          <img src={glassImg} alt="chatbot" className="w-[27px]" />
          <p>AI 챗봇</p>
        </button>
        <button
         className="bg-[#FEF8F9] rounded-[5px] px-[11px] border border-[#FFBCCA] cursor-pointer"
         onClick={handleEmergencyCall}
         >
          비상 연락
          </button>
      </div>

      <button
        onClick={handleCenterOnUser}
        disabled={!currentPosition}
        className="absolute left-[16px] top-[380px] z-10 bg-white border border-[#FFBCCA] rounded-[5px] px-[12px] py-[8px] shadow-sm text-sm disabled:opacity-50"
      >
        내 위치
      </button>

      <div className="max-h-[80vh] overflow-y-auto mt-[30px]">
        {mode === "walk" ? 
        ( <StepCard data={route} /> ) : 
        ( <TransitStepCard data={transitRoute} /> )
        }
      </div>
    </div>
  );
};

export default MapPage;

