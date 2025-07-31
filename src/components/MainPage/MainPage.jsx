// src/components/MainPage/MainPage.jsx
import Header     from "./MainHeader";
import SearchBox  from "../SearchBox/SearchBox";
import SavedRoutes from "../SavedRoutes/SavedRoutes";
import Footer      from "./Footer";
import ChatbotImg from "../../icons/cherryBot.svg";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col pt-[88px] pb-[57px]">
      {/* 상단 헤더 */}
      <Header />

      {/* 본문 영역 */}
      <main className="flex-1 p-6 relative">
        {/* 페이지 타이틀 */}
        <h1
          className="
            font-medium
            text-[24px]
            leading-[29px]
            text-[#272727]
            mb-6
          "
        >
          나만의 길을 <br/> 발견하고 저장하세요!
        </h1>

        {/* 검색 박스 카드 */}
        <div className="flex justify-center">
          <SearchBox />
        </div>

        {/* 저장된 경로 리스트 */}
        <div className="mt-8">
          <SavedRoutes providerId="CURRENT_USER_ID" />
        </div>

        <div>
          <button 
            className="absolute flex flex-col right-[16px] bottom-0"
            onClick={() => nav("/chatbot")}
          >
              <img src={ChatbotImg} alt="chatbot" className="w-[65px]"/>
              <p className="text-[12px]">체리봇</p>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}