import { useEffect, useRef, useState } from "react";
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
  const { mode, destination, endLat, endLng, startLat, startLng } = useLocation().state || {};


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
      const mapInstance = new window.Tmapv2.Map(mapRef.current, {
        center: new window.Tmapv2.LatLng(startLat, startLng),
        width: "100%",
        height: "430px",
        zoom: 18,
        // scrollwheel: false, // 확대 축소 가능하게
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

        map.setCenter(latLng);
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

