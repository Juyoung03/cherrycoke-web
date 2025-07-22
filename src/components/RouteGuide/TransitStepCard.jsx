import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TransitStepCard = ({ data }) => {
  const nav = useNavigate(); // ✅ 반드시 최상단에서 실행
  const [currentStep, setCurrentStep] = useState(0); // ✅ 최상단

  const plan = data?.metaData?.plan?.itineraries?.[0];
  if (!plan) return <div>로딩 중</div>;

  const RouteSteps = [];

  plan.legs.forEach((leg) => {
    if (leg.mode === "WALK") {
        const end = leg.end.name;
      leg.steps.forEach((step) => {
        RouteSteps.push({
          type: "walk",
          description: step.description,
          destination: end,
        });
      });
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
        const stations = leg.passStopList?.stationList || [];
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
    setCurrentStep((prev) => Math.min(prev + 1, RouteSteps.length));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  if (currentStep >= RouteSteps.length) {
    return (
      <div className="w-[358px] rounded-md text-center text-gray-700">
        경로 안내 완료
      </div>
    );
  }

  const step = RouteSteps[currentStep];
  

  return (
    <div className="w-[358px] rounded-md">
      <div>
        {step.type === "walk" && (
          <>
            <div className="h-[31px] bg-[#FFC7D3] rounded-t-[5px] text-[15px] text-white flex items-center px-[19px] justify-between">
              <div>{String(currentStep + 1).padStart(2, '0')}</div>
              
              <div className="cursor-pointer flex gap-2">
                    {currentStep > 0 && (
                      <button 
                        onClick={handlePrev}
                        className="text-white border border-white rounded-sm"
                      >
                        이전
                      </button>
                    )}
                    <button 
                      onClick={handleNext} 
                      className="text-white border border-white rounded-sm"
                    >
                        다음
                    </button>
                </div>
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
            <div
              className="h-[31px] bg-[#38416C] rounded-t-[5px] text-[15px] text-white flex items-center px-[19px] justify-between"
            >
              <div>{String(currentStep + 1).padStart(2, '0')}</div>
              
              <div className="cursor-pointer flex gap-2">
                    {currentStep > 0 && (
                      <button 
                        onClick={handlePrev}
                        className="text-white border border-white rounded-sm"
                      >
                        이전
                      </button>
                    )}
                    <button 
                      onClick={handleNext} 
                      className="text-white border border-white rounded-sm"
                    >
                        다음
                    </button>
                </div>
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
                        {step.stations.map((station, index) => (
                            <li key={index} className="text-[18px] text-[#959595]">{station.stationName}</li>
                        ))}
                    </ul>
                </div>
              
              
            </div>
          </>
        )}

        {step.type === "subway" && (
          <>
            <div
              className="h-[31px] rounded-t-[5px] text-[15px] text-white flex items-center px-[19px] justify-between"
              style={{backgroundColor : `#${step.subwayColor}`}}
            >
              <div>{String(currentStep + 1).padStart(2, '0')}</div>
              
              <div className="cursor-pointer flex gap-2">
                    {currentStep > 0 && (
                      <button 
                        onClick={handlePrev}
                        className="text-white border border-white rounded-sm"
                      >
                        이전
                      </button>
                    )}
                    <button 
                      onClick={handleNext} 
                      className="text-white border border-white rounded-sm"
                    >
                        다음
                    </button>
                </div>
            </div>
            <div className="border border-[#E1E1E1] border-t-0 rounded-b-[5px] p-[10px]">
                <div className="w-[320px] flex mx-auto mb-1 flex-col">
                    <p className="text-[22px]">{step.stations[0]?.stationName}역에서 타기</p>
                    
                </div>
                <hr className="w-[320px] flex mx-auto border-[#DDDDDD]" />
                <div className="w-[320px] flex mx-auto mt-1">
                    
                    <ul>
                        {step.stations.map((station, index) => (
                            <li key={index} className="text-[18px] text-[#959595]">{station.stationName}</li>
                        ))}
                    </ul>
                </div>
              
              
            </div>
          </>
        )}
      </div>

      <div className="border border-[#A1A1A1] h-[43px] flex justify-center mt-[9px] rounded-[5px]">
            <button
                className="text-[#272727]"
                onClick={() => nav("/")}
            >
                안내를 종료할까요?
            </button>
        </div>
    </div>
  );
};

export default TransitStepCard;
