package com.hus.todoapp.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hus.todoapp.dto.TaskRequestDto;
import com.hus.todoapp.dto.TaskResponseDto;
import com.hus.todoapp.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
public class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TaskService taskService;

    @Autowired
    private ObjectMapper objectMapper;

    private TaskRequestDto taskRequestDto;

    @BeforeEach
    void setup() {
        taskRequestDto = new TaskRequestDto();
        taskRequestDto.setTitle("Test task");
        taskRequestDto.setDescription("Test description");
    }

    @Test
    void createTask_success() throws Exception {
        Mockito.when(taskService.createTask(any(TaskRequestDto.class))).thenReturn(true);

        mockMvc.perform(post("/api/task")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(taskRequestDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Task created successfully"));
    }

    @Test
    void createTask_failure() throws Exception {
        Mockito.when(taskService.createTask(any(TaskRequestDto.class))).thenReturn(false);

        mockMvc.perform(post("/api/task")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(taskRequestDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Task creation failed"));
    }

    @Test
    void deleteTask_success() throws Exception {
        Mockito.when(taskService.deleteTask(1L)).thenReturn(true);

        mockMvc.perform(delete("/api/task")
                        .param("id", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Task deleted successfully"));
    }

    @Test
    void deleteTask_failure() throws Exception {
        Mockito.when(taskService.deleteTask(1L)).thenReturn(false);

        mockMvc.perform(delete("/api/task")
                        .param("id", "1"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Task deletion failed"));
    }

    @Test
    void getTasks_all() throws Exception {
        TaskResponseDto taskResponseDto = new TaskResponseDto();
        taskResponseDto.setTitle("Task 1");
        taskResponseDto.setDescription("Desc 1");
        taskResponseDto.setCompleted(false);
        taskResponseDto.setCreatedAt(String.valueOf(LocalDateTime.now()));

        Mockito.when(taskService.getTasks()).thenReturn(List.of(taskResponseDto));

        mockMvc.perform(get("/api/task"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Task 1"));
    }

    @Test
    void getTasks_latest() throws Exception {
        TaskResponseDto taskResponseDto = new TaskResponseDto();
        taskResponseDto.setTitle("Task 1");
        taskResponseDto.setDescription("Desc 1");
        taskResponseDto.setCompleted(false);
        taskResponseDto.setCreatedAt(String.valueOf(LocalDateTime.now()));

        Mockito.when(taskService.getLatestTasks()).thenReturn(List.of(taskResponseDto));

        mockMvc.perform(get("/api/task")
                        .param("type", "latest"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Task 1"));
    }

    @Test
    void completeTask_success() throws Exception {
        Mockito.when(taskService.completeTask(1L)).thenReturn(true);

        mockMvc.perform(patch("/api/task/complete")
                        .param("id", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Task completed successfully"));
    }

    @Test
    void completeTask_failure() throws Exception {
        Mockito.when(taskService.completeTask(1L)).thenReturn(false);

        mockMvc.perform(patch("/api/task/complete")
                        .param("id", "1"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Task completion failed"));
    }
}
