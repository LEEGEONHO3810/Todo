package com.example.projectTodo.controller.Todo;

import com.example.projectTodo.dto.Todo.TodoDTO;
import com.example.projectTodo.service.Todo.TodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
public class TodoListController {

    @Autowired
    TodoListService TodoListService;
    @GetMapping("/api/List")
        public List<HashMap<String, String>> List() throws Exception {
        return TodoListService.List();
    }
    @PostMapping("/api/Add")
        public void Add(@RequestBody HashMap<String, Object> todo) throws Exception{
        HashMap<String, String> map = new HashMap<String, String>();

        Integer id = (Integer) todo.get("id");
        String date = (String) todo.get("Date");
        String title = (String) todo.get("title");
        Boolean completed = (Boolean) todo.get("completed");

        String strCompleted = "";

        if (completed){
            strCompleted = "1";
        }else if(!completed){
            strCompleted = "0";
        }

        map.put("strId",id.toString());
        map.put("date",date);
        map.put("title",title);
        map.put("strCompleted",strCompleted);

        TodoListService.Add(map);

    }
    @PostMapping("/api/Update")
    public void Update(@RequestBody HashMap<String, Object> newTodo) throws Exception{
        HashMap<String, String> map = new HashMap<String, String>();

        Integer id = (Integer) newTodo.get("id");
        String title = (String) newTodo.get("title");
        String date = (String) newTodo.get("date");
        String source = (String) newTodo.get("source");

        Boolean completed = (Boolean) newTodo.get("completed");

        String strCompleted = "";

        if (completed){
            strCompleted = "1";
        }else if(completed){
            strCompleted = "0";
        }

        map.put("strId",id.toString());
        map.put("date",date);
        map.put("title",title);
        map.put("strCompleted",strCompleted);

        if(source.equals("Check")){

            TodoListService.Check(map);

        }else if(source.equals("Update")){

            TodoListService.Update(map);

        }
    }

    @PostMapping("/api/Delete")
    public void Deletes(@RequestBody TodoDTO todoDTO) throws Exception{
        HashMap<String, String> map = new HashMap<String, String>();

        Integer id = todoDTO.getId();
        String date = todoDTO.getDate();

        map.put("strId",id.toString());
        map.put("date",date);

        TodoListService.Delete(map);

    }

}