import { useState } from "react";

export default function TransportToggle({ onChange }) {
  const [mode, setMode] = useState("transit"); // "walk" or "transit"

  const selectMode = (value) => {
    setMode(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="flex gap-2 mb-4">
      {/* 걷기 */}
      <button
        type="button"
        onClick={() => selectMode("walk")}
        className={`
          px-4 py-1 rounded-full text-sm focus:outline-none transition
          ${
            mode === "walk"
              ? "bg-[#FFEBF0] border border-[#FF2655] text-[#FF2655]"
              : "text-gray-500"
          }
        `}
      >
        걷기
      </button>

      {/* 대중교통 */}
      <button
        type="button"
        onClick={() => selectMode("transit")}
        className={`
          px-4 py-1 rounded-full text-sm focus:outline-none transition
          ${
            mode === "transit"
              ? "bg-[#FFEBF0] border border-[#FF2655] text-[#FF2655]"
              : "text-gray-500"
          }
        `}
      >
        대중교통
      </button>
    </div>
  );
}