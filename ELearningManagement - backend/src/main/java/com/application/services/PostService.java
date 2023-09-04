package com.application.services;

import com.application.model.Post;
import com.application.model.Quiz;
import com.application.repository.PostRepository;
import com.application.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
  @Autowired
  private PostRepository postRepo;

  public List<Post> fetchPostByCourseid(String courseid)
  {
    return postRepo.findByCourseid(courseid);
  }

  public Post addNewPost(Post post)
  {
    return postRepo.save(post);
  }

}
