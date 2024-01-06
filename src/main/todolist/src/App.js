/* eslint-disable*/

import React, {useState, useEffect} from 'react';
import './App.css';
import Lists from "./components/Lists";
import Form from "./components/Form";
import axios from 'axios';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'; // css import //  토욜?? 왜빨겅색 토욜은 빠라낵 지우기
import moment from 'moment';


function App() {
  const [message, setMessage]=useState([]);

    const [todoData , setTodoData] = useState([]);
    const [value , setValue] = useState("");
    const [todoId, setTodoId] = useState(1); // id count
    const [calenderValue, setCalOnChange] = useState(new Date()); // 달력

    //  db에서 List 뿌리기
    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const day = ('0' + currentDate.getDate()).slice(-2);
        const formattedDate = `${year}-${month}-${day}`;

        const loadData = async () => {

            try {
                const response = await axios.get('/api/List',{
                    params: {
                        date: formattedDate
                    }
                });
                const loadedTodos = response.data.map(item =>  ({
                    id: Number(item.clm_id),
                    Date: item.clm_date,
                    title: item.clm_text,
                    completed: item.clm_yn === "1"

                }));
                if(response.data.length == 0){
                    setTodoId(1);
                }else{
                    setTodoId(Number(response.data[0].max_id));
                }
                setTodoData(loadedTodos);

            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);

    const handleSubmit = (e) => {

        // 당일 날짜를 fotmat함 쓸일이 있으러나... 일단 keep;;
        // const currentDate = new Date();
        // const year = currentDate.getFullYear();
        // const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        // const day = ('0' + currentDate.getDate()).slice(-2);
        // const toydayformattedDate = `${year}-${month}-${day}`;

        // 클릭한 날짜를 format함
        const formattedDate  = moment(calenderValue).format("YYYY-MM-DD");
        e.preventDefault();

        // 새로운 todo 객체 생성
        const newTodo = {
            id: todoId || 1,
            Date: formattedDate,
            title: value,
            completed: false
        };
        // prev -> 이전 배열을 가져와서 복사를 한다음 newTodo 를 맨뒤에 넣고 setTodoData 여기에 집어넣음
        setTodoData(prev => [...prev, newTodo]);
        setValue("");
        setTodoId(todoId + 1);

        axios.post("api/Add", newTodo
        ).then(function (response) {

        }).catch(function (error) {
            console.log(error);
        });
    }

    // 달력 onChange 함수
    const calOnChange = async (e) => {
        setCalOnChange(e);

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
                    Date: item.clm_date,
                    title: item.clm_text,
                    completed: item.clm_yn === "1"
                }));
                if(response.data.length == 0){
                    setTodoId(1);
                }else{
                    setTodoId(Number(response.data[0].max_id));
                }
                setTodoData(loadedTodos);
            } catch (error) {
                console.error(error);
            }
        }else{
            console.log("sss");
        }
    };
  return (
      <div>
          <div className="flex items-center justify-center w-screen h-screen bg-blue-100" >
              <div>
                  <Calendar locale="ko"
                            onChange={calOnChange}
                            value={calenderValue}/>
                  <div className="text-gray-500 mt-4">
                      {moment(calenderValue).format("YYYY년 MM월 DD일")}
                  </div>
              </div>

              <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
                  <div className="flex justify-between mb-3">
                      <h1>할 일 목록</h1>
                  </div>
                  <Lists todoData={todoData} setTodoData={setTodoData} calenderValue={calenderValue} setCalOnChange={setCalOnChange}   />
                  <Form value = {value}  setValue = {setValue}  handleSubmit={handleSubmit} />
              </div>
          </div>
      </div>
  );
}

export default App;