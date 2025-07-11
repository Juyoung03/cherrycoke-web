export default function SearchBar({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="
          w-full
          bg-[#FF2655] text-white
          text-base h-12
          rounded-[10px]
          hover:bg-pink-600
          transition
        "
      >
        길찾기
      </button>
    );
  }