const ChoiceButton = ({text, onClick}) => {

    return (
        <button
            onClick={onClick}
            className="h-[75px] mx-[8px] px-[10px] border border-[#E1E1E1] text-[#6B6B6B]
            flex items-center justify-center text-center rounded-[10px]
            focus:bg-[#1E1E1E] focus:text-white focus:border-none"
        >
            <span>
                {Array.isArray(text)
                ? text.map((line, idx) => (
                    <span key={idx}>
                        {line}
                        <br />
                    </span>
                    ))
                : text}
            </span>
        </button>
    )
}

export default ChoiceButton;