package com.hus.todoapp.mapper;

import com.hus.todoapp.dto.TaskRequestDto;
import com.hus.todoapp.dto.TaskResponseDto;
import com.hus.todoapp.model.Task;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class TaskMapperTest {

    @Test
    void toEntity_shouldMapRequestDtoToEntity() {
        TaskRequestDto dto = new TaskRequestDto();
        dto.setTitle("Test Title");
        dto.setDescription("Test Description");

        Task task = TaskMapper.toEntity(dto);

        assertNotNull(task);
        assertEquals(dto.getTitle(), task.getTitle());
        assertEquals(dto.getDescription(), task.getDescription());
        // The other fields like id, createdAt are not set here
        assertNull(task.getId());
        assertNull(task.getCreatedAt());
    }

    @Test
    void taskResponseDto_shouldMapEntityToResponseDto() {
        Task task = new Task();
        task.setId(100L);
        task.setTitle("Title");
        task.setDescription("Description");
        task.setCreatedAt(LocalDateTime.of(2025, 7, 23, 15, 30));
        task.setCompleted(false);

        TaskResponseDto responseDto = TaskMapper.taskResponseDto(task);

        assertNotNull(responseDto);
        assertEquals(task.getId(), responseDto.getId());
        assertEquals(task.getTitle(), responseDto.getTitle());
        assertEquals(task.getDescription(), responseDto.getDescription());
        // The mapper formats the date as ISO_INSTANT, so we need to check the format
        assertTrue(responseDto.getCreatedAt().contains("2025-07-23T15:30:00Z"));
        assertEquals(task.getCompleted(), responseDto.getCompleted());
    }
}