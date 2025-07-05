// src/components/MainPage/MainPage.jsx
import Header from "../Header";
import SearchBox from "../SearchBox/SearchBox";

export default function MainPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 상단 헤더 */}
      <Header />

      {/* 본문 영역 */}
      <main className="flex-1 p-6">
        {/* 페이지 타이틀 */}
        <h1 className="
             font-medium           /* font-weight: 500 */
             text-[24px]           /* font-size: 24px */
             leading-[29px]        /* line-height: 29px */
             text-[#272727]        /* color: #272727 */
             mb-6">
          나만의 길을 <br/> 발견하고 저장하세요!
        </h1>

        {/* 검색 박스 카드 */}
        <div className="flex justify-center">
          <SearchBox />
        </div>
      </main>
    </div>
  );
}