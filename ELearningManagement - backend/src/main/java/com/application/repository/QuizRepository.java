package com.application.repository;

import com.application.model.Quiz;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface QuizRepository extends CrudRepository<Quiz, Integer> {
  public List<Quiz> findByCourseid(String courseid);
  public List<Quiz> findByQuizid(String quizid);

}
