package com.example.projectTodo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.scheduling.annotation.EnableScheduling;
@SpringBootApplication
@EnableScheduling
@MapperScan("com.example.projectTodo.mapper.**") // 매퍼 인터페이스가 있는 패키지를 지정
public class ProjectTodoApplication extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(ProjectTodoApplication.class, args);
    }

}
