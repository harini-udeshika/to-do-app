package com.hus.todoapp.service;

import com.hus.todoapp.dto.TaskRequestDto;
import com.hus.todoapp.dto.TaskResponseDto;
import com.hus.todoapp.exceptions.TaskNotFoundException;
import com.hus.todoapp.model.Task;
import com.hus.todoapp.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createTask_shouldReturnTrue() {
        TaskRequestDto dto = new TaskRequestDto();
        dto.setTitle("Test task");
        dto.setDescription("Test description");
        when(taskRepository.save(any(Task.class))).thenAnswer(i -> i.getArgument(0));

        boolean result = taskService.createTask(dto);

        assertTrue(result);
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void deleteTask_existingTask_shouldReturnTrue() {
        Long taskId = 1L;
        Task task = new Task();
        task.setId(taskId);

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

        boolean result = taskService.deleteTask(taskId);

        assertTrue(result);
        verify(taskRepository, times(1)).delete(task);
    }

    @Test
    void deleteTask_nonExistingTask_shouldThrow() {
        Long taskId = 1L;

        when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> taskService.deleteTask(taskId));
        verify(taskRepository, never()).delete(any());
    }

    @Test
    void getTasks_shouldReturnMappedList() {
        Task task = new Task();
        task.setId(1L);
        task.setTitle("title");
        task.setDescription("desc");
        task.setCompleted(false);
        task.setCreatedAt(LocalDateTime.now());

        when(taskRepository.findAll()).thenReturn(List.of(task));

        List<TaskResponseDto> result = taskService.getTasks();

        assertEquals(1, result.size());
        assertEquals(task.getTitle(), result.get(0).getTitle());
    }

    @Test
    void getLatestTasks_shouldReturnMappedList() {
        Task task = new Task();
        task.setId(1L);
        task.setTitle("title");
        task.setDescription("desc");
        task.setCompleted(false);
        task.setCreatedAt(LocalDateTime.now());

        when(taskRepository.findTop5ByIsCompletedFalseOrderByCreatedAtDesc()).thenReturn(List.of(task));

        List<TaskResponseDto> result = taskService.getLatestTasks();

        assertEquals(1, result.size());
        assertEquals(task.getTitle(), result.get(0).getTitle());
    }

    @Test
    void completeTask_existingTask_shouldReturnTrue() {
        Long taskId = 1L;
        Task task = new Task();
        task.setId(taskId);
        task.setCompleted(false);

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));
        when(taskRepository.save(task)).thenReturn(task);

        boolean result = taskService.completeTask(taskId);

        assertTrue(result);
        assertTrue(task.getCompleted());
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void completeTask_nonExistingTask_shouldThrow() {
        Long taskId = 1L;

        when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> taskService.completeTask(taskId));
        verify(taskRepository, never()).save(any());
    }
}