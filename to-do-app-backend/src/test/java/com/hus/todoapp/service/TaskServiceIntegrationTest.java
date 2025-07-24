package com.hus.todoapp.service;

import com.hus.todoapp.dto.TaskRequestDto;
import com.hus.todoapp.dto.TaskResponseDto;
import com.hus.todoapp.exceptions.TaskNotFoundException;
import com.hus.todoapp.model.Task;
import com.hus.todoapp.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional  // rollback after each test
public class TaskServiceIntegrationTest {

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskRepository taskRepository;

    @Test
    void createTask_thenVerifyExists() {
        TaskRequestDto dto = new TaskRequestDto();
        dto.setTitle("Integration Test Task");
        dto.setDescription("Integration Test Description");

        boolean created = taskService.createTask(dto);

        assertThat(created).isTrue();

        List<Task> tasks = taskRepository.findAll();
        assertThat(tasks).extracting(Task::getTitle).contains("Integration Test Task");
    }

    @Test
    void getLatestTasks_shouldReturnTasksOrderedAndIncomplete() {
        // Prepare: Save some tasks directly in repo
        for (int i = 1; i <= 7; i++) {
            Task task = new Task();
            task.setTitle("Task " + i);
            task.setDescription("Desc " + i);
            task.setCompleted(i % 2 == 0); 
            task.setCreatedAt(LocalDateTime.now().minusDays(i));
            taskRepository.save(task);
        }

        List<TaskResponseDto> latestTasks = taskService.getLatestTasks();

        // Only incomplete tasks, max 5, ordered desc by createdAt
        assertThat(latestTasks).hasSizeLessThanOrEqualTo(5);
        assertThat(latestTasks).allMatch(task -> !task.getCompleted());

        for (int i = 0; i < latestTasks.size() - 1; i++) {
            assertThat(java.time.ZonedDateTime.parse(latestTasks.get(i).getCreatedAt()).toLocalDateTime())
                    .isAfterOrEqualTo(java.time.ZonedDateTime.parse(latestTasks.get(i + 1).getCreatedAt()).toLocalDateTime());
        }
    }

    @Test
    void completeTask_shouldMarkCompleted() {
        Task task = new Task();
        task.setTitle("Complete Me");
        task.setDescription("Complete Me Description");
        task.setCompleted(false);
        task.setCreatedAt(LocalDateTime.now());
        task = taskRepository.save(task);

        boolean completed = taskService.completeTask(task.getId());

        assertThat(completed).isTrue();

        Task completedTask = taskRepository.findById(task.getId()).orElseThrow();
        assertThat(completedTask.getCompleted()).isTrue();
    }

    @Test
    void deleteTask_existingTask_shouldDelete() {
        Task task = new Task();
        task.setTitle("Delete Me");
        task.setDescription("Delete Me Desc");
        task.setCompleted(false);
        task.setCreatedAt(LocalDateTime.now());
        task = taskRepository.save(task);

        boolean deleted = taskService.deleteTask(task.getId());

        assertThat(deleted).isTrue();
        assertThat(taskRepository.findById(task.getId())).isEmpty();
    }

    @Test
    void deleteTask_nonExistingTask_shouldThrow() {
        Long invalidId = 999L;
        assertThrows(TaskNotFoundException.class, () -> taskService.deleteTask(invalidId));
    }
}