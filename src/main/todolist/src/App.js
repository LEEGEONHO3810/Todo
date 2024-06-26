/* eslint-disable*/

import React, {useState, useEffect} from 'react';
import './App.css';
import './style.css';
import Lists from "./components/Lists";
import Form from "./components/Form";
import UserLogin from "./components/Header";
import axios from 'axios';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'; // css import //  토욜?? 왜빨겅색 토욜은 빠라낵 지우기
import moment from 'moment';



function NextIcon() {
    return ">";
}

function PrevIcon() {
    return "<";
}

function App() {
  const [message, setMessage]=useState([]);

    const [todoData , setTodoData] = useState([]);
    const [value , setValue] = useState("");
    const [calenderValue, setCalOnChange] = useState(new Date()); // 달력
    const [mark, setMark] = useState([]);

    //  db에서 List 뿌리기
    useEffect(() => {

        const formattedDate  = moment(calenderValue).format("YYYY-MM-DD");
        const loadData = async () => {
            try {
                const response = await axios.get('/api/List',{
                    params: {
                        date: formattedDate
                    }
                });
                const loadedTodos = response.data.map(item =>  ({
                    id: Number(item.clm_id),
                    seq: Number(item.clm_seq),
                    Date: item.clm_date,
                    title: item.clm_text,
                    completed: item.clm_yn === "1" // 완료여부
                }));
                setTodoData(loadedTodos);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);

    const handleSubmit = (e) => {

        // 클릭한 날짜를 format함
        const formattedDate  = moment(calenderValue).format("YYYY-MM-DD");
        e.preventDefault();
        if(value === ''){
            alert("할 일을 입력해주세요");
        }else{
            const maxSeq = todoData.reduce((max, todo) => Math.max(max, todo.seq), 0);

            // 새로운 todo 객체 생성
            const newTodo = {
                id: Number(maxSeq)+1,
                Date: formattedDate,
                title: value,
                completed: false
            };

            // prev -> 이전 배열을 가져와서 복사를 한다음 newTodo 를 맨뒤에 넣고 setTodoData 여기에 집어넣음
            setTodoData(prev => [...prev, newTodo]);
            setValue("");

            axios.post("api/Add", newTodo
            ).then(function (response) {
                location.reload();
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    // 달력 onChange 함수
    const calOnChange = async (e) => {
        setCalOnChange(e);
        // 비동기로 보냄
        await loadDotData(moment(e).format("YYYY-MM"));

        // 기존에 지정된 날짜 맨처음은 -> 오늘날짜
        const prevDay = moment(calenderValue).format("YYYY-MM-DD");
        // 날짜를 YYYY-MM-DD 형식으로 추출
        const formattedDate = moment(e).format("YYYY-MM-DD");

        // 날짜 중복체크
        if(prevDay !== formattedDate){
            // API 호출
            try {
                const response = await axios.get('/api/List', {
                    params: { date: formattedDate }
                });
                // API 응답을 처리
                const loadedTodos = response.data.map(item => ({
                    id: Number(item.clm_id),
                    seq: Number(item.clm_seq),
                    Date: item.clm_date,
                    title: item.clm_text,
                    completed: item.clm_yn === "1"
                }));
                setTodoData(loadedTodos);
            } catch (error) {
                console.error(error);
            }
        }else{
        }
    };

    useEffect(() => {
        //mount시 달력의 첫번쨰 일자를 가져와서 년도-달을 가져옴
        loadDotData(moment(calenderValue).format("YYYY-MM"));
    }, []);

    const loadDotData = async (formattedMonth) => {
        try {
            const response = await axios.get('/api/DotList', {
                params: { date: formattedMonth }
            });
            const loadedData = response.data.map(item => ({
                Date: item.clm_date,
            }));
            setMark(loadedData);
        } catch (error) {
            console.log(error);
        }
        //console.log(setMark);

    };


    return (
        <div className="main-container">
            <div className="md:w-4/4 p-4 bg-white m-4 shadow-lg rounded">
                <div className="text-xl font-bold text-gray-800 mb-4 text-center"  >To Do List</div>

                <UserLogin/>
            </div>
            <div className="flex items-center justify-center max-w-full h-auto bg-blue-100">
                <div>
                    <Calendar locale="ko"
                              onChange={calOnChange}
                              value={calenderValue}
                              next2Label={null}
                              nextLabel={<NextIcon/>}
                              prevLabel={<PrevIcon/>}
                              prev2Label={null}
                              onActiveStartDateChange={({
                                                            action,
                                                            activeStartDate,
                                                            value,
                                                            view
                                                        }) => loadDotData(moment(activeStartDate).format("YYYY-MM"))}
                              tileContent={({date, view}) => {
                                  const formattedDate = moment(date).format("YYYY-MM-DD");

                                  if (mark.find((item) => item.Date === formattedDate)) {
                                      return (
                                          <>
                                              <div className="flex justify-center items-center absoluteDiv">
                                                  <div className="dot"></div>
                                              </div>
                                          </>
                                      );
                                  }
                              }}
                    />
                    <div className="text-gray-500 mt-4">
                        {moment(calenderValue).format("YYYY년 MM월 DD일")}
                    </div>
                </div>
                <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
                    <div className="flex justify-between mb-3">
                        <h1>할 일 목록</h1>
                    </div>
                    <Lists todoData={todoData}
                           setTodoData={setTodoData}
                           calenderValue={calenderValue}
                           setCalOnChange={setCalOnChange}
                    />
                    <Form value={value} setValue={setValue} handleSubmit={handleSubmit}/>
                </div>
            </div>
        </div>
    );
}

export default App;