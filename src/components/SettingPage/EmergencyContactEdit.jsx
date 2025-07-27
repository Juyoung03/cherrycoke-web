// src/components/SettingPage/EmergencyContactEdit.jsx
import React, { useState, useEffect } from "react";
import { getEmergencyContact, updateEmergencyContact, deleteEmergencyContact } from "../../api/member";

const DEFAULT = "010-1234-5678";

export default function EmergencyContactEdit({ onDone }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // 기존 저장된 연락처 한번 불러오기(Optional)
  useEffect(() => {
    // 서버에서 진짜 저장된 번호 불러오기
    getEmergencyContact()
      .then(({ phoneNumber }) => {
        // 서버가 준 값이 없으면 기본값으로
        setPhone(phoneNumber || "");
      })
      .catch(err => {
        console.error("비상연락처 조회 실패:", err);
        // 로컬에도 없으면 빈 문자열
        setPhone(localStorage.getItem("emergencyPhone") || "");
      });
  }, []);

    // 저장
  const save = async () => {
    try {
            // updateEmergencyContact 호출로 대체
            await updateEmergencyContact(phone);
            // 성공 시 로컬에도 저장
            localStorage.setItem("emergencyPhone", phone);
            onDone();
    } catch (e) {
      setError("010-1234-5678 형태로 입력해주세요.");
    }
  };

    // 삭제
    const remove = async () => {
        try {
          await deleteEmergencyContact();
          localStorage.removeItem("emergencyPhone");
          onDone();
        } catch {
          setError("삭제에 실패했습니다.");
        }
      };

  return (
    <div className="px-4 space-y-4">
      <h2 className="text-lg font-medium mb-4">비상 연락처 바꾸기</h2>
      <input
        type="text"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder={DEFAULT}
        onFocus={() => {
          // 만약 value에 예시가 들어있는 방어 로직이 필요하면 여기에…
          if (phone === DEFAULT) setPhone("");
        }}
        className={`
          w-full border px-3 py-2 rounded mb-2
          ${phone ? "text-black" : "text-gray-500"}
        `}
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="flex gap-2">
        <button
          onClick={save}
          className="flex-1 bg-[#FF2655] text-white py-2 rounded"
        >
          저장
        </button>
        <button
          onClick={onDone}
          className="flex-1 border border-gray-300 py-2 rounded"
        >
          취소
        </button>
      </div>
      <button
        onClick={remove}
        disabled={phone === ""}
        className={`
            w-full py-2 rounded
            ${phone
              ? "text-red-500 border border-red-200"
              : "text-gray-400 border border-gray-200 cursor-not-allowed"}
          `}
        >
        비상연락처 지우기
      </button>
    </div>
  );
}