package com.example.projectTodo.mapper.Todo;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface TodoListMapper {
    List<HashMap<String, String>> List(String date) throws Exception;

    void Add(HashMap<String, String> map) throws Exception;

    void Update(HashMap<String, String> map) throws Exception;

    void Check(HashMap<String, String> map) throws Exception;

    void Delete(HashMap<String, String> map) throws Exception;

    List<HashMap<String, String>> DotList(String date) throws Exception;

    String MaxId(String date) throws Exception;

    void seqDropUpdate(HashMap<String, String> map) throws Exception;

    void seqDragUpdate(HashMap<String, String> map) throws Exception;

    String dropSeqSelect(HashMap<String, String> map) throws Exception;
}

