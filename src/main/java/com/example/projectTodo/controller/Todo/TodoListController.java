package com.example.projectTodo.controller.Todo;

import com.example.projectTodo.dto.Todo.TodoDTO;
import com.example.projectTodo.service.Todo.TodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class TodoListController {

    @Autowired
    TodoListService TodoListService;
    @GetMapping("/api/List")
        public List<HashMap<String, String>> List(@RequestParam("date") String date) throws Exception {
        return TodoListService.List(date);
    }

    @GetMapping("/api/DotList")
    public List<HashMap<String, String>> DotList(@RequestParam("date") String date) throws Exception {

        return TodoListService.DotList(date);
    }

    @PostMapping("/api/Add")
        public void Add(@RequestBody HashMap<String, Object> todo) throws Exception{
        HashMap<String, String> map = new HashMap<String, String>();
        String date = (String) todo.get("Date");

        String id = TodoListService.MaxId(date);
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

    @PostMapping("/api/seqUpdate")
    public void seqUpdate(@RequestBody HashMap<String, String> req) throws Exception{

        String dropSeq = TodoListService.dropSeqSelect(req);

        req.put("dropSeq" , dropSeq);

        System.out.println("dropSeq : "  + dropSeq);
        System.out.println(req.get("sourceIndex") + "시작위치");
        System.out.println(req.get("destinationIndex") + "드랍위치");

        TodoListService.seqUpdate(req);

    }
}