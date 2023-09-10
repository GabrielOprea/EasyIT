package com.application.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Material {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;
  private String coursename;
  private String materialid;
  private String materialfile;
  private String materialname;
  private String materialtype;

  public Material() {
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getCoursename() {
    return coursename;
  }

  public void setCoursename(String coursename) {
    this.coursename = coursename;
  }

  public String getMaterialid() {
    return materialid;
  }

  public void setMaterialid(String materialid) {
    this.materialid = materialid;
  }

  public String getMaterialfile() {
    return materialfile;
  }

  public void setMaterialfile(String materialfile) {
    this.materialfile = materialfile;
  }

  public String getMaterialname() {
    return materialname;
  }

  public void setMaterialname(String materialname) {
    this.materialname = materialname;
  }

  public String getMaterialtype() {
    return materialtype;
  }

  public void setMaterialtype(String materialtype) {
    this.materialtype = materialtype;
  }

  public Material(int id, String coursename, String materialid, String materialfile, String materialname, String materialtype) {
    this.id = id;
    this.coursename = coursename;
    this.materialid = materialid;
    this.materialfile = materialfile;
    this.materialname = materialname;
    this.materialtype = materialtype;
  }
}
