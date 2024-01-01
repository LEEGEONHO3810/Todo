package com.example.projectTodo.controller.Todo;

import com.example.projectTodo.service.Todo.TodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

}