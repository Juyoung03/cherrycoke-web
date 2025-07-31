import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import backImg from "../icons/back.svg";
import ChoiceButton from "../components/Chatbot/ChoiceButton";
import { useRef, useState, useEffect } from "react";
import { sendChatMessage } from "../api/chatbot";
import nextImg from "../icons/nextImg.svg";
import prevImg from "../icons/prevImg.svg";

const ChatbotPage = () => {
    const nav = useNavigate();
    const [que, setQue] = useState(null);
    const scrollRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const location = useLocation();
    const receivedData = location.state || [];
    const scrollByAmount = 150;
    const [answer, setAnswer] = useState(null);
    const [mode, setMode] = useState("");

    const onPrev = () => {
        nav("/");
    }

    const choice = [
        {text: ["길을", "이탈했어요"]},
        {text: ["버스, 지하철을", "놓쳤어요"]},
        {text: ["여기가 어딘지", "모르겠어요"]},
        {text: ["걸어서 가는 방법을", "알고 싶어요"]},
        {text: ["대중교통으로 가는", "방법을 알고 싶어요"]},
        
    ];

    useEffect(() => {
        if (!navigator.geolocation) {
          setLoading(false);
          return;
        }
    
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLat(latitude);
            setLng(longitude);
            setLoading(false);
          },
          (error) => {
            console.error(error);
            setLoading(false);
          },
          { enableHighAccuracy: true, timeout: 5000 }
        );
      }, []);
      console.log(lat, lng);

      const submitToBackend = async (selectedText) => {
        if (receivedData.mode === "walk") {
            setMode("도보");
        } else if (receivedData.mode === "transit") {
            setMode("대중교통");
        }

        try {
            const result = await sendChatMessage({
                message: selectedText,
                lat,
                lng,
                destination: receivedData.destination,
                mode: mode,
            });
            console.log(result);

            if (result && result.response) {
                //alert("연결");
                setAnswer(result.response);
                
            }
            else {
                alert("실패");
            }

        } catch (error) {
            console.log(error);
            alert("에러 발생");
        }
      }

    const handleScrollNext = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: scrollByAmount,
                behavior: "smooth"
            })
        }
    }

    const handleScrollPrev = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -scrollByAmount,
                behavior: "smooth"
            })
        }
    }

    return (
        <div className="relative flex flex-col items-center h-screen overflow-hidden">
            <Header left_img={backImg} text={"체리봇"} onClick={onPrev} />
            <div className="mt-[47px] ml-[16px] w-full relative">
                <div className="flex flex-col gap-y-[15px]">
                    <div className="flex flex-row gap-[5px] items-start justify-start max-w-[355px]">
                        <img src="/cherry-favicon.svg" alt="챗봇" />
                        <div className="bg-[#F2F3F5] rounded-tl-[5px] rounded-[20px] text-[16px] px-[17px] py-[12px] inline-block">
                            <p>반가워요! 무엇이 궁금하신가요?</p>
                            <p>궁금한 내용을 아래에서 선택해보세요.</p>
                        </div>
                    </div>

                    <div className="relative overflow-hidden w-full flex gap-[10px] ml-[16px]">
                        <button
                            onClick={handleScrollPrev}
                        >
                            <img src={prevImg} alt="prev" className="scale-180"/>
                        </button>
                        <div 
                            className="mt-[15px] w-full overflow-x-auto scroll-smooth" 
                            ref={scrollRef}
                            style={{
                                maxWidth: "355px", // 모바일 기기처럼 제한
                                whiteSpace: "nowrap",
                            }}
                        >
                            <div className="flex flex-nowrap w-max">
                            {choice.map((button, index) => (
                                <ChoiceButton 
                                    key={index} 
                                    text={button.text} 
                                    onClick={() => {
                                        if (loading) {
                                            alert("위치 정보를 불러오는 중입니다. 잠시만 기다려주세요.");
                                            return;
                                        }
                                        const selectedText = button.text.join(" ");
                                        setQue(selectedText);
                                        submitToBackend(selectedText);
                                    }}
                                />
                            ))}
                            </div>
                        </div>
                        <button
                            onClick={handleScrollNext}
                            
                        >
                            <img src={prevImg} alt="next" className="-scale-180"/>
                        </button>
                    </div>

                    {que && (
                        <div className="flex justify-end">
                            <div className="mr-[16px] bg-[#FFE9EE] px-[17px] py-[12px] rounded-tr-[5px] rounded-[20px] text-[#2F2B2C]">
                                {que}
                            </div>
                        </div>
                    )}
                    
                    {answer && (
                        <div className="flex flex-row gap-[5px] items-start max-w-[355px]">
                            <img src="/cherry-favicon.svg" alt="챗봇" />
                            <div className="bg-[#F2F3F5] rounded-tl-[5px] rounded-[20px] px-[17px] py-[12px] inline-block">
                                <p>{answer}</p> 
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChatbotPage;
