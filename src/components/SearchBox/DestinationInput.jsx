// src/components/SearchBox/DestinationInput.jsx
import DestIcon from "../../icons/destination.svg";  // 경로는 프로젝트 구조에 맞게 조정
export default function DestinationInput({
  value,
  onChange,
  placeholder = "어디로 가세요?",
}) {
  return (
    <div
      className="
        bg-gray-100 px-4 py-3 rounded-md 
        mb-4 flex items-center gap-2 
        text-sm sm:text-base text-gray-400
      "
    >
      {/* 로컬 SVG 불러오기 */}
      <img
        src={DestIcon}
        alt="destination icon"
        className="flex-shrink-0 w-[13.84px] h-[17px]"
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          bg-transparent flex-1 
          placeholder-gray-400 
          focus:outline-none 
          text-gray-700
        "
      />
    </div>
  );
}