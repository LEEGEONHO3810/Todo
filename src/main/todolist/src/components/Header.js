
// import "./styles.css";
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom';


export default function App(){

    const isDesktopOrMobile = useMediaQuery({query: '(max-width:768px)'});
    const navigate = useNavigate();

    const SrcUserLogin = () => {
        navigate("/UserLogin");
    }

    return (
        <div className="App">
            {isDesktopOrMobile !== true ?
                <div style={{border: "none", width: "auto" , textAlign: "right"}}>
                    <div>
                        <button type="submit" onClick={SrcUserLogin} >로그인</button>
                    </div>
                </div>
                :
                <div style={{border: "none", width: "auto" , textAlign: "center"}}>
                    <h1>모바일 화면 입니다.</h1>
                    <h2>줄어든 후 입니다.</h2>
                    <button type="submit" onClick={SrcUserLogin} >로그인</button>
                </div>
            }
        </div>
    );
}