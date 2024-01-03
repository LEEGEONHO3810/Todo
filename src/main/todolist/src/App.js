/* eslint-disable*/

import React, {useState, useEffect} from 'react';
import './App.css';
import Lists from "./components/Lists";
import Form from "./components/Form";
import axios from 'axios';

function App() {
  const [message, setMessage]=useState([]);

    const [todoData , setTodoData] = useState([]);
    const [value , setValue] = useState("");
    const [todoId, setTodoId] = useState(1); // id count

    //  db에서 List 뿌리기
    useEffect(() => {
        const loadData = async () => {

            try {
                const response = await axios.get('/api/List');

                const loadedTodos = response.data.map(item =>  ({

                    id: Number(item.clm_id),
                    Date: item.clm_date,
                    title: item.clm_text,
                    completed: Boolean(item.clm_yn) == "1"

                }));
                setTodoId(Number(response.data[0].max_id));
                setTodoData(loadedTodos);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);

    const handleSubmit = (e) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const day = ('0' + currentDate.getDate()).slice(-2);

        const formattedDate = `${year}-${month}-${day}`;
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
  return (
      <div>
          <div className="flex items-center justify-center w-screen h-screen bg-blue-100" >
              <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
                  <div className="flex justify-between mb-3">
                      <h1>할 일 목록</h1>
                  </div>
                  <Lists todoData={todoData} setTodoData={setTodoData} />
                  <Form value = {value}  setValue = {setValue}  handleSubmit={handleSubmit} />
              </div>
          </div>
      </div>
  );
}

export default App;