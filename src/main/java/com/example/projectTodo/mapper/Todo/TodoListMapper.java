package com.example.projectTodo.mapper.Todo;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface TodoListMapper {
    List<HashMap<String, String>> List() throws Exception;

    void Add(HashMap<String, String> map) throws Exception;

    void Update(HashMap<String, String> map) throws Exception;

    void Check(HashMap<String, String> map) throws Exception;

    void Delete(HashMap<String, String> map) throws Exception;
}

