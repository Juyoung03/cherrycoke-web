import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import backImg from "../icons/back.svg";

const ChatbotPage = () => {
    const nav = useNavigate();

    const onPrev = () => {
        nav("/");
    }
    return (
        <div className="relative flex flex-col items-center h-screen overflow-hidden">
            <Header left_img={backImg} text={"체리봇"} onClick={onPrev} />
            <div>
                <div className="flex flex-row ">
                    <img src="/cherry-favicon.svg" alt="" />
                    <div className="bg-[#F2F3F5] rounded-tl-[5px] rounded-[20px] text-[16px] px-[17px] py-[12px]">
                        <p>반가워요! 무엇이 궁금하신가요?</p>
                        <p>궁금한 내용을 아래에서 선택해보세요.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatbotPage;