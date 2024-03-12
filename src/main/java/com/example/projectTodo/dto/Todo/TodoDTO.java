package com.example.projectTodo.dto.Todo;

import lombok.Getter;

public class TodoDTO {
    @Getter
    private Integer id;
    private Integer seq;
    @Getter
    private String date;
    @Getter
    private String title;
    @Getter
    private Boolean completed;

    public TodoDTO(Integer seq) {
        this.seq = seq;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
