// src/components/SearchBox/StartInput.jsx
import { useState, useEffect } from "react";
import StartIcon from "../../icons/start.svg";

export default function StartInput({ setStartLat, setStartLng }) {
  const [address, setAddress] = useState("주소를 불러오는 중...");
  const [loading, setLoading] = useState(true);

  // 1) 위치 가져와서 address 상태 설정
  useEffect(() => {
    if (!navigator.geolocation) {
      setAddress("Geolocation을 지원하지 않는 환경입니다.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setStartLat(latitude);
        setStartLng(longitude);
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();

          if (data.display_name) {
            const parts = data.display_name.split(",");
            const primary = parts[0].trim();
            const reversed = parts
              .slice(1, 4)
              .map((s) => s.trim())
              .reverse()
              .join(" ");

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

  // 2) address가 바뀌고 loading이 false가 되면 음성으로 안내
  useEffect(() => {
    if (loading) return;
    if (!window.speechSynthesis) return;

    const utter = new SpeechSynthesisUtterance(address);
    utter.lang = "ko-KR";
    utter.rate = 1;   // 속도: 0.1 ~ 10
    utter.pitch = 1;  // 음높이: 0 ~ 2
    // 이전 안내 중단
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }, [address, loading]);

  return (
    <div
      className="
        bg-gray-100 px-4 h-12 rounded-[10px] 
        mt-[9px] mb-[5px] flex items-center gap-2 
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