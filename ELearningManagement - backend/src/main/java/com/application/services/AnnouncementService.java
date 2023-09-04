package com.application.services;

import com.application.model.Announcement;
import com.application.model.Post;
import com.application.repository.AnnouncementRepository;
import com.application.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnouncementService {
  @Autowired
  private AnnouncementRepository announcementRepo;

  public List<Announcement> fetchPostByCourseid(String courseid)
  {
    return announcementRepo.findByCourseid(courseid);
  }

  public Announcement addNewAnnouncement(Announcement post)
  {
    return announcementRepo.save(post);
  }

}
