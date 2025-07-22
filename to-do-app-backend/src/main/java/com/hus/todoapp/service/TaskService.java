package com.hus.todoapp.service;

import com.hus.todoapp.dto.TaskRequestDto;
import com.hus.todoapp.dto.TaskResponseDto;
import com.hus.todoapp.exceptions.TaskNotFoundException;
import com.hus.todoapp.mapper.TaskMapper;
import com.hus.todoapp.model.Task;
import com.hus.todoapp.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public boolean createTask(TaskRequestDto taskRequestDto) {
        Task task = TaskMapper.toEntity(taskRequestDto);
        taskRepository.save(task);
        return true;
    }

    public boolean deleteTask(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException("Task not found with the id "+id));
        taskRepository.delete(task);
        return true;
    }

    public List<TaskResponseDto> getTasks() {
        List<Task> tasks = taskRepository.findAll();
        List<TaskResponseDto> taskList = new ArrayList<>();
        for (Task task : tasks) {
            TaskResponseDto taskResponseDto = TaskMapper.taskResponseDto(task);
            taskList.add(taskResponseDto);
        }
        return taskList;
    }

    public List<TaskResponseDto> getLatestTasks() {
        List<Task> tasks = taskRepository.findTop5ByOrderByCreatedAtDesc();
        List<TaskResponseDto> latestTasks = new ArrayList<>();
        for (Task task : tasks) {
            TaskResponseDto taskResponseDto = TaskMapper.taskResponseDto(task);
            latestTasks.add(taskResponseDto);
        }
        return latestTasks;
    }


}
