import { useEffect } from "react";
import Info from "../components/LoginInfo/Info";

const LoginPage = () => {
    // 스크롤 완전 차단
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="relative flex flex-col items-center min-h-screen overflow-y-auto w-full">
            <Info />
        </div>
    )
};


export default LoginPage;