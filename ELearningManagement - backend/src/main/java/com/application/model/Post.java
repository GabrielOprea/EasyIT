package com.application.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;
  private String postid;
  private String poster;
  private String content;
  private String courseid;
  private String timestamp;


  public Post() {
    
  }
  public Post(String postid, String poster, String content, String courseid, String timestamp) {
    this.postid = postid;
    this.poster = poster;
    this.content = content;
    this.courseid = courseid;
    this.timestamp = timestamp;
  }

  public String getPostid() {
    return postid;
  }

  public void setPostid(String postid) {
    this.postid = postid;
  }

  public Post(String poster, String content, String courseid, String timestamp) {
    this.poster = poster;
    this.content = content;
    this.courseid = courseid;
    this.timestamp = timestamp;
  }

  public String getPoster() {
    return poster;
  }

  public void setPoster(String poster) {
    this.poster = poster;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getCourseid() {
    return courseid;
  }

  public void setCourseid(String courseid) {
    this.courseid = courseid;
  }

  public String getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(String timestamp) {
    this.timestamp = timestamp;
  }
}
