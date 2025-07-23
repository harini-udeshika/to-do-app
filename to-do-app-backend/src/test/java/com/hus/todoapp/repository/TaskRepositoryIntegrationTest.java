package com.hus.todoapp.repository;

import com.hus.todoapp.model.Task;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class TaskRepositoryIntegrationTest {

    @Autowired
    private TaskRepository taskRepository;

    @Test
    void testFindTop5ByIsCompletedFalseOrderByCreatedAtDesc() {
        // Given: create and save 7 tasks with different createdAt and isCompleted values
        for (int i = 1; i <= 7; i++) {
            Task task = new Task();
            task.setTitle("Task " + i);
            task.setDescription("Description " + i);
            task.setCompleted(i % 2 == 0); // even tasks completed = true, odd = false
            task.setCreatedAt(LocalDateTime.now().minusDays(i));
            taskRepository.save(task);
        }

        // When: fetch latest 5 incomplete tasks
        List<Task> latestTasks = taskRepository.findTop5ByIsCompletedFalseOrderByCreatedAtDesc();

        // Then: should return max 5 tasks, only incomplete ones, ordered by createdAt desc
        assertThat(latestTasks).hasSizeLessThanOrEqualTo(5);
        assertThat(latestTasks).allMatch(task -> !task.getCompleted());

        // Check ordering: each createdAt should be >= next one
        for (int i = 0; i < latestTasks.size() - 1; i++) {
            assertThat(latestTasks.get(i).getCreatedAt())
                    .isAfterOrEqualTo(latestTasks.get(i + 1).getCreatedAt());
        }
    }
}