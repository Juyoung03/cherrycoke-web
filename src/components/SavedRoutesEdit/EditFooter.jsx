// src/components/SavedRoutesEdit/EditFooter.jsx
import React from "react";

export default function EditFooter({ onSave, hasChanges }) {
  return (
    <footer className="py-[23px] px-[16px] bg-white ">
      <button
        onClick={onSave}
        disabled={!hasChanges}
        className={`
          w-full h-12 font-medium text-[18px] transition
          rounded-[5px]
          ${hasChanges
            ? "bg-[#FF2655] text-white hover:opacity-90"
            : "bg-[#F0F0F0] text-[#C7C7C7] cursor-not-allowed"}
        `}
      >
        삭제완료
      </button>
    </footer>
  );
}