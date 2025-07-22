package com.hus.todoapp.mapper;

import com.hus.todoapp.dto.TaskRequestDto;
import com.hus.todoapp.dto.TaskResponseDto;
import com.hus.todoapp.model.Task;

public final class TaskMapper {
    public static Task toEntity(TaskRequestDto taskRequestDto) {
        Task task = new Task();
        task.setTitle(taskRequestDto.getTitle());
        task.setDescription(taskRequestDto.getDescription());
        return task;
    }

    public static TaskResponseDto taskResponseDto(Task task){
        TaskResponseDto taskResponseDto=new TaskResponseDto();
        taskResponseDto.setId(task.getId());
        taskResponseDto.setTitle(task.getTitle());
        taskResponseDto.setDescription(task.getDescription());
        taskResponseDto.setCreatedAt(task.getCreatedAt().toString());
        taskResponseDto.setCompleted(task.getCompleted());
        return taskResponseDto;
    }
}
