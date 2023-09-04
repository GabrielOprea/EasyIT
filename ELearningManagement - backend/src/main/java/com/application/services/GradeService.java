package com.application.services;

import com.application.model.Chapter;
import com.application.model.Grade;
import com.application.repository.ChapterRepository;
import com.application.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeService {
  @Autowired
  private GradeRepository gradeRepo;
  public Grade addNewGrade(Grade grade)
  {
    return gradeRepo.save(grade);
  }
  public List<Grade> fetchGradeByQuizid(String quizid) {
    return gradeRepo.findByQuizid(quizid);
  }
  public List<Grade> fetchGradeByQuizidAndEmail(String quizid, String email) {
    return gradeRepo.findByQuizidAndEmail(quizid, email);
  }
}
