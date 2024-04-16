
// import "./styles.css";
import { useMediaQuery } from 'react-responsive'


export default function App(){

    const isDesktopOrMobile = useMediaQuery({query: '(max-width:768px)'});


    return (
        <div className="App">
            {isDesktopOrMobile !== true ?
                <div style={{border: "none", width: "auto" , textAlign: "right"}}>
                </div>
                :
                <div style={{border: "none", width: "auto" , textAlign: "center"}}>
                </div>
            }
        </div>
    );
}