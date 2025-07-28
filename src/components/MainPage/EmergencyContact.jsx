// src/components/MainPage/EmergencyContact.jsx

import React, { useState, useEffect } from "react";
import { getEmergencyContact } from "../../api/member";

export default function EmergencyContact() {
  const [phone, setPhone] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEmergencyContact()
      .then((data) => {
        console.log("🔔 emergency data:", data);
        if (!data.phoneNumber) {
            throw new Error("저장된 번호가 없습니다.");
          }
        setPhone(data.phoneNumber);
  })
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