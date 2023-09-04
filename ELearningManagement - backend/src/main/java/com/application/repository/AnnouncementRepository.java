package com.application.repository;

import com.application.model.Announcement;
import com.application.model.Post;
import com.application.model.Professor;
import com.application.model.Question;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AnnouncementRepository extends CrudRepository<Announcement, Integer> {

  public List<Announcement> findByCourseid(String courseid);

}
