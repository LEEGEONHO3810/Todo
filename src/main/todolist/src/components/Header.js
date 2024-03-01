
// import "./styles.css";
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom';


export default function App(){
    const navigate = useNavigate();

    const isDesktopOrMobile = useMediaQuery({query: '(max-width:768px)'});

    const SrcUserLogin = () =>{
        navigate("/UserLogin")
    }

    return (
        <div className="App">
            {isDesktopOrMobile !== true ?
                <div style={{border: "none", width: "1000px" , textAlign: "right"}}>
                    <div>
                        <button type="submit" onClick={SrcUserLogin} >로그인</button>

                    </div>
                </div>
                :
                <div style={{border: "none", width: "500px" , textAlign: "center"}}>
                    <h1>모바일 화면 입니다.</h1>
                    <h2>줄어든 후 입니다.</h2>
                </div>
            }
        </div>
    );
}