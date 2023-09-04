package com.application;

import com.application.services.FilesStorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.Resource;

@SpringBootApplication
public class ELearningManagementApplication implements CommandLineRunner {
  @Resource
  FilesStorageService storageService;
	public static void main(String[] args) {
		SpringApplication.run(ELearningManagementApplication.class, args);
	}
  @Override
  public void run(String... arg) throws Exception {
//    storageService.deleteAll();
    storageService.init();
  }
}
