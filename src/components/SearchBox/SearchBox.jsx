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

  // 2) mode가 바뀔 때마다 로컬스토리지에 기록
  useEffect(() => {
    localStorage.setItem("searchMode", mode);
  }, [mode]);

  const handleModeChange = (value) => {
    setMode(value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleSearch = () => {
    nav("/routefinder", { state: { mode, destination } });
  };

  return (
    <div className="bg-white px-[12px] pt-[9px] pb-[9px] rounded-[10px]
                    shadow-[0px_0px_9.6px_rgba(0,0,0,0.1)]
                    w-full max-w-md mx-auto">
      <TransportToggle onChange={handleModeChange} />
      <StartInput />
      <DestinationInput value={destination} onChange={handleDestinationChange} />
      <SearchBar onClick={handleSearch} />
    </div>
  );
}