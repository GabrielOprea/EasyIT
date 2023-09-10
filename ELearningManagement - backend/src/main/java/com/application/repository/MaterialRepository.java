package com.application.repository;

import com.application.model.Material;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface MaterialRepository extends CrudRepository<Material, Integer> {
  public List<Material> findByCoursename(String coursename);
  public List<Material> findByCoursenameAndMaterialtype(String coursename, String materialtype);

  public List<Material> findByMaterialid(String materialid);

}
