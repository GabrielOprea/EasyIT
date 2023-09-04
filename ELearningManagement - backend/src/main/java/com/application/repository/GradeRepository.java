package com.application.repository;

import com.application.model.Chapter;
import com.application.model.Grade;
import com.application.model.Quiz;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GradeRepository extends CrudRepository<Grade, Integer>  {
  public List<Grade> findByQuizid(String quizid);

  public List<Grade> findByQuizidAndEmail(String quizid, String email);

}
