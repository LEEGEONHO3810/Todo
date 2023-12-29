/* eslint-disable*/

import React, {useState, useEffect} from 'react';
import './App.css';
import Lists from "./components/Lists";
import Form from "./components/Form";
function App() {
  const [message, setMessage]=useState([]);

    const [todoData , setTodoData] = useState([]);
    const [value , setValue] = useState("");

//db연결
  useEffect(()=>{
    fetch("/api/test")
        .then((response)=>{
          return response.json();
        })
        .then((data)=>{
            console.log("!23232323")
        });
  },[]);


    const handleSubmit = (e) =>{
        e.preventDefault();

        //newTododata
        let newTodo ={
            id: Date.now(),
            title: value,
            complete : false
        }
        setTodoData((prev) => [...prev , newTodo]);
        setValue("");
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