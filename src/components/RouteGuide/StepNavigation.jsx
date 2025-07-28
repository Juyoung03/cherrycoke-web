const StepNavigation = ({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  isFinished,
  onFinish
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  if (isFinished) return;

  return (
    <div className="flex border border-[#E1E1E1] h-[43px] rounded-[30px] justify-between items-center mt-[7px]">
        <div className="w-[50%] text-center text-[#747785]">
            {isFirstStep ? (
                <button
                    onClick={() => alert("이전 단계가 없습니다.")}
                    className="cursor-not-allowed"
                >
                    이전 단계
                </button>
            ) : (
                <button
                    onClick={onPrev}
                    className="cursor-pointer"
                >
                    이전 단계
                </button>
            )}
        </div>
        <div className="w-[50%] text-center text-[#747785]">
        {!isLastStep ? (
            <button
                onClick={onNext}
                className="cursor-pointer"
            >
                다음 단계
            </button>
        ) : (
            <button
                onClick={() => {
                    if (isLastStep) {
                        onFinish();
                    }
                }}
                
            >
                다음 단계
            </button>
        )}
        </div>
    </div>
  );
};

export default StepNavigation;
