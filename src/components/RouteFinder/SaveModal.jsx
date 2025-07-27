// src/components/RouteFinder/SaveModal.jsx
import React, { useState } from "react";
import { getToken } from "../../api/auth";

// const TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsIm1lbWJlcklkIjoiMSIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNzUzMjgzMjE5LCJleHAiOjE3NTM5NzQ0MTl9.hGqO2t9_ErxMy36CU5HIbGHsCQsTsKuDe6U_dlpIsPrMGum-RNnMzs7bZrJSGpgfqnIr4BlCoKl2mjsuR6hAqQ";
const BACKEND = "https://cherrymap.click";

export default function SaveModal({  
  isOpen,          // 모달 열림 여부  
  onClose,         // 닫기 핸들러  
  onSave,          // 저장 완료 핸들러  
  defaultLabel,    // 목적지 이름
  mode,            // "walk" 또는 "transit"
  endLat,          // 클릭한 위도
  endLng           // 클릭한 경도
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // 실제 서버에 저장 요청 보내기
  const submitModal = async () => {
    const modeString = mode === "walk" ? "도보" : "대중교통";
    
    console.log(name);
    const payload = {
      routeName: name,
      mode: modeString,
      endName: defaultLabel,
      endLat,
      endLng,
    };
    // console.log(endLat, endLng);
    console.log(mode);

    try {
      setLoading(true);
      const token = await getToken();  // 로컬스토리지에서 꺼내서 없으면 에러 던짐
      console.log("🛡️ saveModal sending with token:", token);
      const res = await fetch(`${BACKEND}/api/routes`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const savedRoute = await res.json();
      onSave(savedRoute);
      setName("");
      onClose();
      alert("경로 저장 성공!");
    } catch (err) {
      console.error("경로 저장 실패", err);
      alert("경로 저장에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-30"
        onClick={onClose}
      />
      {/* Modal Content */}
      <div className="relative bg-white rounded-t-[16px] p-4 pt-[37px] pb-[45px]">
        <p className="text-[18px] font-medium text-gray-700 mb-[19px]">
          ‘{defaultLabel}’을 저장할게요  <br/>
          쉽게 찾을 수 있도록 이름을 설정해주세요
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 설정해주세요"
          className="text-[15px] w-full border border-gray-300 rounded-md px-3 py-2 mb-[48px] focus:outline-none"
        />
        <button
          onClick={submitModal}
          className="h-[48px] w-full bg-[#FF2655] text-white rounded-md disabled:opacity-50"
          disabled={!name.trim() || loading}
        >
          {loading ? "저장 중..." : "저장완료"}
        </button>
      </div>
    </div>
  );
}
