import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepNavigation from "./StepNavigation";

const StepCard = ({data}) => {
    const nav = useNavigate();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const MainInstruction = (feature) => {
        
        const name = feature.properties.name;

        return name;
    }
    const simplifyInstruction = (feature) => {
    
        const {description, turnType, facilityType, name} = feature.properties;

        const turnTextMap = {
            11: "직진하세요",
            12: "왼쪽으로 가세요",
            13: "오른쪽으로 가세요",
            14: "뒤돌아서 가세요",
            16: "왼쪽으로 가세요",
            17: "왼쪽으로 가세요",
            18: "오른쪽으로 가세요",
            19: "오른쪽으로 가세요",
            184: "잠깐 들리는 곳입니다.",
            185: "첫 번째로 잠깐 들리는 곳입니다.",
            186: "두 번째로 잠깐 들리는 곳입니다.",
            187: "세 번째로 잠깐 들리는 곳입니다.",
            188: "네 번째로 잠깐 들리는 곳입니다.",
            189: "다섯 번째로 잠깐 들리는 곳입니다.",
            125: "육교롤 건너세요.",
            126: "지하보도를 건너세요.",
            127: "계단을 이용하세요.",
            128: "경사로를 이용하세요.",
            129: "계단과 경사로를 이용하세요.",
            200: "걸으세요.",
            201: "도착지입니다.",
            211: "횡단보도를 건너세요.",
            212: "왼쪽에 있는 횡단보도를 건너세요.",
            213: "오른쪽에 있는 횡단보도를 건너세요.",
            214: "왼쪽에 있는 횡단보도를 건너세요.",
            215: "왼쪽에 있는 횡단보도를 건너세요.",
            216: "오른쪽에 있는 횡단보도를 건너세요.",
            217: "오른쪽에 있는 횡단보도를 건너세요.",
            218: "엘리베이터를 이용하세요.",
            233: "직진하세요.",
        }

        const facilityTextMap = {
            1: "다리 위로",
            2: "터널 안으로",
            3: "다리처럼 생긴 길을 따라",
            11: "길을 따라",
            12: "육교(다리)를 따라",
            14: "지하보도를 따라",
            // 15: "횡단보도",
            16: "대형 시설물 이동 통로를 따라",
            18: "지하철 지하보도를 따라",

        }
        
        const turnMessage = turnTextMap[turnType] || "";
        const nameMessage = name && name.trim() !== "" 
            ? `${name}에서 ` : "";

        const faciltiyMessage = facilityTextMap[facilityType] || "";

        return `${nameMessage} ${faciltiyMessage} ${turnMessage}`.trim() || description;
    };

    if (!data || !data.features) return <div>로딩 중</div>
    //console.log(data);

    const steps = data.features.filter(f => f.geometry.type === 'Point');

    const currentStep = steps[currentStepIndex];
    const pointIndex = currentStep.properties.pointIndex;

    const matchingLine = data.features.find(
        f => f.geometry.type === 'LineString'
        && f.properties.lineIndex === pointIndex
    );

    const timeInSeconds = matchingLine?.properties?.time || 0;
    const timeInMinutes = Math.ceil(timeInSeconds / 60);

    return (
        <div className="w-[358px] rounded-md">
            <div>
            {!isFinished ? ( 
            <>
                <div className="h-[31px] bg-[#FFC7D3] rounded-t-[5px] text-[15px] text-white flex items-center px-[19px] justify-between">
                    <div>
                        {String(pointIndex + 1).padStart(2, '0')}
                    </div>
                    
                </div>
                <div className="border border-[#E1E1E1] border-t-0 rounded-b-[5px] p-[10px]">
                    <div className="w-[320px] flex mx-auto mb-1 justify-between">
                        <p>{MainInstruction(currentStep)}</p>
                        <p>{timeInMinutes}분</p>
                    </div>
                    <hr className="w-[320px] flex mx-auto border-[#DDDDDD]" />
                    <div className="w-[320px] flex mx-auto mt-1">
                        <p>{simplifyInstruction(currentStep)}</p>
                    </div>
                </div>
            </>
            ) : (
            <>
                <div className="w-[358px] border border-[#E1E1E1] rounded-md py-[22px] pl-[19px]">
                    <p className="text-[20px]">오늘도 안전하게 도착했어요.</p>
                    <p className="text-[#434343]">다음 여정도 기대해주세요.</p>
                </div>
            </>
            )}
        </div>
            
            <StepNavigation 
                currentStep={currentStepIndex}
                totalSteps={steps.length}
                onPrev={() => setCurrentStepIndex((prev) => prev - 1)}
                onNext={() => setCurrentStepIndex((prev) => prev + 1)}
                isFinished={isFinished}
                onFinish={() => setIsFinished(true)}
            />
            {isFinished ? (
                <div className="flex flex-row h-[43px] justify-between mt-[7px] gap-[6px]">
                <div className="border border-[#A1A1A1] flex justify-center w-full text-center rounded-[5px] cursor-pointer">
                    <button
                        className="text-[#272727] cursor-pointer"
                        onClick={() => nav("/")}
                    >
                        안내를 종료하기
                    </button>
                </div>
                <div className="border border-[#A1A1A1] bg-[#FF2655] flex justify-center w-full text-center rounded-[5px] cursor-pointer">
                    <button
                        className="text-white cursor-pointer"
                        onClick={() => nav("/records")}
                    >
                        기록하기
                    </button>
                </div>
                </div>
            ) : (
                <>
                <div className="border border-[#A1A1A1] h-[43px] flex justify-center mt-[9px] rounded-[5px]">
                    <button
                        className="text-[#272727]"
                        onClick={() => nav("/")}
                    >
                        안내를 종료할까요?
                    </button>
                </div>
                </>
            )}
        </div>
    )
}

export default StepCard;

