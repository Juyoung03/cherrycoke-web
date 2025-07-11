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

            <div className="flex flex-row w-[358px] h-[52px] justify-between mt-[34px]">
               <div className="">
                    <p className="text-[24px]">OOO님</p>
                    <p className="text-[#979797] text-[15px]">id</p>
               </div>
               <img src={nextImg} alt="more info" className="w-[10px]" />
            </div>

            <div className="w-[358px] h-[102px] mt-[43px]">
                <div className="text-[#909090] mb-[15px]">내 정보</div>
                <div className="flex flex-row mb-[13px] w-full h-[21px] justify-between items-center">
                    <p className="text-lg">비밀번호</p>
                    <img src={nextImg} alt="more info" className="w-[10px]" />
                </div>
                <hr className="border-[#ECECEC]" />
                <div className="flex flex-row mt-[13px] w-full h-[21px] justify-between items-center">
                    <p className="text-lg">비상 연락처</p>
                    <img src={nextImg} alt="more info" className="w-[10px]" />
                </div>
            </div>

            <div className="w-[358px] h-[102px] mt-[43px]">
                <div className="text-[#909090] mb-[15px]">음성 지원</div>
                <div className="flex flex-row mb-[13px] w-full h-[21px] justify-between items-center">
                    <p className="text-lg">안내 음성</p>
                    <img src={nextImg} alt="more info" className="w-[10px]" />
                </div>
                <hr className="border-[#ECECEC]" />
                <div className="flex flex-row mt-[13px] w-full h-[21px] justify-between items-center">
                    <p className="text-lg">음성 크기 조절</p>
                    <div className="flex flex-row">
                        <p className="text-[17px] text-[#909090] mr-[5px]">크게</p>
                        <img src={nextImg} alt="more info" className="w-[10px]" />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-[34px] right-[30px]">
                <button className="w-[72px] h-[29px] border border-[#E7E7E7] rounded-md text-[#767676] text-[13px]">로그아웃</button>
            </div>
        </div>
    )
}

export default SettingPage;