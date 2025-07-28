import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainPage from "./pages/MainPage";
import RouteFinderPage from "./pages/RouteFinderPage";
import MapPage from "./pages/MapPage";
import SettingPage from "./pages/SettingPage";
import ChatbotPage from "./pages/ChatbotPage";
import EditPage from "./pages/EditPage";
import RecordsPage from "./pages/RecordsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
