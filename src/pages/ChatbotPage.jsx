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
                chat
            </div>
        </div>
    )
}

export default ChatbotPage;