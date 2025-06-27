import { useEffect, useState } from "react";
import "./Info.css";
import { useNavigate } from "react-router-dom";

const Info = () => {

    const [userList, setUserList] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5173/data/loginData.json', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setUserList(data);
            });
    }, [])

    const nav = useNavigate();

    const [active, setActive]= useState(false);
   
    const [inputs, setInputs] = useState({
        id: '',
        pw: ''
    });

    const {id, pw} = inputs;

    const onChange = (e) => {
        const {name, value} = e.target;

        const nextInputs = {
            ...inputs,
            [name] : value,
        }
        setInputs(nextInputs);
        console.log(inputs);
    };

    useEffect(()=>{
        const isActive = id && pw;
        setActive(isActive);
    }, [id, pw]);

    const goToMain = () => {
        const checkUser = userList.find(user => user.id === id
            && user.pw === pw
        );

        if (checkUser) {
            alert('로그인 성공');
        }
        else {
            alert('로그인 실패');
        }
    }

    return (
        <>
        <div className="wrapper">
            <div  className="header_wrapper">
                <h1>로그인을 해주세요!</h1>
                <p>체리맵만의 서비스를 만나보실 수 있어요</p>
            </div>

            <div className="main_wrapper">
                <div>
                    <form className="info_wrapper">
                    <input 
                        type="id" 
                        name="id"
                        value={id}
                        onChange={onChange}
                        placeholder="아이디를 입력해주세요"
                        
                    />
                    <input 
                        type="password"
                        name="pw"
                        value={pw}
                        onChange={onChange}
                        autoComplete="off"
                        placeholder="비밀번호를 입력해주세요" 
                        
                    />
                    </form>
                </div>

                <div className="check_wrapper">
                    
                    <input type="checkbox" className="login_checkbox"/>
                    <div className="label_box">
                        <label htmlFor="" className="check_text">로그인 상태 유지</label>
                    </div>
                    
                </div>
            </div>

                <div className="buttons_wrapper">
                    <button>아이디 찾기</button> |
                    <button>비밀번호 찾기</button> |
                    <button onClick={() => nav("/signup")}>회원가입</button>
                </div>

            </div>

            <div className="footer_wrapper">
                <button 
                    onClick={goToMain}
                    disabled={!active}
                    className={!active ? 'ach_login_button' : 'rej_login_button'}
                >
                    로그인
                </button>
            </div>
        </>
    )
}

export default Info;