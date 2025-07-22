// src/components/SearchBox/SearchBox.jsx
import { useState, useEffect } from "react";
import { useNavigate }      from "react-router-dom";
import TransportToggle      from "./TransportToggle";
import StartInput           from "./StartInput";
import DestinationInput     from "./DestinationInput";
import SearchBar            from "./SearchBar";

export default function SearchBox() {
  const nav = useNavigate();

  // 1) localStorage에 저장해 둔 mode를 꺼내오거나 기본값 'transit'
  const saved = localStorage.getItem("searchMode");
  const [mode, setMode] = useState(saved ?? "transit");
  const [destination, setDestination] = useState("");
  const [startLng, setStartLng] = useState(0);
  const [startLat, setStartLat] = useState(0);

  const [endLat, setEndLat] = useState(null);
  const [endLng, setEndLng] = useState(null);

  // 2) mode가 바뀔 때마다 로컬스토리지에 기록
  useEffect(() => {
    localStorage.setItem("searchMode", mode);
  }, [mode]);

  const handleModeChange = (value) => {
    setMode(value);
  };

  // const handleDestinationChange = (e) => {
  //   setDestination(e.target.value);
  // };

  // const handleSearch = () => {
  //   nav("/routefinder", { state: { mode, destination } });
  // };

    // 사용자가 직접 입력할 때: 좌표 초기화
    const handleDestinationChange = (e) => {
      setDestination(e.target.value);
      setEndLat(endLat);
      setEndLng(endLng);
    };
  
    // 자동완성 목록에서 장소를 고른 경우
    const handleDestinationSelect = ({ name, lat, lng }) => {
      setDestination(name);
      setEndLat(lat);
      setEndLng(lng);
    };
    //console.log(endLat, endLng);

    const handleStart = () => {
      setStartLat(startLat);
      setStartLng(startLng);
    }
  
    const handleSearch = () => {
      if (endLat == null || endLng == null) {
        alert("목적지를 리스트에서 선택해 주세요!");
        return;
      }
      nav("/routefinder", {
        state: { 
        mode, 
        destination,
        startLat,
        startLng,
        endLat,
        endLng
      } 
    });
    };

  return (
    <div className="bg-white px-[12px] pt-[9px] pb-[9px] rounded-[10px]
                    shadow-[0px_0px_9.6px_rgba(0,0,0,0.1)]
                    w-full max-w-md mx-auto">
      <TransportToggle onChange={handleModeChange} state={mode} />
      <StartInput setStartLat={setStartLat} setStartLng={setStartLng} onChange={handleStart} />
      <DestinationInput
      value={destination}
      onChange={handleDestinationChange}
      onSelect={handleDestinationSelect}
       />
      <SearchBar onClick={handleSearch} />
    </div>
  );
}