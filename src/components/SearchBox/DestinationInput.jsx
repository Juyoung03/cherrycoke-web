import { useState, useEffect, useRef } from "react";
import DestIcon from "../../icons/destination.svg";

export default function DestinationInput({
  value,
  onChange,
  onSelect,                              // SearchBox에서 내려주는 콜백
  placeholder = "어디로 가세요?",
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen]               = useState(false);
  const timer                         = useRef(null);
  const selectedItemRef               = useRef(null); // 선택된 항목 추적

  // — 공통으로 쓰일 POI fetch 함수
  const fetchSuggestions = async () => {
    try {
      const url = new URL("https://apis.openapi.sk.com/tmap/pois");
      url.searchParams.set("version", "1");
      url.searchParams.set("searchKeyword", value);
      url.searchParams.set("resCoordType", "WGS84GEO");
      url.searchParams.set("reqCoordType", "WGS84GEO");
      url.searchParams.set("count", "10");

      const res = await fetch(url.href, {
        headers: { appKey: import.meta.env.VITE_TMAP_APP_KEY },
      });
      if (!res.ok) throw new Error('HTTP ${res.status}');
      const json = await res.json();
      const list = json?.searchPoiInfo?.pois?.poi ?? [];
      const processed = list.map((p) => ({
        name: p.name,
        lat : parseFloat(p.noorLat ?? p.frontLat),
        lng : parseFloat(p.noorLon ?? p.frontLon),
      }));
      setSuggestions(processed);
    } catch (err) {
      console.error("TMap POI fetch error:", err);
      setSuggestions([]);
    }
  };

  /* ---------- value 변화 시 디바운스 자동완성 ---------- */
  useEffect(() => {
    if (!value.trim()) {
      setSuggestions([]);
      setOpen(false);
      selectedItemRef.current = null; // 값이 비면 선택 초기화
      return;
    }

    // 선택된 항목과 동일한 값이면 리스트를 다시 열지 않음
    if (selectedItemRef.current && selectedItemRef.current.name === value) {
      return;
    }

    // 0.3초 디바운스
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      fetchSuggestions().then(() => setOpen(true));
    }, 300);

    return () => clearTimeout(timer.current);
  }, [value]);

  /* ---------- 입력칸 포커스 시 리스트 다시 열기 ---------- */
  const handleFocus = () => {
    if (!value.trim()) return;
    // 이미 suggestions가 있으면 바로 열고, 없으면 fetch 후 열기
    if (suggestions.length > 0) {
      setOpen(true);
    } else {
      fetchSuggestions().then(() => setOpen(true));
    }
  };

  /* ---------- 항목 선택 시 ---------- */
  const handlePick = (item) => {
    selectedItemRef.current = item; // 선택된 항목 저장
    onSelect(item);     // 부모(SearchBox)에 {name,lat,lng} 전달
    setOpen(false);     // 리스트만 닫기 (suggestions는 남겨둠)
    // 타이머 클리어하여 useEffect가 리스트를 다시 열지 않도록 함
    if (timer.current) clearTimeout(timer.current);
  };

  return (
    <div className="relative">
      {/* 입력창 */}
      <div className="bg-gray-100 px-4 h-12 rounded-[10px] mb-[9px]
                      flex items-center gap-2 text-sm sm:text-base">
        <img src={DestIcon} alt="destination icon"
             className="flex-shrink-0 w-[13.84px] h-[17px]" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={() => {             // 입력 칸 클릭·포커스 시 리스트 다시 열기
              if (suggestions.length > 0) setOpen(true);
             }}              // ← 추가
          placeholder={placeholder}
          className="bg-transparent flex-1 placeholder-gray-400
                     focus:outline-none text-gray-700"
        />
      </div>

      {/* 추천 리스트 */}
      {open && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full bg-white border
                       border-gray-200 rounded-md shadow-md z-10
                       max-h-60 overflow-auto text-sm">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handlePick(s)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}