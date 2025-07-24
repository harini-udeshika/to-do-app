package com.hus.todoapp.mapper;

import com.hus.todoapp.dto.TaskRequestDto;
import com.hus.todoapp.dto.TaskResponseDto;
import com.hus.todoapp.model.Task;
import java.time.format.DateTimeFormatter;

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
        // Format date as ISO string with timezone to ensure consistent date handling
        taskResponseDto.setCreatedAt(task.getCreatedAt().atZone(java.time.ZoneOffset.UTC).format(DateTimeFormatter.ISO_INSTANT));
        taskResponseDto.setCompleted(task.getCompleted());
        return taskResponseDto;
    }
}
