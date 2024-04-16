import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from "./List";
import axios from "axios";
import moment from "moment/moment";
import { useState } from "react";


function Lists({todoData, setTodoData, calenderValue, setCalOnChange}) {
    const [visibleCount, setVisibleCount] = useState(5);
    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 5);
    };

    const handleDragEnd = (result) => {
        console.log(result);
        if (!result.destination) {
            return;
        }
        const newTodoData = todoData;
        const dragDate = moment(calenderValue).format("YYYY-MM-DD");
        // 1. 변경시키는  아이템을 배열에서 지워준다.
        // 2. return 값으로 지워진 아이템을 변경..

        const [reorderedItem] = newTodoData.splice(result.source.index, 1);

        // 원하는 자리에 reorderItem을 insert해줌
        newTodoData.splice(result.destination.index, 0, reorderedItem);
        setTodoData(newTodoData);
        // // seq로 order by 예정
        // console.log(result.source.index);           // 시작 위치 (기본 seq값)
        // console.log(result.destination.index+1);      // 드래그 놓는 위치 (변경 seq값)

        // seq 업데이트
        axios.post("api/seqUpdate", {

            id:result.draggableId,
            dragDate:dragDate,
            sourceIndex: result.source.index+1,
            destinationIndex: result.destination.index+1

        }).then(function (response) {
            console.log("Check 성공");
        }).catch(function (error) {
            // console.log(error);
        });

    };
    return (
        <div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="todo" >
                    {(provided) => (
                        <div {...provided.droppableProps}
                             ref={provided.innerRef}>
                            {todoData.splice(0,visibleCount).map((data, index) => (
                                <Draggable key={data.id}
                                           draggableId={data.id.toString()}
                                           index={index}
                                >
                                    {(provided, snapshot) => (
                                        <List id={data.id}
                                              seq={data.seq}
                                              index={index+1}
                                              title={data.title}
                                              Date={data.Date}
                                              completed={data.completed}
                                              todoData={todoData}
                                              setTodoData={setTodoData}
                                              provided={provided}
                                              snapshot={snapshot}
                                              calenderValue={calenderValue}
                                              setCalOnChange={setCalOnChange}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {visibleCount < todoData.length && (
            <button onClick={handleLoadMore}>더보기</button>
        </div>
    );
}

export default Lists;