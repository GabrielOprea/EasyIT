package com.application.services;

import com.application.model.Course;
import com.application.model.Quiz;
import com.application.repository.CourseRepository;
import com.application.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

  @Autowired
  private QuizRepository quizRepo;
  public Quiz addNewQuiz(Quiz quiz)
  {
    return quizRepo.save(quiz);
  }
  public List<Quiz> fetchQuizesByCourseid(String courseid)
  {
    return quizRepo.findByCourseid(courseid);
  }
  public List<Quiz> fetchQuizesByQuizid(String quizid)
  {
    return quizRepo.findByQuizid(quizid);
  }

}
