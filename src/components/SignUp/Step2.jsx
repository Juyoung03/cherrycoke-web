import { useState, useEffect } from "react";
import {useForm} from "react-hook-form";
import StepIndicator from "./StepIndicator";

const Step2 = ({onNext}) => {
    const {
        register, 
        handleSubmit, 
        watch,
        formState: {errors, isValid},
    } = useForm({mode: "onChange"});

    const [isActive, setIsActive] = useState(false);
    const pwValue = watch("pw");

    
    
    useEffect(() => {
        setIsActive(isValid);
    }, [isValid]);
    
    const onSubmit = (data) => {
        console.log(data);
        setIsActive(isActive);
        onNext(data);
    };

    return (
        <div>
            <StepIndicator currentStep={1}/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="font-medium font-display text-[28px] py-[10px]">
                <p>아이디와 비밀번호를</p>
                <p>입력해주세요</p>
            </div>
            <div className="mt-[37px]">
                <p className="mb-[4px]">아이디</p>
                <input 
                    placeholder="아이디를 입력해주세요" 
                    {...register("id", {required:true})} 
                    className="w-[358px] h-[51px] py-[16px] px-[15px] border rounded-md border-[#E6E6E6]"
                />
            </div>

            <div className="mt-[38px] fixed">
                <p className="mb-[4px]">비밀번호</p>
                <input 
                    type="password"
                    placeholder="비밀번호를 입력해주세요" 
                    autoComplete="off"
                    {...register("pw", {
                        required:true,
                        minLength: {
                            value: 6,
                            message: "최소 6자 이상으로 입력해주세요.",
                        },
                        pattern: {
                            value: /^(?=.*[!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]).{6,}$/,
                            message: "특수 문자를 1개 이상 포함해서 입력해주세요.",
                        }
                    })} 
                    className="w-[358px] h-[51px] py-[16px] px-[15px] border rounded-md border-[#E6E6E6]"
                />
                {errors.pw && (
                    <p className="text-[#FF2655] text-sm">{errors.pw.message}</p>
                )
                }
            </div>

            <div className="mt-[150px] fixed">
                <p className="mb-[4px]">비밀번호 확인</p>
                <input 
                    type="password"
                    placeholder="비밀번호를 한번 더 입력해주세요" 
                    autoComplete="off"
                    {...register("pw_valid", {
                        required:true,
                        validate: (value) => value === pwValue || "동일한 비밀번호를 입력해주세요.",
                    })} 
                    className="w-[358px] h-[51px] py-[16px] px-[15px] border rounded-md border-[#E6E6E6]"
                />
                {errors.pw_valid && (
                    <p className="text-[#FF2655] text-sm">{errors.pw_valid.message}</p>
                )}
            </div>

            <div className="absolute bottom-[34px]">
                <button 
                    type="submit"
                    disabled={!isActive}
                    className={`border border-box border-none w-[358px] h-[56px] rounded-md gap-[10px] text-lg text-[#C7C7C7] 
                    ${!isActive ? 'bg-[#F0F0F0] text-[#C7C7C7]' : 'bg-[#FF2655] text-white'}`}
                >
                    계속하기
                </button>
            </div>
        </form>
    </div>
    )

}

export default Step2;