import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainPage from "./pages/MainPage";
import RouteFinderPage from "./pages/RouteFinderPage";
import MapPage from "./pages/MapPage";
import SettingPage from "./pages/SettingPage";
import ChatbotPage from "./pages/ChatbotPage";
import EditPage from "./pages/EditPage";
import RecordsPage from "./pages/RecordsPage";
import OnboardingPage from "./pages/OnboardingPage";

function App() {
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    // 온보딩 완료 여부 확인
    const onboardingCompleted = localStorage.getItem("onboarding_completed");
    console.log("온보딩 상태 확인:", onboardingCompleted);
    setShowOnboarding(onboardingCompleted !== "true");
  }, []);

  // 로딩 중
  if (showOnboarding === null) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        {showOnboarding ? (
          <Route path="*" element={<OnboardingPage />} />
        ) : (
          <>
            <Route path="/" element={<MainPage />} />
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/routefinder" element={<RouteFinderPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="/records" element={<RecordsPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
