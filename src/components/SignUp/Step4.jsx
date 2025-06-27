import {useForm} from "react-hook-form";
import StepIndicator from "./StepIndicator";
import { useState } from "react";

const Step4 = ({onNext}) => {
    const {register, handleSubmit} = useForm();

    const [checkboxes, setCheckboxes] = useState({
        option1: false,
        option2: false,
    });

    const [allChecked, setAllChecked] = useState(false);

    const handleAllCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setAllChecked(isChecked);
        setCheckboxes({
            option1: isChecked,
            option2: isChecked,
        });
    };

    const handleCheckboxChange = (e) => {
        const {name, checked} = e.target;
        setCheckboxes((prevCheckboxes) => {
            const updatedCheckboxes = {
                ...prevCheckboxes,
                [name]: checked,
            };

            const allCheckStatus = Object.values(updatedCheckboxes).every(Boolean);
            setAllChecked(allCheckStatus);
            return updatedCheckboxes;
        });
    };
    
    const onSubmit = (data) => {
        console.log(data);
        onNext(data);
    };

    return (
        <div>
            <StepIndicator currentStep={3}/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="font-medium font-display text-[28px] py-[10px]">
                    <p>체리맵 서비스 이용약관에</p>
                    <p>동의해주세요</p>
                </div>
        
                <div className="border border-black">
                    <article className={`border border-box w-[358px] h-[60px] rounded-md text-lg content-center pl-[19px]
                                        ${!allChecked ? 'border-[#E6E6E6]' : 'text-[#FF2655] border-[#FF2655]'}`}>
                        <input 
                            type="checkbox"
                            checked={allChecked}
                            onChange={handleAllCheckboxChange}
                            className="hidden peer"
                            
                        />
                        <label htmlFor="all">약관 전체 동의</label>
                    </article>
                    <ul>
                        <li className="border border-box border-none w-[358px] h-[25px] rounded-md text-[#5C5C5C]">
                            <div>
                                <input 
                                    type="checkbox" 
                                    name="option1"
                                    checked={checkboxes.option1}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="agree1">
                                    (필수) 이용약관 동의
                                </label>
                            </div>
                        </li>
                        <li className="border border-box border-none w-[358px] h-[25px] rounded-md text-[#5C5C5C]">
                            <div>
                                <input 
                                    type="checkbox" 
                                    name="option2"
                                    checked={checkboxes.option2}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="agree2">
                                    (필수) 개인정보 수집 및 이용 동의
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="absolute bottom-[34px] left-1/2 -translate-x-1/2">
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

export default Step4;