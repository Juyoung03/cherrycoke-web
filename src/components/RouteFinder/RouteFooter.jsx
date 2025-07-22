// src/components/RouteFinder/RouteFooter.jsx
import React, { useState } from "react";
import SaveModal from "./SaveModal";
// SVG 파일 URL 임포트
import BusIcon      from "../../icons/bus.svg";
import WalkIcon     from "../../icons/walk.svg";
import HeartOffIcon from "../../icons/heart-off.svg";
import HeartOnIcon  from "../../icons/heart-on.svg";
import { FaArrowRight } from "react-icons/fa";

/**
 * RouteFooter
 *
 * @param {"transit"|"walk"} mode
 * @param {number} duration
 * @param {string} arrivalTime
 * @param {string} [distance]
 * @param {() => void} onStartNavigation
 */
export default function RouteFooter({ 
    mode, duration, arrivalTime, distance, 
    onStartNavigation, onSaveRoute, destination, 
    endLat, endLng }) {
  const [liked, setLiked] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  // 아이콘 색상을 FF2655로 바꾸기 위한 CSS 필터
  const filter = "invert(25%) sepia(87%) saturate(3459%) hue-rotate(340deg)";

  const handleLikeClick = () => {
    setLiked(prev => !prev);
    if (!liked) setShowSaveModal(true);
  };

  const handleSave = (name) => {
    if (onSaveRoute) onSaveRoute(name);
    setShowSaveModal(false);
  };

  //console.log(endLat, endLng);
  //console.log(mode);

  // 도보 모드용 요약 카드
  //const SummaryCard = () => (
  //   const SummaryCard = ({ liked, onLikeClick }) => (
  //   <div className="bg-white border border-[#D2D2D2] rounded-lg h-[91px] px-[19px] py-[16px] mb-3">
  //     {/* 첫 번째 줄: 소요시간 + 하트 */}
  //     <div className="flex items-center justify-between h-[33px]">
  //       <span className="text-[28px] font-medium text-[#FF2655] leading-[33px]">{duration}분</span>
  //       <button
  //         //onClick={() => setLiked((f) => !f)}
  //         onClick={onLikeClick}
  //         className="focus:outline-none"
  //         aria-label={liked ? "즐겨찾기 해제" : "즐겨찾기"}
  //       >
  //         <img
  //           src={liked ? HeartOnIcon : HeartOffIcon}
  //           alt={liked ? "하트 on" : "하트 off"}
  //           className="w-[19px] h-[17px]"
  //           style={{ filter }}
  //         />
  //       </button>
  //     </div>
  //     {/* 두 번째 줄: 도착시간 및 거리 */}
  //     <div className="flex items-center mt-[6px] h-[20px]">
  //       <span className="text-[17px] font-normal text-[#646464] leading-[20px]">
  //         오후 {arrivalTime} 도착
  //       </span>
  //       {distance && (
  //         <>
  //           {/* 구분자 세로선 */}
  //           <span
  //             className="w-[1px] h-[18px] bg-[#DADADA] mx-[8px]"
  //             aria-hidden="true"
  //           />
  //           <span className="text-[17px] text-[#646464] leading-[20px]">
  //             {distance}
  //           </span>
  //         </>
  //       )}
  //     </div>
  //   </div>
  // );

  /**
 * 안내 문구 카드
 * 오른쪽 하트 클릭 시 모달 오픈
 */
const SummaryCard = ({ liked, onLikeClick }) => (
  <div className="bg-white border border-[#D2D2D2] rounded-lg px-6 py-5 mb-5 flex items-center justify-between">
    <div className="flex-1">
      <p className="text-[19px] text-[#272727] leading-[22px]">
        <span>
          자주 가는 곳이라면{" "}
          <span className="text-[19px] font-bold text-[#FF2655]">오른쪽 하트</span>를
        </span>
        <span className="block mt-1 flex items-center">
          <span>눌러 저장해보세요</span>
          {/* 화살표 아이콘 */}
          <FaArrowRight className="w-7 h-4 ml-1 text-[#FF2655]" />
        </span>
      </p>
    </div>
    <button
      onClick={onLikeClick}
      className="focus:outline-none"
      aria-label={liked ? "즐겨찾기 해제" : "즐겨찾기"}
    >
      <img
        src={liked ? HeartOnIcon : HeartOffIcon}
        alt={liked ? "하트 on" : "하트 off"}
        className="w-[19px] h-[17px]"
        style={{ filter }}
      />
    </button>
  </div>
);

  // 안내 시작 버튼
  const StartButton = () => (
    <button
      onClick={onStartNavigation}
      className="
        w-full flex items-center justify-center
        border border-[#FF2655] rounded-lg
        h-[42px] text-[#FF2655] font-medium
        hover:bg-[#FFEBF0] transition
      "
    >
      <img
        src={mode === "transit" ? BusIcon : WalkIcon}
        alt={mode === "transit" ? "버스 아이콘" : "도보 아이콘"}
        className="w-5 h-5 mr-2"
        style={{ filter }}
      />
      같이 출발해볼까요?
    </button>
  );

  return (
    <>
      {/* 기존 footer
      <div
        className={`
          fixed bottom-0 left-0 w-full bg-white px-4 pb-[52px]
          shadow-[0px_0px_9.6px_rgba(0,0,0,0.1)]
          ${mode === "walk" ? "pt-[24px]" : "pt-[30px]"}
        `}
      >
        {mode === "walk" && (
            <SummaryCard 
            liked={liked}
            onLikeClick={handleLikeClick}
            />
        )}
        <StartButton />
      </div> */}

      <div
        className="
          fixed bottom-0 left-0 w-full bg-white px-4 pt-[30px] pb-[52px]
          shadow-[0px_0px_9.6px_rgba(0,0,0,0.1)]
        "
      >
        {/* 요약 카드 (도보/대중교통 동일) */}
        <SummaryCard liked={liked} onLikeClick={handleLikeClick} />

        {/* 안내 시작 버튼 */}
        <StartButton />
      </div>

      {/* 분리된 SaveModal */}
      <SaveModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={(name) => {
          onSaveRoute?.(name);
          setShowSaveModal(false);
        }}
        //defaultLabel={distance || `${duration}분 경로`}
        defaultLabel={destination}
        endLat={endLat}
        endLng={endLng}
        mode={mode}
      />
    </>
  );
}