/* eslint-disable */

import React, {useState} from 'react';
import axios from "axios";
import moment from "moment/moment";

const List = ({
                  id,
                  title,
                  Date,
                  completed,
                  todoData,
                  setTodoData,
                  provided,
                  snapshot,
                  calenderValue

            }) => {

    const [editClick , setEditClick] = useState(false);
    const [updateText , setUpdateText] = useState(title);

    const handleChangeTodo = (e) => {

        let newTodoData = todoData.map((data) => {

            if(data.id === id){
                const updatedData = { ...data, completed: e.target.checked };

                completed = !data.completed;
                const newTodo = {
                    id: id,
                    date: Date,
                    completed: e.target.checked,
                    source: 'Check'
                };

                axios.post("api/Update", newTodo
                ).then(function (response) {
                    setTodoData(newTodoData);
                    console.log("Check 성공");
                }).catch(function (error) {
                    console.log(error);
                });
                return updatedData;
            }
            return data
        });
    };

    const handleClick = (id,Date) => {
        const formattedDate  = moment(calenderValue).format("YYYY-MM-DD");
        axios.post("api/Delete", {
            id:id,
            date:formattedDate
            }
        ).then(function (response) {
            setTodoData(newTodoData);
            setEditClick(false);
            console.log("삭제 성공");
        }).catch(function (error) {
            console.log(error);
        });

        let newTodoData = todoData.filter((data) => data.id !== id);
        setTodoData(newTodoData);
    };
    const handleEdit = (e) => {
        setUpdateText(e.target.value);
    };
    const handleSubmit = (e) =>{
        // 변경된 날짜
        const formattedDate  = moment(calenderValue).format("YYYY-MM-DD");
        e.preventDefault();

        let newTodoData = todoData.map(data =>{
            if(data.id === id){

                data.title = updateText;

                const newTodo = {
                    id: id,
                    date: formattedDate,
                    title: updateText,
                    completed : data.completed,
                    source: 'Update'

                };

                axios.post("api/Update", newTodo
                ).then(function (response) {
                    setTodoData(newTodoData);
                    setEditClick(false);
                    console.log("성공");

                }).catch(function (error) {
                    console.log(error);
                });
            }
            return data;
        })
    }

    // 수정 클릭 시
    if(editClick){
        return(
            <div>
                <div
                    className={"flex items-center justify-between w-full px-4 py-1 my-2 bg-gray-100 text-gray-600 border rounded"}
                >
                    <div className="items-center">
                        <form onSubmit={handleSubmit}>
                            <input
                                value={updateText}
                                onChange={handleEdit}
                                className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
                            />
                        </form>
                    </div>
                    <div className="items-center float-right">
                        <button className="px-4 py-2 float-right"
                                onClick={()=> setEditClick(false)}
                        > x
                        </button>
                        <button onClick={handleSubmit}
                                className="px-4 py-2 float-right"
                                type="submit"
                        >
                            저장
                        </button>
                    </div>
                </div>
            </div>
        )
        //일반 리스트
    }else{
        return (
            <div
                key={id}
                {...provided.draggableProps}
                ref={provided.innerRef}
                {...provided.dragHandleProps}
            >
                <div
                    className={`${
                        snapshot.isDragging ? 'bg-gray-400' : 'bg-gray-100'
                    } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
                >
                    <div className="items-center">
                        <input
                            type="checkbox"
                            onChange={handleChangeTodo}
                            checked={completed} // 컴포넌트 내에서 상태를 사용할 때 checked 속성 사용
                        />&nbsp;&nbsp;
                        <span className={completed ? 'line-through ' : undefined}>{title}</span>
                    </div>
                    <div className="items-center ">
                        <button className="px-4 py-2 float-right" onClick={()=>handleClick(id,Date)}>
                            x
                        </button>
                        <button className="px-4 py-2 float-right" onClick={()=> setEditClick(true)}>
                            수정
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default List;