import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import onboarding1Img from "./onboarding1.svg";
import onboarding2Img from "./onboarding2.svg";
import "./Onboarding.css";

const Onboarding = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();

    // 스크롤 완전 차단
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleNext = () => {
        if (currentStep === 0) {
            // 첫 번째 페이지: 다음 버튼
            setCurrentStep(1);
        } else {
            // 두 번째 페이지: 시작하기 버튼
            localStorage.setItem("onboarding_completed", "true");
            // 페이지 전체 리로드하여 App.jsx가 상태를 다시 확인하도록 함
            window.location.href = "/";
        }
    };

    const handleSkip = () => {
        localStorage.setItem("onboarding_completed", "true");
        window.location.href = "/";
    };

    return (
        <div className="onboarding-container">
            {/* 첫 번째 페이지 */}
            {currentStep === 0 && (
                <div className="onboarding-page">
                    <img 
                        src={onboarding1Img} 
                        alt="온보딩 1" 
                        className="onboarding-image onboarding-image-first"
                    />
                    <div className="onboarding-footer">
                        <button 
                            onClick={handleNext}
                            className="onboarding-button onboarding-button-active"
                        >
                            다음
                        </button>
                    </div>
                </div>
            )}

            {/* 두 번째 페이지 */}
            {currentStep === 1 && (
                <div className="onboarding-page">
                    <img 
                        src={onboarding2Img} 
                        alt="온보딩 2" 
                        className="onboarding-image onboarding-image-second"
                    />
                    <div className="onboarding-footer">
                        <button 
                            onClick={handleNext}
                            className="onboarding-button onboarding-button-active"
                        >
                            시작하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Onboarding;

