// src/components/SearchBox/StartInput.jsx
import { useState, useEffect } from "react";
import StartIcon from "../../icons/start.svg";

export default function StartInput() {
  const [address, setAddress] = useState("주소를 불러오는 중...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1) Geolocation 지원 여부 확인
    if (!navigator.geolocation) {
      setAddress("Geolocation을 지원하지 않는 환경입니다.");
      setLoading(false);
      return;
    }

    // 2) 좌표 요청
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // 3) Nominatim 역지오코딩 API 호출 (무료, 오픈소스)
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          if (data.display_name) {
            const parts = data.display_name.split(",");
          
            // 0번째 요소 (장소명)
            const primary = parts[0].trim();
          
            // 1번~4번 요소를 잘라내 뒤집고, 공백으로 연결
            const reversed = parts
              .slice(1, 4)           // 인덱스 1,2,3,4
              .map((s) => s.trim())  // 앞뒤 공백 제거
              .reverse()             // 역순으로
              .join(" ");            // 공백 없이 연결
          
            // 결과: "장소명 (4 3 2 1)"
            setAddress(`${primary} (${reversed})`);
          } else {
            setAddress("주소를 가져올 수 없습니다.");
          }
        } catch (err) {
          console.error(err);
          setAddress("주소 변환 중 오류가 발생했습니다.");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);
        setAddress("위치 정보를 가져오는 데 실패했습니다.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, []);

  return (
    <div
      className="
        bg-gray-100 px-4 py-3 rounded-md 
        mb-2 flex items-center gap-2 
        text-sm sm:text-base
      "
    >
      <img
        src={StartIcon}
        alt="start location"
        className="flex-shrink-0 w-[14px] h-[14px]"
      />
      <span className={loading ? "text-gray-500" : "text-black"}>
        {address}
      </span>
    </div>
  );
}