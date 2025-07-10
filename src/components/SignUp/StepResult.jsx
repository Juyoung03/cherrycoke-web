import { useNavigate } from "react-router-dom";

const StepResult = ({data}) => {
    const nav = useNavigate();
    return(
        <div className="w-screen">
            <form className="w-[358px] mx-auto">
                <div className="font-medium font-display text-[28px] py-[10px]">
                    <div>가입이 완료되었어요!</div>
                </div>

                <div>
                    <p>{data.username}</p>
                    <p>{data.nickname}</p>
                    <p>{data.password}</p>
                    <p>{data.phoneNumber}</p>
                    <p>{data.service_agree}</p>
                </div>

                <div className="absolute bottom-[34px] left-1/2 -translate-x-1/2">
                    <button 
                        className={"border border-box border-none w-[358px] h-[56px] rounded-md gap-[10px] text-lg bg-[#FF2655] text-white"}
                        onClick={() => nav("/")}
                    >
                        시작하기
                    </button>
                </div>
            </form>
        </div>
    )
}

export default StepResult;