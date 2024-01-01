package com.example.projectTodo.mapper.Todo;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface TodoListMapper {
    List<HashMap<String, String>> List() throws Exception;
}

