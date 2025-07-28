import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import backImg from "../icons/back.svg";
import ChoiceButton from "../components/Chatbot/ChoiceButton";
import { useLayoutEffect, useRef, useState, useEffect } from "react";

const ChatbotPage = () => {
    const BACKEND = import.meta.env.VITE_BACKEND_URL;
    const nav = useNavigate();
    const [que, setQue] = useState(null);
    const scrollRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const location = useLocation();
    const receivedData = location.state;

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
      console.log(lat,lng);

      const submitToBackend = async (selectedText) => {
        const payload = {
            message: selectedText,
            location: {
                latitude: lat, 
                longitude: lng
            },
            destination_address: receivedData.destination,
            mode: receivedData.mode,
            user_context: selectedText,
        }

        try {
            const response = await fetch(`${BACKEND}/api/v1/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();

            if (result.success) {
                alert("연결");
            }
            else {
                alert("실패");
            }

        } catch (error) {
            console.log(error);
            alert("에러 발생");
        }
      }

    return (
        <div className="relative flex flex-col items-center h-screen overflow-hidden">
            <Header left_img={backImg} text={"체리봇"} onClick={onPrev} />
            <div className="mt-[47px] ml-[16px] w-[100%] relative">
                <div className="flex flex-row gap-[5px] items-start">
                    <img src="/cherry-favicon.svg" alt="챗봇" />
                    <div>
                        <div className="bg-[#F2F3F5] rounded-tl-[5px] rounded-[20px] text-[16px] px-[17px] py-[12px] inline-block">
                            <p>반가워요! 무엇이 궁금하신가요?</p>
                            <p>궁금한 내용을 아래에서 선택해보세요.</p>
                        </div>

                        <div className="relative overflow-hidden w-full">
                            <button>prev</button>
                            <div 
                                className="mt-[15px] w-[100%] flex overflow-x-auto scroll-smooth flex-nowrap border border-black" 
                                ref={scrollRef}
                            >
                                {choice.map((button, index) => (
                                    <ChoiceButton 
                                        key={index} 
                                        text={button.text} 
                                        onClick={() => {
                                            const selectedText = button.text.join(" ");
                                            setQue(selectedText);
                                            submitToBackend(selectedText);
                                        }}
                                    />
                                ))}
                            </div>
                            <button>next</button>
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
