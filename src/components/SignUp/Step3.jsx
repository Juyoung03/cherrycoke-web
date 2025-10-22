import {useForm} from "react-hook-form";
import StepIndicator from "./StepIndicator";

const Step3 = ({onNext}) => {
    const {register, handleSubmit} = useForm();
    
    const onSubmit = (data) => {
        const rawNumber = data.phoneNumber?.replace(/\D/g, ""); // 숫자만 추출
        if (rawNumber?.length === 11) {
            data.phoneNumber = rawNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
        }
        else if (rawNumber?.length != 0) {
            alert("전화번호를 다시 확인해주세요.");
            return;
        }
        console.log(data);
        onNext(data);
    };

    return (
        <div className="w-screen">
            <StepIndicator currentStep={2}/>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[358px] mx-auto">
                <div className="w-[358px] mx-auto">
                    <div className="font-medium font-display text-[28px] py-[10px]">
                        <p>비상 연락처(선택)</p>
                    </div>
                    <div className="font-regular text-[16px] text-gray-600">
                        <p>예기치 못한 상황 발생 시, 신속한 연락을 위해 사용돼요.</p>
                        <p>입력하지 않으셔도 회원가입이 가능해요.</p>
                    </div>

                    <div className="my-[37px]">
                        <input 
                            placeholder="비상연락처를 입력해주세요" 
                            {...register("phoneNumber", {required:false})} 
                            className="w-[358px] h-[51px] py-[16px] px-[15px] border rounded-md border-[#E6E6E6]"
                        />
                    </div>
                </div>

                <div className="absolute bottom-[42px] left-1/2 -translate-x-1/2">
                    <button 
                        className={"border border-box border-none w-[358px] h-[56px] rounded-md gap-[10px] text-lg bg-[#FF2655] text-white"}
                    >
                        계속하기
                    </button>
                </div>
            </form>
        </div>
    )
    
}

export default Step3;