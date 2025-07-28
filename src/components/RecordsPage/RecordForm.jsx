// src/pages/RecordsPage/RecordForm.jsx
import React, { useState } from "react";
import RecordItem from "./RecordItem";
import prevImg from "../../icons/prevImg.svg";

// SVG 아이콘 import (각 파일명에 맞게 경로 수정)
import emotion_like from "../../icons/emotion_like.svg";
import emotion_angry from "../../icons/emotion_angry.svg";
import emotion_sad from "../../icons/emotion_sad.svg";
import emotion_surprised from "../../icons/emotion_surprised.svg";
import emotion_bored from "../../icons/emotion_bored.svg";

// EMOTIONS 배열: svg 그림(icon) + label(텍스트)
const EMOTIONS = [
  { value: "like",      label: "좋아요",    icon: emotion_like },
  { value: "angry",     label: "화나요",    icon: emotion_angry },
  { value: "sad",       label: "슬퍼요",    icon: emotion_sad },
  { value: "surprised", label: "놀랐어요",  icon: emotion_surprised },
  { value: "bored",     label: "지루해요",  icon: emotion_bored },
];
export default function RecordForm({ destination, onSubmit, onCancel }) {
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    if (!selected) return;
    onSubmit({ destination, emotion: selected });
  };

  return (
    <div>
      {/* ← 뒤로가기 버튼 */}
      <button onClick={onCancel} className="focus:outline-none">
        <img src={prevImg}
        alt="뒤로가기"
        className="w-[10px] h-[18px]"
        />
      </button>

      {/* 제목 */}
      <h2 className="text-[24px] font-medium mt-[68px] mb-[80px]">
        {destination}에 대한<br/>
        감정을 선택해주세요
        </h2>
              {/* 1행: 3개 아이콘 */}
      <div className="flex justify-center gap-[42px] mb-[42px]">
        {EMOTIONS.slice(0, 3).map((e) => (
          <RecordItem
            key={e.value}
            icon={e.icon}
            label={e.label} 
            selected={selected === e.value}
            onClick={() =>
              setSelected((prev) => (prev === e.value ? null : e.value))
            }
          />
        ))}
      </div>

      {/* 2행: 2개 아이콘 */}
      <div className="flex justify-center gap-[42px] mb-[42px]">
        {EMOTIONS.slice(3).map((e) => (
          <RecordItem
            key={e.value}
            icon={e.icon}
            label={e.label} 
            selected={selected === e.value}
            onClick={() =>
              setSelected((prev) => (prev === e.value ? null : e.value))
            }
          />
        ))}
      </div>
      
      {/* 다음(저장) 버튼 */}
      <button
        onClick={handleNext}
        disabled={!selected}
        className={`
          absolute bottom-[80px] left-0 right-0 mx-4
          w-auto min-w-[calc(100%-2*1rem)] py-3 rounded
          ${selected 
            ? "bg-[#FF2655] text-white" 
            : "bg-gray-200 text-gray-400 cursor-not-allowed"}
           `}
      >
        다음
      </button>
    </div>
  );
}