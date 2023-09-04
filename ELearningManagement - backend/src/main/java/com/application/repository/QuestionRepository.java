package com.application.repository;

import com.application.model.Question;
import com.application.model.Quiz;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface QuestionRepository extends CrudRepository<Question, Integer> {
  public List<Question> findByQuizid(String quizid);

}
