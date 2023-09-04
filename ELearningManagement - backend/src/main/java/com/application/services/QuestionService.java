package com.application.services;

import com.application.model.Course;
import com.application.model.Question;
import com.application.model.Quiz;
import com.application.repository.CourseRepository;
import com.application.repository.QuestionRepository;
import com.application.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

  @Autowired
  private QuestionRepository questionRepo;
  public Question addNewQuestion(Question question)
  {
    return questionRepo.save(question);
  }
  public List<Question> fetchQuestionsByQuizid(String quizid)
  {
    return questionRepo.findByQuizid(quizid);
  }
}
