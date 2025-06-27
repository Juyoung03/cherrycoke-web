import Header from "../components/Header";
import Step from "../components/SignUp/Step";
import closeImg from "../icons/close.svg";

const SignupPage = () => {
    return (
        <div className="relative flex flex-col items-center h-screen overflow-hidden">
        
           <Header 
                text="회원가입"
                left_img={closeImg}
            />
           
            <Step />
        </div>
    
    )
}


export default SignupPage;