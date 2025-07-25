import React, { useState, useEffect } from "react";
import { getEmergencyPhone } from "../api/user";

export default function EmergencyContact() {
  const [phone, setPhone] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 회원가입 시 로컬스토리지에 저장해둔 userId 가정
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("사용자 정보가 없습니다. 다시 로그인 해주세요.");
      return;
    }

    getEmergencyPhone(userId)
      .then((num) => setPhone(num))
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div className="text-red-500 p-4">오류: {error}</div>;
  }
  if (phone === null) {
    return <div className="text-gray-500 p-4">비상연락망을 불러오는 중...</div>;
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-medium mb-2">비상연락망</h2>
      <p className="text-[18px] text-[#272727]">{phone}</p>
    </div>
  );
}