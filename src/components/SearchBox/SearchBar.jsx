export default function SearchBar({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="
          w-full
          bg-[#FF2655] text-white
          text-base py-3
          rounded-lg
          hover:bg-pink-600
          transition
        "
      >
        길찾기
      </button>
    );
  }