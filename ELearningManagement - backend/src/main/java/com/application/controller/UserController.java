package com.application.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.Map;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;

import com.application.model.*;
import com.application.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController
{
  @Autowired
  private MaterialService materialService;
	@Autowired
	private UserService userService;

	@Autowired
	private ProfessorService professorService;

	@Autowired
	private CourseService courseService;

	@Autowired
	private EnrollmentService enrollmentService;

	@Autowired
	private WishlistService wishlistService;

	@Autowired
	private ChapterService chapterService;
  @Autowired
  private PostService postService;
  @Autowired
  private QuizService quizService;
  @Autowired
  private QuestionService questionService;
  @Autowired
  private GradeService gradeService;
  @Autowired
  private AnnouncementService announcementService;

  @GetMapping("/userlist")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<User>> getUsers() throws Exception
	{
		List<User> users = userService.getAllUsers();
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	@PostMapping("/enrollnewcourse/{email}/{role}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Enrollment> enrollNewCourse(@RequestBody Enrollment enrollment, @PathVariable String email, @PathVariable String role) throws Exception
	{
		String enrolledUserName = "",enrolledUserID = "";

		if(role.equalsIgnoreCase("user"))
		{
		    List<User> users = userService.getAllUsers();
		    for(User userObj:users)
		    {
			    if(userObj.getEmail().equalsIgnoreCase(email))
			    {
				    enrolledUserName = userObj.getUsername();
				    enrolledUserID = userObj.getUserid();
				    enrollment.setEnrolleduserid(enrolledUserID);
				    enrollment.setEnrolledusername(enrolledUserName);
				    break;
			    }
		    }
		}
		else if(role.equalsIgnoreCase("professor"))
		{
		    List<Professor> professors = professorService.getAllProfessors();
		    for(Professor professorObj:professors)
		    {
			    if(professorObj.getEmail().equalsIgnoreCase(email))
			    {
				    enrolledUserName = professorObj.getProfessorname();
				    enrolledUserID = professorObj.getProfessorid();
				    enrollment.setEnrolleduserid(enrolledUserID);
				    enrollment.setEnrolledusername(enrolledUserName);
				    break;
			    }
		    }
		}
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        String todayDate = formatter.format(date);
        enrollment.setEnrolleddate(todayDate);

		Enrollment enrollmentObj = null;
		enrollmentObj = enrollmentService.saveEnrollment(enrollment);
		System.out.println(enrollmentObj);

        List<Enrollment> enrollments = enrollmentService.getAllEnrollments();
		Map<String, Integer> enrolledCount = new LinkedHashMap<>();
		for(Enrollment enrollObj : enrollments)
		{
			String courseName = enrollObj.getCoursename();
			if(enrolledCount.containsKey(courseName))
			enrolledCount.put(courseName, enrolledCount.get(courseName)+1);
			else
			enrolledCount.put(courseName, 1);
		}
		for(Map.Entry<String, Integer> obj : enrolledCount.entrySet())
		{
			if(obj.getKey().equalsIgnoreCase(enrollment.getCoursename()))
			{
			    enrollmentService.updateEnrolledcount(obj.getKey(), obj.getValue());
			    courseService.updateEnrolledcount(obj.getKey(), obj.getValue());
			}
		}

    return new ResponseEntity<Enrollment>(enrollment, HttpStatus.OK);
  }

	@GetMapping("/getenrollmentstatus/{coursename}/{email}/{role}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Set<String>> getEnrollmentStatus(@PathVariable String coursename, @PathVariable String email, @PathVariable String role) throws Exception
	{
		List<Enrollment> enrollments = enrollmentService.getAllEnrollments();
		User userObj;
		Professor professorObj;
		String enrolledUser = "";
		if(role.equalsIgnoreCase("user"))
		{
		    userObj = userService.fetchUserByEmail(email);
		    enrolledUser = userObj.getUsername();
		}
		else if(role.equalsIgnoreCase("professor"))
		{
		    professorObj = professorService.fetchProfessorByEmail(email);
		    enrolledUser = professorObj.getProfessorname();
		}

		Set<String> enrollmentStatus = new LinkedHashSet<>();
		int flag = 0;
		OUTER:for(Enrollment enrollmentObj : enrollments)
		{
			if(enrollmentObj.getCoursename().equalsIgnoreCase(coursename) && enrollmentObj.getEnrolledusername().equalsIgnoreCase(enrolledUser))
			{
				enrollmentStatus.add("enrolled");
				flag = 1;
				break OUTER;
			}
		}
		if(flag == 0)
		enrollmentStatus.add("notenrolled");
		return new ResponseEntity<Set<String>>(enrollmentStatus, HttpStatus.OK);
	}

	@PostMapping("/addtowishlist")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Wishlist> addNewCourse(@RequestBody Wishlist wishlist) throws Exception
	{
		Wishlist wishlistObj = null;
		wishlistObj = wishlistService.addToWishlist(wishlist);
		return new ResponseEntity<Wishlist>(wishlistObj, HttpStatus.OK);
	}

  @PostMapping("/reviewquiz/{quizid}")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<Grade> reviewQuiz(@RequestBody Review review, @PathVariable String quizid) throws Exception
  {
    List<Question> questions = questionService.fetchQuestionsByQuizid(quizid);
    Quiz quiz = quizService.fetchQuizesByQuizid(quizid).get(0);

    float correct = 0;
    for (int i = 0; i < review.getAnswers().size(); i++) {
      if (questions.get(i).getCorrectvar().equals(review.getAnswers().get(i))) {
        correct+=1;
      }
    }
    float total = review.getAnswers().size();
    float grade = correct / total * 100;

    Grade gradeObj = new Grade();
    gradeObj.setQuizid(quizid);
    gradeObj.setGrade(Float.toString(grade));
    gradeObj.setEmail(review.getEmail());

    gradeService.addNewGrade(gradeObj);
    return new ResponseEntity<Grade>(gradeObj, HttpStatus.OK);
  }

  @GetMapping("/getgrade/{quizid}/{email}")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<Grade> getGradeByQuizidAndEmail(@PathVariable String quizid,@PathVariable String email) throws Exception
  {
    Grade gradeObj;
    List<Grade> obj = gradeService.fetchGradeByQuizidAndEmail(quizid, email);
    if (obj == null ) {
      gradeObj = null;
    } else {
      gradeObj = obj.get(0);
    }

    return new ResponseEntity<Grade>(gradeObj, HttpStatus.OK);
  }

	@GetMapping("/getwishliststatus/{coursename}/{email}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Set<String>> getWishlistStatus(@PathVariable String coursename, @PathVariable String email) throws Exception
	{
		List<Wishlist> wishlists = wishlistService.getAllLikedCourses();
		Set<String> wishlistsStatus = new LinkedHashSet<>();
		int flag = 0;
		OUTER:for(Wishlist wishlistsObj : wishlists)
		{
			if(wishlistsObj.getCoursename().equalsIgnoreCase(coursename) && wishlistsObj.getLikeduser().equalsIgnoreCase(email))
			{
				wishlistsStatus.add("liked");
				flag = 1;
				break OUTER;
			}
		}
		if(flag == 0)
		wishlistsStatus.add("notliked");
		return new ResponseEntity<Set<String>>(wishlistsStatus, HttpStatus.OK);
	}

	@GetMapping("/getallwishlist")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Wishlist>> getAllWislist() throws Exception
	{
		List<Wishlist> Wishlists = wishlistService.getAllLikedCourses();
		return new ResponseEntity<List<Wishlist>>(Wishlists, HttpStatus.OK);
	}

	@GetMapping("/getwishlistbyemail/{email}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Wishlist>> getWishlistByEmail(@PathVariable String email) throws Exception
	{
		List<Wishlist> Wishlists = wishlistService.fetchByLikeduser(email);
		return new ResponseEntity<List<Wishlist>>(Wishlists, HttpStatus.OK);
	}

  @GetMapping("/getquiz/{quizid}")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<Quiz> getQuizById(@PathVariable String quizid) throws Exception
  {
    List<Quiz> quizez = quizService.fetchQuizesByQuizid(quizid);
    return new ResponseEntity<Quiz>(quizez.get(0), HttpStatus.OK);
  }

  @GetMapping("/questionlist/{quizid}")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<Question>> getQuestionsByQuizid(@PathVariable String quizid) throws Exception
  {
    List<Question> questions = questionService.fetchQuestionsByQuizid(quizid);
    return new ResponseEntity<List<Question>>(questions, HttpStatus.OK);
  }


	@GetMapping("/getenrollmentbyemail/{email}/{role}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Enrollment>> getEnrollmentsByEmail(@PathVariable String email, @PathVariable String role) throws Exception
	{
		User userObj;
		Professor professorObj;
		String enrolledUser = "";
		if(role.equalsIgnoreCase("user"))
		{
		    userObj = userService.fetchUserByEmail(email);
		    enrolledUser = userObj.getUsername();
		}
		else if(role.equalsIgnoreCase("professor"))
		{
		    professorObj = professorService.fetchProfessorByEmail(email);
		    enrolledUser = professorObj.getProfessorname();
		}

		List<Enrollment> enrollments = enrollmentService.fetchByEnrolledusername(enrolledUser);
		return new ResponseEntity<List<Enrollment>>(enrollments, HttpStatus.OK);
	}

	@GetMapping("/getchapterlistbycoursename/{coursename}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Chapter>> getChapterListByCoursename(@PathVariable String coursename) throws Exception
	{
		List<Chapter> chapterLists = chapterService.fetchByCoursename(coursename);
		if(chapterLists.size()==0)
		{
			Chapter obj1 = new Chapter();
			obj1.setChapter1name("");
			obj1.setChapter2name("");
			obj1.setChapter3name("");
			obj1.setChapter4name("");
			obj1.setChapter5name("");
			obj1.setChapter6name("");
			obj1.setChapter7name("");
			obj1.setChapter8name("");
			chapterLists.add(obj1);
		}
		return new ResponseEntity<List<Chapter>>(chapterLists, HttpStatus.OK);
	}

  @GetMapping("/getmateriallistbycoursenameandtype/{coursename}/{type}")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<Material>> getChapterListByCoursename(@PathVariable String coursename, @PathVariable String type) throws Exception
  {
    List<Material> materialList = materialService.fetchMaterialbyCoursenameAndMaterialtype(coursename, type);

    return new ResponseEntity<List<Material>>(materialList, HttpStatus.OK);
  }

  public String getNewID()
  {
    String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+"0123456789"+"abcdefghijklmnopqrstuvxyz";
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 12; i++)
    {
      int index = (int)(AlphaNumericString.length() * Math.random());
      sb.append(AlphaNumericString.charAt(index));
    }
    return sb.toString();
  }

  @GetMapping("/getannouncements/{courseid}")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<Announcement>> getAnnouncementsByCourseid(@PathVariable String courseid) throws Exception
  {
    List<Announcement> postsLists = announcementService.fetchPostByCourseid(courseid);

    return new ResponseEntity<List<Announcement>>(postsLists, HttpStatus.OK);
  }

  @GetMapping("/getposts/{courseid}")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<Post>> getPostsByCourseid(@PathVariable String courseid) throws Exception
  {
    List<Post> postsLists = postService.fetchPostByCourseid(courseid);

    return new ResponseEntity<List<Post>>(postsLists, HttpStatus.OK);
  }

  @PostMapping("/addpost")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<Post> addPost(@RequestBody Post post) throws Exception
  {
    Post postobj = postService.addNewPost(post);
    postobj.setPostid(getNewID());
    return new ResponseEntity<Post>(postobj, HttpStatus.OK);
  }

  @GetMapping("/userprofileDetails/{email}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<User>> getProfileDetails(@PathVariable String email) throws Exception
	{
		List<User> users = userService.fetchProfileByEmail(email);
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	@PutMapping("/updateuser")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<User> updateUserProfile(@RequestBody User user) throws Exception
	{
		User userobj = userService.updateUserProfile(user);
		return new ResponseEntity<User>(userobj, HttpStatus.OK);
	}

	@GetMapping("/gettotalusers")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getTotalUsers() throws Exception
	{
		List<User> users = userService.getAllUsers();
		List<Integer> usersCount = new ArrayList<>();
		usersCount.add(users.size());
		return new ResponseEntity<List<Integer>>(usersCount, HttpStatus.OK);
	}

	@GetMapping("/gettotalenrollmentcount")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getTotalEnrollmentcount() throws Exception
	{
		List<Enrollment> enrollments = enrollmentService.getAllEnrollments();
		int count = 0;
		for(Enrollment enrollmentObj : enrollments)
		{
			count += Integer.parseInt(enrollmentObj.getEnrolledcount());
		}
		List<Integer> enrollmentsCount = new ArrayList<>();
		enrollmentsCount.add(count);
		return new ResponseEntity<List<Integer>>(enrollmentsCount, HttpStatus.OK);
	}

	@GetMapping("/gettotalenrollments")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getTotalEnrollments() throws Exception
	{
		List<Enrollment> enrollments = enrollmentService.getAllEnrollments();
		List<Integer> enrollmentsCount = new ArrayList<>();
		enrollmentsCount.add(enrollments.size());
		return new ResponseEntity<List<Integer>>(enrollmentsCount, HttpStatus.OK);
	}

}
