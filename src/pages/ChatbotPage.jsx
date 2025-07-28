import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import backImg from "../icons/back.svg";
import ChoiceButton from "../components/Chatbot/ChoiceButton";
import { useLayoutEffect, useRef, useState } from "react";

const ChatbotPage = () => {
    const nav = useNavigate();
    const [isOverflow, setIsOverflow] = useState(false);
    const [que, setQue] = useState(null);
    const scrollRef = useRef(null);

    const onPrev = () => {
        nav("/");
    }

    const choice = [
        {text: ["길을", "이탈했어요"]},
        {text: ["버스, 지하철을", "놓쳤어요"]},
        {text: ["여기가 어딘지", "모르겠어요"]},
        {text: ["길을", "이탈했어요"]},
        {text: ["버스, 지하철을", "놓쳤어요"]},
        {text: ["여기가 어딘지", "모르겠어요"]},
    ];

    const handleScrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 150;
        }
    };

    const handleScrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += 150;
        }
    };

    useLayoutEffect(() => {
        const el = scrollRef.current;
        if (el) {
            const isOverflowing = el.scrollWidth > el.clientWidth;
            setIsOverflow(isOverflowing);
        }
    }, []);


    return (
        <div className="relative flex flex-col items-center h-screen overflow-hidden">
            <Header left_img={backImg} text={"체리봇"} onClick={onPrev} />
            <div className="mt-[47px] ml-[16px]">
                <div className="flex flex-row gap-[5px] items-start">
                    <img src="/cherry-favicon.svg" alt="챗봇" />
                    <div>
                        <div className="bg-[#F2F3F5] rounded-tl-[5px] rounded-[20px] text-[16px] px-[17px] py-[12px] inline-block">
                            <p>반가워요! 무엇이 궁금하신가요?</p>
                            <p>궁금한 내용을 아래에서 선택해보세요.</p>
                        </div>

                        <div className="relative w-full overflow-hidden">
                            <button onClick={handleScrollLeft}>prev</button>
                            <div 
                                className="mt-[15px] flex overflow-x-auto scroll-smooth border border-black" 
                                ref={scrollRef}
                            >
                                {choice.map((button, index) => (
                                    <ChoiceButton 
                                        key={index} 
                                        text={button.text} 
                                        onClick={() => setQue(button.text.join(" "))}
                                    />
                                ))}
                            </div>
                            <button onClick={handleScrollRight}>next</button>
                        </div>
                    </div>
                </div>

                
            </div>
            <div className="mt-[15px] mr-[16px] flex">
                {que ? (
                    <div className="bg-[#FFE9EE] px-[17px] py-[12px] rounded-tr-[5px] rounded-[20px] text-[#2F2B2C]">
                        {que}
                    </div>
                    ) : <></>}
            </div>
        </div>
    )
}

export default ChatbotPage;
