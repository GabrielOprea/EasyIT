package com.application.model;

import java.util.List;

public class Review {
  private List<String> answers;
  private String email;

  public Review() {
  }

  public Review(List<String> answers, String email) {
    this.answers = answers;
    this.email = email;
  }

  public List<String> getAnswers() {
    return answers;
  }

  public void setAnswers(List<String> answers) {
    this.answers = answers;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
