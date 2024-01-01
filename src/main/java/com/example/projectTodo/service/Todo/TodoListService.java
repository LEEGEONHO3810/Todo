package com.example.projectTodo.service.Todo;

import com.example.projectTodo.mapper.Todo.TodoListMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@Transactional
public class TodoListService {

    @Autowired
    TodoListMapper TodoListMapper;
    public List<HashMap<String, String>> List() throws Exception{
        return TodoListMapper.List();
    }

}
