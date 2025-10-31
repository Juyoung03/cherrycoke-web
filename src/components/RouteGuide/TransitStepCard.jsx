// src/components/RouteGuide/TransitStepCard.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StepNavigation from "./StepNavigation";

const TransitStepCard = ({ data }) => {
  const nav = useNavigate(); // ✅ 반드시 최상단에서 실행
  const [currentStep, setCurrentStep] = useState(0); // ✅ 최상단
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const plan = data;
  console.log(plan);
  
  //const plan = data?.metaData?.plan?.itineraries?.[0];
  if (!data) return (
    <div className="w-[358px] rounded-md flex flex-col items-center justify-center">
      <p>경로가 없습니다.</p> 
      <p>걷기로 다시 시도해주세요.</p>
      <div className="border border-[#A1A1A1] w-[358px] h-[43px] flex justify-center mt-[9px] rounded-[5px]">
            <button
                className="text-[#272727]"
                onClick={() => nav("/")}
            >
                홈으로
            </button>
        </div>
    </div>);

  const RouteSteps = [];

  plan.legs.forEach((leg) => {
    if (leg.mode === "WALK") {
        const end = leg.end.name || "";
        if (leg.steps) {
          leg.steps.forEach((step) => {
            RouteSteps.push({
              type: "walk",
              description: step.description,
              destination: end,
        });
      });
    }
    } else if (leg.mode === "BUS") {
      const stations = leg.passStopList?.stationList || [];
      RouteSteps.push({
        type: "bus",
        route: leg.route,
        stations: stations,
        count: stations.length - 1,
        busType: leg.type,
        busColor: leg.routeColor,
      });
    } else if (leg.mode === "SUBWAY") {
        const stations = leg.passStopList?.stations || [];
        RouteSteps.push({
            type: "subway",
            route: leg.route,
            stations: stations,
            count: stations.length - 1,
            subwayColor: leg.routeColor, 
        })
    }
  });

  const handleNext = () => {
    const step = RouteSteps[currentStep];

    if ((step.type === "bus" || step.type === "subway") && step.stations.length > 1) {
      if (currentStationIndex < step.stations.length - 1) {
        setCurrentStationIndex((prev) => prev + 1);
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, RouteSteps.length));
    setCurrentStationIndex(0);
  };

  const handlePrev = () => {
    if (currentStationIndex > 0) {
    setCurrentStationIndex((prev) => prev - 1);
    return;
  }

  if (currentStep > 0) {
    const prevStep = RouteSteps[currentStep - 1];
    setCurrentStep((prev) => prev - 1);

    // 이전 단계가 정거장 여러 개면 맨 끝 정거장으로
    if ((prevStep.type === "bus" || prevStep.type === "subway") && prevStep.stations.length > 0) {
      setCurrentStationIndex(prevStep.stations.length - 1);
    } else {
      setCurrentStationIndex(0);
    }
  }
  };

  const step = RouteSteps[Math.min(currentStep, RouteSteps.length - 1)];
  const finalDestination = RouteSteps[RouteSteps.length - 1]?.destination || "";
  

  return (
    <div className="w-[358px] rounded-md">
      <div>
        {!isFinished ? ( 
        <>
        {step.type === "walk" && (
          <>
            <div className="h-[31px] bg-[#FFC7D3] rounded-t-[5px] text-[15px] text-white flex items-center px-[19px] justify-between">
              <div>{String(currentStep + 1).padStart(2, '0')}</div>
            </div>

            <div className="border border-[#E1E1E1] border-t-0 rounded-b-[5px] p-[10px]">
                <div className="w-[320px] flex mx-auto mb-1 flex-col text-[22px]">
                    {step.destination}까지 걷기
                </div>
                <hr className="w-[320px] flex mx-auto border-[#DDDDDD]" />
                <div className="w-[320px] flex mx-auto mt-1 text-[18px]">
                    {step.description}하세요
                </div>
            </div>

          </>
        )}

        {step.type === "bus" && (
          <>
            {currentStationIndex === 0 && (
              <>
                <div className="border border-black rounded-md h-[48px] flex items-center justify-center mb-[9px]">
                  다음에 오는 <strong className="ml-[4px]">{step.route.match(/\d+/g)}</strong>번 버스를 타세요.
                </div>
              </>
            )}
            {currentStationIndex === step.stations.length - 2 && (
              <>
                <div className="border border-black rounded-md h-[48px] flex items-center justify-center mb-[9px]">
                  다음 정류장에서 내려야 해요!
                </div>
              </>
            )}
            {currentStationIndex === step.stations.length - 1 && (
              <>
                <div className="border border-black rounded-md h-[48px] flex items-center justify-center mb-[9px]">
                  곧 도착해요! 버스벨을 눌러주세요.
                </div>
              </>
            )}
              
            
            <div
              className="h-[31px] bg-[#38416C] rounded-t-[5px] text-[15px] text-white flex items-center px-[19px] justify-between"
            >
              <div>{String(currentStep + 1).padStart(2, '0')}</div>
            </div>
            <div className="border border-[#E1E1E1] border-t-0 rounded-b-[5px] p-[10px]">
                <div className="w-[320px] flex mx-auto mb-1 flex-col">
                    <p className="text-[22px]">{step.stations[0]?.stationName}역에서 타기</p>
                    <div className="flex flex-row items-center gap-[3px]">
                        <div 
                            className="h-[19px] text-[12px] font-semibold text-white rounded-sm px-[5px]"
                            style={{backgroundColor: `#${step.busColor}`}}   
                        >
                            {step.busType === 3 && "마을"}
                            {step.busType === 5 && "공항"}
                            {step.busType === 10 && "외곽"}
                            {step.busType === 11 && "간선"}
                            {step.busType === 12 && "지선"}
                            {step.busType === 13 && "순환"}
                            {step.busType === 14 && "광역"}
                            {step.busType === 16 && "시외"}
                            {step.busType === 22 && "시외버스"}
                            {step.busType === 23 && "고속버스"}
                            {!step.busType && "기타"}
                        </div>
                        <p className="text-[17px]">{step.route.match(/\d+/g)}</p>
                    </div>
                </div>
                <hr className="w-[320px] flex mx-auto border-[#DDDDDD]" />
                <div className="w-[320px] flex mx-auto mt-1">
                    
                    <ul>
                        <li className="text-[15px] flex flex-row gap-[5px]">
                          <p>현재 정류장 : </p>
                          {step.stations[currentStationIndex]?.stationName}
                        </li>
                    </ul>
                </div>
            </div>
          </>
        )}

        {step.type === "subway" && (
          <>
          {currentStationIndex === 0 && (
              <>
                <div className="border border-black rounded-md h-[48px] flex items-center justify-center mb-[9px]">
                  다음에 오는 지하철을 타세요.
                </div>
              </>
            )}
            {currentStationIndex === step.stations.length - 2 && (
              <>
                <div className="border border-black rounded-md h-[48px] flex items-center justify-center mb-[9px]">
                  다음 역에서 내려야 해요!
                </div>
              </>
            )}
            {currentStationIndex === step.stations.length - 1 && (
              <>
                <div className="border border-black rounded-md h-[48px] flex items-center justify-center mb-[9px]">
                  곧 도착해요! 지하철이 멈추면 내려주세요.
                </div>
              </>
            )}
            <div
              className="h-[31px] rounded-t-[5px] text-[15px] text-white flex items-center px-[19px] justify-between"
              style={{backgroundColor : `#${step.subwayColor}`}}
            >
              <div>{String(currentStep + 1).padStart(2, '0')}</div>
            </div>
            <div className="border border-[#E1E1E1] border-t-0 rounded-b-[5px] p-[10px]">
                <div className="w-[320px] flex mx-auto mb-1 flex-row text-[18px] gap-[5px]">
                    <p style={{color : `#${step.subwayColor}`}}>{step.route}</p>
                    <p>{step.stations[0]?.stationName}역에서 타기</p>
                    
                </div>
                <hr className="w-[320px] flex mx-auto border-[#DDDDDD]" />
                <div className="w-[320px] flex mx-auto mt-1">
                    
                    <ul>
                        <li className="text-[15px] flex flex-row gap-[5px]">
                          <p>현재역: </p>
                          {step.stations[currentStationIndex]?.stationName}
                        </li>
                    </ul>
                </div>
            </div>
          </>
        )}
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
        currentStep={currentStep}
        totalSteps={RouteSteps.length}
        onPrev={handlePrev}
        onNext={handleNext}
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
                  onClick={() => {
                    // RouteSteps 배열에 넣은 마지막 destination을 꺼내서 넘겨줍니다.
                    const finalDestination = RouteSteps[RouteSteps.length - 1]?.destination || "";
                    nav("/records", { state: { destination: finalDestination } });
                  }}
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
  );
};

export default TransitStepCard;
