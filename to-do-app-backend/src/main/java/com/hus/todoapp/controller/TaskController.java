package com.hus.todoapp.controller;

import com.hus.todoapp.dto.TaskRequestDto;
import com.hus.todoapp.dto.TaskResponseDto;
import com.hus.todoapp.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/task")
    public ResponseEntity<?> createTask(@RequestBody @Valid TaskRequestDto taskRequestDto) {
        if (taskService.createTask(taskRequestDto)) {
            return ResponseEntity.ok().body(Map.of(
                    "message", "Task created successfully"
            ));
        }
        return ResponseEntity.badRequest().body(Map.of(
                "message", "Task creation failed"
        ));
    }

    @DeleteMapping("/task")
    public ResponseEntity<?> deleteTask(@Param("id") Long id) {
        if (taskService.deleteTask(id)) {
            return ResponseEntity.ok().body(Map.of(
                    "message", "Task deleted successfully"
            ));
        }
        return ResponseEntity.badRequest().body(Map.of(
                "message", "Task deletion failed"
        ));
    }

    @GetMapping("/task")
    public ResponseEntity<List<TaskResponseDto>> getTasks(@RequestParam(required = false) String type) {
        if ("latest".equalsIgnoreCase(type)) {
            return ResponseEntity.ok().body(taskService.getLatestTasks());
        }
        return ResponseEntity.ok().body(taskService.getTasks());
    }
}
