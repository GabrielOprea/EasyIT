package com.application.repository;

import com.application.model.Post;
import com.application.model.Professor;
import com.application.model.Question;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PostRepository extends CrudRepository<Post, Integer> {

  public List<Post> findByCourseid(String courseid);

}
