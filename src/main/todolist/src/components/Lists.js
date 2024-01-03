import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from "./List";

function Lists({todoData , setTodoData}) {

    const handleDragEnd = (result) => {
        if(!result.destination){
            return;
        }

        const newTodoData = todoData;

        // 1. 변경시키는  아이템을 배열에서 지워준다.
        // 2. return 값으로 지워진 아이템을 변경..

        const [reorderedItem] = newTodoData.splice(result.source.index,1);

        // 원하는 자리에 reorderItem을 insert해줌
        newTodoData.splice(result.destination.index,0 , reorderedItem);
        setTodoData(newTodoData);
    };

    return (
        <div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="todo">
                    {(provided) => (
                        <div {...provided.droppableProps}
                             ref={provided.innerRef}>
                            {todoData.map((data , index)=> (
                                <Draggable  key={data.id}
                                            draggableId= {data.id.toString()}
                                            index={index}>
                                    {(provided, snapshot)=>(
                                        <List id={data.id}
                                              title={data.title}
                                              Date={data.Date}
                                              completed={data.completed}
                                              todoData={todoData}
                                              setTodoData={setTodoData}
                                              provided={provided}
                                              snapshot={snapshot}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default Lists;