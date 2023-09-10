package com.application.services;

import com.application.model.Grade;
import com.application.model.Material;
import com.application.repository.GradeRepository;
import com.application.repository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialService {
  @Autowired
  private MaterialRepository materialRepo;
  public Material addNewMaterial(Material material)
  {
    return materialRepo.save(material);
  }
  public List<Material> fetchMaterialbyCoursename(String coursename) {
    return materialRepo.findByCoursename(coursename);
  }
  public List<Material> fetchMaterialbyCoursenameAndMaterialtype(String coursename, String materialtype) {
    return materialRepo.findByCoursenameAndMaterialtype(coursename, materialtype);
  }
  public void removeByMaterialid(String materialid) {
    List<Material> mats = materialRepo.findByMaterialid(materialid);
    for (Material mat : mats)
      materialRepo.deleteById(mat.getId());
  }
  public void deleteMaterial(Material mat) {
    materialRepo.deleteById(mat.getId());
  }
  public Material updateByMaterialid(Material newmat) {
    List<Material> mats = materialRepo.findByMaterialid(newmat.getMaterialid());
    for (Material mat : mats)
      materialRepo.deleteById(mat.getId());

    return materialRepo.save(newmat);
  }


}
