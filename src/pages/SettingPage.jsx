import Header from "../components/Header";
import prevImg from "../icons/prevImg.svg";
import nextImg from "../icons/nextImg.svg";
import { useNavigate } from "react-router-dom";

const SettingPage = () => {
    const nav = useNavigate();

    return (
        <div className="relative flex flex-col items-center h-screen overflow-hidden">
            <Header 
                left_img={prevImg}
                text={"설정"}
                onClick={()=>nav("/")} 
            />

            <div className="flex flex-row w-[358px] h-[52px] justify-between">
               <div>
                    <p>OOO님</p>
                    <p>id</p>
               </div>
               <img src={nextImg} alt="more info" className="w-[10px]" />
            </div>

            <div className="w-[358px] h-[102px]">
                <div>내 정보</div>
                <div className="flex flex-row w-full h-[21px] justify-between items-center">
                    <p>비밀번호</p>
                    <img src={nextImg} alt="more info" className="w-[10px]" />
                </div>

                <div className="flex flex-row w-full h-[21px] justify-between items-center">
                    <p>비상 연락처</p>
                    <img src={nextImg} alt="more info" className="w-[10px]" />
                </div>
            </div>

            <div className="w-[358px] h-[102px]">
                <div>음성 지원</div>
                <div className="flex flex-row w-full h-[21px] justify-between items-center">
                    <p className="text-lg">안내 음성</p>
                    <img src={nextImg} alt="more info" className="w-[10px]" />
                </div>

                <div className="flex flex-row w-full h-[21px] justify-between items-center">
                    <p className="text-lg">음성 크기 조절</p>
                    <div className="flex flex-row">
                        <p className="text-[17px]">크게</p>
                        <img src={nextImg} alt="more info" className="w-[10px]" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingPage;