// src/components/SettingPage/Setting.jsx
import React, { useEffect, useState } from "react";
import nextImg from "../../icons/nextImg.svg";
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
      {/* 프로필 */}
      <div className="flex w-full h-[52px] justify-between items-center mt-[34px]">
        <div>
          {/* ③ 불러온 닉네임과 아이디를 화면에 출력 */}
          <p className="text-[24px]">
            {member.nickname ? `${member.username}님` : "로그인이 필요합니다."}
          </p>
          <p className="text-[#979797] text-[15px]">
            {member.username ? `ID: ${member.nickname}` : ""}
          </p>
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
        <img src={nextImg} alt="more info" className="w-[10px]" />
      </div>

      <section className="w-full mt-[43px]">
        <p className="text-[#909090] mb-[15px]">내 정보</p>
        <div className="flex w-full h-[21px] justify-between items-center mb-[13px]">
          <p className="text-lg">비밀번호</p>
          <img src={nextImg} alt="more info" className="w-[10px]" />
        </div>
        <hr className="border-[#ECECEC]" />
        <div
         className="flex w-full h-[21px] justify-between items-center mt-[13px] cursor-pointer"
         onClick={onEditPhone}
       >
         <p className="text-lg">비상 연락처</p>
         <img src={nextImg} alt="수정" className="w-[10px]" />
       </div>
      </section>

      <section className="w-full mt-[43px]">
        <p className="text-[#909090] mb-[15px]">음성 지원</p>
        <div className="flex w-full h-[21px] justify-between items-center mb-[13px]">
          <p className="text-lg">안내 음성</p>
          <img src={nextImg} alt="more info" className="w-[10px]" />
        </div>
        <hr className="border-[#ECECEC]" />
        <div className="flex w-full h-[21px] justify-between items-center mt-[13px]">
          <p className="text-lg">음성 크기 조절</p>
          <div className="flex items-center">
            <p className="text-[17px] text-[#909090] mr-[5px]">크게</p>
            <img src={nextImg} alt="more info" className="w-[10px]" />
          </div>
        </div>
      </section>
    </main>
  );
}