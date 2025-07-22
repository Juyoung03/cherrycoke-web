// src/components/MainPage/MainPage.jsx
import Header     from "../Header";
import SearchBox  from "../SearchBox/SearchBox";
import SavedRoutes from "../SavedRoutes/SavedRoutes";

export default function MainPage() {

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 상단 헤더 */}
      <Header />

      {/* 본문 영역 */}
      <main className="flex-1 p-6">
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
      </main>
    </div>
  );
}