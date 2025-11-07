// src/components/SettingPage/Setting.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { getMemberInfo } from "../../api/member";

export default function Setting({ onEditPhone }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  // 토큰이 없으면 곧바로 로그인으로 리다이렉트
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ① 회원 정보 상태
  const [member, setMember] = useState({
    memberId: "",
    nickname: "",
    username: "",
  });
  const [error, setError] = useState(null);

  // ② 마운트 시 한 번만 호출
  useEffect(() => {
    getMemberInfo()
      .then((data) => {
        setMember(data);
      })
      .catch((err) => {
        console.error("회원 정보 조회 실패:", err);
        // 토큰이 없어서 에러가 날 경우 err.message 에 "accessToken 없음" 이 담겨있습니다.
        if (err.message.includes("accessToken 없음")) {
          // ① 로그인 페이지로 리디렉트
          return navigate("/login", { replace: true });
          // 또는
          // setError("로그인이 필요합니다. 로그인 후 다시 시도해 주세요.");
        }
        // ② 기타 에러
        setError("회원 정보를 불러올 수 없습니다.");
      });
  }, [navigate]);

  return (
    <main className="relative flex-1 w-full flex flex-col items-center pt-0 px-4">
      <section className="w-full mt-[36px] bg-[#FEF8F9] rounded-[16px] px-[20px] py-[24px] shadow-sm">
        <p className="text-[14px] text-[#FF7593] font-medium mb-[12px]">프로필</p>
        <div className="flex flex-col gap-[6px]">
          <p className="text-[22px] font-semibold text-[#333]">
            {member.username ? `${member.username}님` : "로그인이 필요합니다."}
          </p>
          <p className="text-[#757575] text-[15px]">
            {member.nickname ? `아이디: ${member.nickname}` : ""}
          </p>
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
      </section>

      <section className="w-full mt-[28px] bg-white border border-[#F2F2F2] rounded-[16px] px-[20px] py-[20px]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[15px] text-[#909090]">내 정보</p>
            <p className="text-[18px] font-medium text-[#333] mt-[4px]">비상 연락처</p>
          </div>
          <button
            onClick={onEditPhone}
            className="px-[14px] py-[8px] border border-[#FFBCCA] rounded-full text-[13px] text-[#FF3D74]"
          >
            수정하기
          </button>
        </div>
      </section>
    </main>
  );
}