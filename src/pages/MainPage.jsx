import { useNavigate } from "react-router-dom";


const MainPage = () => {
    const nav = useNavigate();

    return (
        <>
            <div>main Page</div>
            <button 
                onClick={()=>nav("login")} 
                // style={{"padding" : 100}} 
            >
                login Page
            </button>
        </>
    )
};



export default MainPage;