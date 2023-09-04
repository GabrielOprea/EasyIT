package com.application.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Question {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;
  private String quizid;
  private String question;

  private String questionid;
  private String vara;
  private String varb;
  private String varc;
  private String vard;

  private String correctvar;

  public Question() {
    super();
  }

  public String getQuestion() {
    return question;
  }

  public void setQuestion(String question) {
    this.question = question;
  }

  public Question(int id, String quizid, String question, String questionid, String vara, String varb, String varc, String vard, String correctvar) {
    this.id = id;
    this.quizid = quizid;
    this.question = question;
    this.questionid = questionid;
    this.vara = vara;
    this.varb = varb;
    this.varc = varc;
    this.vard = vard;
    this.correctvar = correctvar;
  }

  public Question(int id, String quizid, String questionid, String vara, String varb, String varc, String vard, String correctvar) {
    this.id = id;
    this.quizid = quizid;
    this.questionid = questionid;
    this.vara = vara;
    this.varb = varb;
    this.varc = varc;
    this.vard = vard;
    this.correctvar = correctvar;
  }

  public String getQuestionid() {
    return questionid;
  }

  public void setQuestionid(String questionid) {
    this.questionid = questionid;
  }

  public Question(int id, String quizid, String vara, String varb, String varc, String vard, String correctvar) {
    this.id = id;
    this.quizid = quizid;
    this.vara = vara;
    this.varb = varb;
    this.varc = varc;
    this.vard = vard;
    this.correctvar = correctvar;
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

  public String getVara() {
    return vara;
  }

  public void setVara(String vara) {
    this.vara = vara;
  }

  public String getVarb() {
    return varb;
  }

  public void setVarb(String varb) {
    this.varb = varb;
  }

  public String getVarc() {
    return varc;
  }

  public void setVarc(String varc) {
    this.varc = varc;
  }

  public String getVard() {
    return vard;
  }

  public void setVard(String vard) {
    this.vard = vard;
  }

  public String getCorrectvar() {
    return correctvar;
  }

  public void setCorrectvar(String correctvar) {
    this.correctvar = correctvar;
  }

}
