import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 에러 핸들링 추가
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  console.error('Error message:', event.message);
  console.error('Error source:', event.filename, event.lineno);
});

// Promise rejection 에러 핸들링
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// 스플래시 스크린 숨기기 (에러 방지)
const hideSplash = async () => {
  try {
    const { SplashScreen } = await import('@capacitor/splash-screen');
    await SplashScreen.hide();
  } catch (error) {
    // 웹 브라우저나 플러그인이 없을 때는 무시
    console.log('SplashScreen not available:', error);
  }
};

// 앱이 로드되면 스플래시 숨기기
setTimeout(() => {
  hideSplash();
}, 2000);

try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} catch (error) {
  console.error('Failed to render app:', error);
  document.getElementById('root').innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h1>앱 로드 실패</h1>
      <p>에러: ${error.message}</p>
      <pre>${error.stack}</pre>
    </div>
  `;
}
