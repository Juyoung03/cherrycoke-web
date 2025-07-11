import { useState } from "react";

export default function TransportToggle({ onChange, state }) {
  //const [mode, setMode] = useState("transit"); // "walk" or "transit"

  const mode = state;

  const selectMode = (value) => {
    //setMode(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="flex gap-2">
      {/* 걷기 */}
      <button
        type="button"
        onClick={() => selectMode("walk")}
        className={`
          w-[52px] h-[36px] rounded-full text-[15px]
          flex items-center justify-center transition
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
          w-[78px] h-[36px] rounded-full text-[15px]
          flex items-center justify-center transition
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