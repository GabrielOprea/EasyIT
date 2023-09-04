package com.application.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Grade {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;
  private String quizid;
  private String grade;
  private String email;

  public Grade(int id, String quizid, String grade, String email) {
    this.id = id;
    this.quizid = quizid;
    this.grade = grade;
    this.email = email;
  }

  public String getGrade() {
    return grade;
  }

  public void setGrade(String grade) {
    this.grade = grade;
  }

  public Grade(int id, String quizid, String email) {
    this.id = id;
    this.quizid = quizid;
    this.email = email;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getQuizid() {
    return quizid;
  }

  public void setQuizid(String quizid) {
    this.quizid = quizid;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Grade() {

  }
}
