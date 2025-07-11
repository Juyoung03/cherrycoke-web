// src/components/RouteFinder/RouteHeader.jsx
import { useNavigate } from "react-router-dom";
import TransportToggle from "../SearchBox/TransportToggle";
import BackIcon from "../../icons/back.svg";
import DestinationIcon from "../../icons/destination.svg";

export default function RouteHeader({ mode, onModeChange, address }) {
  const nav = useNavigate();

  return (
    <div className="bg-white shadow-sm">
      {/* 상단: 뒤로가기 + 모드 토글 */}
      <div className="flex items-center px-4 pt-[23px] pb-[10px]">
        <button
          onClick={() => nav(-1)}
          className="p-2 focus:outline-none"
          aria-label="뒤로가기"
        >
          <img src={BackIcon} alt="뒤로가기" className="w-2 h-4" />
        </button>

        <div className="flex-1 flex justify-start items-center space-x-2">
          <TransportToggle onChange={onModeChange} state={mode} />
        </div>

        {/* 우측 정렬용 여유 공간 */}
        <div className="w-6" />
      </div>

      {/* 하단: 도착지 주소 표시 */}
      <div className="px-4 pb-4">
        <div
          className="
            bg-gray-100 rounded-full px-[27px] flex items-center gap-2 h-[48px]
          "
        >
          <img src={DestinationIcon} alt="도착지 아이콘" className="w-[13.84px] h-[17px]" />
          <span className="text-[15px] text-gray-700">
            {address}
          </span>
        </div>
      </div>
    </div>
  );
}
