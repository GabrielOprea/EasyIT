package com.application.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Quiz {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;
  private String noquestions;
  private String passingpercent;
  private String courseid;
  private String quizname;
  private String quizid;

  public Quiz(int id, String noquestions, String passingpercent, String courseid, String quizname, String quizid) {
    this.id = id;
    this.noquestions = noquestions;
    this.passingpercent = passingpercent;
    this.courseid = courseid;
    this.quizname = quizname;
    this.quizid = quizid;
  }

  public String getQuizid() {
    return quizid;
  }

  public void setQuizid(String quizid) {
    this.quizid = quizid;
  }

  public Quiz() {
  }

  public String getQuizname() {
    return quizname;
  }

  public void setQuizname(String quizname) {
    this.quizname = quizname;
  }

  public Quiz(int id, String noquestions, String passingpercent) {
    this.id = id;
    this.noquestions = noquestions;
    this.passingpercent = passingpercent;
  }
  public Quiz(int id, String noquestions, String passingpercent, String courseid) {
    this.id = id;
    this.courseid = courseid;
    this.noquestions = noquestions;
    this.passingpercent = passingpercent;
  }
  public Quiz(int id, String noquestions, String passingpercent, String courseid, String quizname) {
    this.id = id;
    this.courseid = courseid;
    this.quizname = quizname;
    this.noquestions = noquestions;
    this.passingpercent = passingpercent;
  }
  public String getCourseid() {
    return courseid;
  }

  public void setCourseid(String id) {
    this.courseid = id;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getNoquestions() {
    return noquestions;
  }

  public void setNoquestions(String noquestions) {
    this.noquestions = noquestions;
  }

  public String getPassingpercent() {
    return passingpercent;
  }

  public void setPassingpercent(String passingpercent) {
    this.passingpercent = passingpercent;
  }
}
