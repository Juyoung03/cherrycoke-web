// src/components/SettingPage/Setting.jsx
import React, { useEffect, useState } from "react";
import nextImg from "../../icons/nextImg.svg";
import { useNavigate } from "react-router-dom";
import { getMemberInfo } from "../../api/member";

export default function Setting() {
  const navigate = useNavigate();

  // ① 회원 정보 상태
  const [member, setMember] = useState({
    memberId: "",
    nickname: "",
    username: "",
  });
  const [error, setError] = useState(null);

  // ② 마운트 시 한 번만 호출
  useEffect(() => {
    console.log("🔍 member state:", member);
    getMemberInfo()
      .then((data) => {
        setMember(data);
      })
      .catch((err) => {
        console.error("회원 정보 조회 실패:", err);
        setError("회원 정보를 불러올 수 없습니다.");
      });
  }, []);

  return (
    <main className="relative flex-1 w-full flex flex-col items-center pt-0 px-4">
      {/* 프로필 */}
      <div className="flex w-full h-[52px] justify-between items-center mt-[34px]">
        <div>
          {/* ③ 불러온 닉네임과 아이디를 화면에 출력 */}
          <p className="text-[24px]">
            {member.nickname ? `${member.username}님` : "로딩 중..."}
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
        <div className="flex w-full h-[21px] justify-between items-center mt-[13px]">
          <p className="text-lg">비상 연락처</p>
          <img src={nextImg} alt="more info" className="w-[10px]" />
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