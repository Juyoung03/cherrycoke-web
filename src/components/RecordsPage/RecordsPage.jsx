// src/pages/RecordsPage/RecordsPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecordForm from "./RecordForm";
import Footer from "../../components/MainPage/Footer";

export default function RecordsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const destination = state?.destination || "장소";

  const handleDone = (recordData) => {
    // TODO: 백엔드에 recordData 전송 or 로컬스토리지 등에 저장
    console.log("저장할 데이터:", recordData);
    // 완료 후 홈으로
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-[33px] pb-[57px] relative">
      <RecordForm
        destination={destination}
        onSubmit={handleDone}
        onCancel={() => navigate(-1)}
      />
      <Footer />
    </div>
  );
}