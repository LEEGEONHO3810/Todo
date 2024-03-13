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
    public List<HashMap<String, String>> List(String date) throws Exception{
        return TodoListMapper.List(date);
    }
    public List<HashMap<String, String>> DotList(String date) throws Exception{
        return TodoListMapper.DotList(date);
    }

    public String  dropSeqSelect(HashMap<String, String> map) throws Exception{
        return TodoListMapper.dropSeqSelect(map);
    }

    public void Add(HashMap<String, String> map) throws Exception{
        TodoListMapper.Add(map);
    }

    public void Update(HashMap<String, String> map) throws Exception{
        TodoListMapper.Update(map);
    }

    public void Check(HashMap<String, String> map) throws Exception{
        TodoListMapper.Check(map);
    }

    public void Delete(HashMap<String, String> map) throws Exception{
        TodoListMapper.Delete(map);
    }
    public String MaxId(String date) throws Exception{
        return TodoListMapper.MaxId(date);
    }

    public void seqUpdate(HashMap<String, String> map) throws Exception{
        // 드랍된곳 seq를 변경
        TodoListMapper.seqDropUpdate(map);
        // 시작위치 seq를 변경
        TodoListMapper.seqDragUpdate(map);

    }

}
