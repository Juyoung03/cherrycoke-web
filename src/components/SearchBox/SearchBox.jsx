import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TransportToggle from "./TransportToggle";
import StartInput from "./StartInput";
import DestinationInput from "./DestinationInput";
import SearchBar from "./SearchBar";

export default function SearchBox({ onSearch }) {
  const nav = useNavigate();                         
  // 교통수단 모드: "walk" 또는 "transit"
  const [mode, setMode] = useState("transit");
  // 도착지 입력값
  const [destination, setDestination] = useState("");
  const handleModeChange = (value) => {
    setMode(value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleSearch = () => {
    // (1) 검색 로직: console.log 등
    console.log({ mode, destination });

    // (2) 길찾기 페이지로 이동
    nav("/routefinder", { state: { mode, destination } });
  };

  return (
    <div
      className="
        bg-white p-4
        rounded-[10px]
        shadow-[0px_0px_9.6px_rgba(0,0,0,0.1)]
        w-full max-w-md mx-auto
      "
    >
      {/* 걷기 / 대중교통 토글 */}
      <TransportToggle onChange={handleModeChange} />

      {/* 출발지 (내부에서 geolocation 등으로 처리) */}
      <StartInput/>

      {/* 도착지 입력창 */}
      <DestinationInput
        value={destination}
        onChange={handleDestinationChange}
      />

      {/* 길찾기 버튼 */}
      <SearchBar onClick={handleSearch} />
    </div>
  );
}