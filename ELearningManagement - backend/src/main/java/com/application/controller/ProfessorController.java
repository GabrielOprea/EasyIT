package com.application.controller;

import java.util.ArrayList;
import java.util.List;

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
public class ProfessorController
{
	@Autowired
	private ProfessorService professorService;

	@Autowired
	private CourseService courseService;

  @Autowired
  private QuizService quizService;

  @Autowired
  private QuestionService questionService;

  @Autowired
	private ChapterService chapterService;
  @Autowired
  private AnnouncementService announcementService;

	@Autowired
	private WishlistService wishlistService;

	@GetMapping("/professorlist")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Professor>> getProfessorList() throws Exception
	{
		List<Professor> professors = professorService.getAllProfessors();
		return new ResponseEntity<List<Professor>>(professors, HttpStatus.OK);
	}

	@GetMapping("/youtubecourselist")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Course>> getYoutubeCourseList() throws Exception
	{
		List<Course> youtubeCourseList = courseService.fetchByCoursetype("Youtube");
//		for(Course list:youtubeCourseList)
//		{
//			System.out.println(list.getYoutubeurl());
//		}
		return new ResponseEntity<List<Course>>(youtubeCourseList, HttpStatus.OK);
	}

	@GetMapping("/websitecourselist")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Course>> getWebsiteCourseList() throws Exception
	{
		List<Course> websiteCourseList = courseService.getAllCourses();
		return new ResponseEntity<List<Course>>(websiteCourseList, HttpStatus.OK);
	}

	@GetMapping("/quizlist/{courseid}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Quiz>> getCourseListByName(@PathVariable String courseid) throws Exception
	{
    List<Quiz> quizlist = quizService.fetchQuizesByCourseid(courseid);
		return new ResponseEntity<List<Quiz>>(quizlist, HttpStatus.OK);
	}

  @GetMapping("/courselistbyname/{coursename}")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<Course>> getQuizlist(@PathVariable String coursename) throws Exception
  {
    Course courseList = courseService.fetchCourseByCoursename(coursename);
    System.out.println(courseList.getCoursename()+" ");
    List<Course> courselist = new ArrayList<>();
    courselist.add(courseList);
    return new ResponseEntity<List<Course>>(courselist, HttpStatus.OK);
  }

	@GetMapping("/professorlistbyemail/{email}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Professor>> getProfessorListByEmail(@PathVariable String email) throws Exception
	{
		List<Professor> professors = professorService.getProfessorsByEmail(email);
		return new ResponseEntity<List<Professor>>(professors, HttpStatus.OK);
	}

	@PostMapping("/addProfessor")
	@CrossOrigin(origins = "http://localhost:4200")
	public Professor addNewProfessor(@RequestBody Professor professor) throws Exception
	{
		Professor professorObj = null;
		String newID = getNewID();
		professor.setProfessorid(newID);
		professorObj = professorService.addNewProfessor(professor);
		professorService.updateStatus(professor.getEmail());
		return professorObj;
	}

  private void addFeedbackForThisCourse(Course course) {
    Quiz quiz = new Quiz();
    quiz.setCourseid(course.getCourseid());
    quiz.setQuizid(getNewID());
    quiz.setQuizname("FEEDBACK");
    quiz.setNoquestions("5");

    List<Question> feedbackquestions = new ArrayList<>();

    Question q1 = new Question();
    q1.setQuestion("Cum ti s-a parut acest curs ?");

    Question q2 = new Question();
    q2.setQuestion("Cum ti s-a parut calitatea materialelor ?");

    Question q3 = new Question();
    q3.setQuestion("Cum ti s-a modul de evaluare si dificultatea quiz-urilor ?");

    Question q4 = new Question();
    q4.setQuestion("Cum ti s-a parut ca instructorul stapaneste materia?");

    Question q5 = new Question();
    q5.setQuestion("Cum ti s-a parut aplicabilitatea notiunilor invatate");

    feedbackquestions.add(q1);
    feedbackquestions.add(q2);
    feedbackquestions.add(q3);
    feedbackquestions.add(q4);
    feedbackquestions.add(q5);

    for (Question q : feedbackquestions) {
      q.setVara("Excelent");
      q.setVarb("Satisfacator");
      q.setVarc("Mediocru");
      q.setVard("Nesatisfacator");
      q.setQuestionid(getNewID());
      q.setQuizid(quiz.getQuizid());

      questionService.addNewQuestion(q);
    }

    quizService.addNewQuiz(quiz);
  }
	@PostMapping("/addCourse")
	@CrossOrigin(origins = "http://localhost:4200")
	public Course addNewCourse(@RequestBody Course course) throws Exception
	{
		Course courseObj = null;
		String newID = getNewID();
		course.setCourseid(newID);

		courseObj = courseService.addNewCourse(course);

    addFeedbackForThisCourse(course);

		return courseObj;
	}

  @PostMapping("/addannouncement")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<Announcement> addPost(@RequestBody Announcement post) throws Exception
  {
    Announcement postobj = announcementService.addNewAnnouncement(post);
    postobj.setPostid(getNewID());
    return new ResponseEntity<Announcement>(postobj, HttpStatus.OK);
  }


  @PostMapping("/addQuiz")
  @CrossOrigin(origins = "http://localhost:4200")
  public Quiz addNewQuiz(@RequestBody Quiz quiz) throws Exception
  {
    Quiz quizObj = null;
    String newID = getNewID();
    quiz.setQuizid(newID);

    quizObj = quizService.addNewQuiz(quiz);
    return quizObj;
  }

  @PostMapping("/thumbnail-upload")
  @CrossOrigin(origins = "http://localhost:4200")
  public Quiz addNewFile(@RequestBody Quiz quiz) throws Exception
  {
    Quiz quizObj = null;
    String newID = getNewID();
    quiz.setQuizid(newID);

    quizObj = quizService.addNewQuiz(quiz);
    return quizObj;
  }

  @PostMapping("/addQuestion")
  @CrossOrigin(origins = "http://localhost:4200")
  public Question addNewQuiz(@RequestBody Question question) throws Exception
  {
    Question questionObj = null;
    String newID = getNewID();
    question.setQuestionid(newID);

    questionObj = questionService.addNewQuestion(question);
    return questionObj;
  }


  @PostMapping("/addnewchapter")
	@CrossOrigin(origins = "http://localhost:4200")
	public Chapter addNewChapters(@RequestBody Chapter chapter) throws Exception
	{
		Chapter chapterObj = null;
		chapterObj = chapterService.addNewChapter(chapter);
		return chapterObj;
	}

	@GetMapping("/acceptstatus/{email}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<String>> updateStatus(@PathVariable String email) throws Exception
	{
		professorService.updateStatus(email);
		List<String> al=new ArrayList<>();
		al.add("accepted");
		return new ResponseEntity<List<String>>(al,HttpStatus.OK);
	}

	@GetMapping("/rejectstatus/{email}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<String>> rejectStatus(@PathVariable String email) throws Exception
	{
		professorService.rejectStatus(email);
		List<String> al=new ArrayList<>();
		al.add("rejected");
		return new ResponseEntity<List<String>>(al,HttpStatus.OK);
	}

	@GetMapping("/professorprofileDetails/{email}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Professor>> getProfileDetails(@PathVariable String email) throws Exception
	{
		List<Professor> professors = professorService.fetchProfileByEmail(email);
		return new ResponseEntity<List<Professor>>(professors, HttpStatus.OK);
	}

	@PutMapping("/updateprofessor")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Professor> updateProfessorProfile(@RequestBody Professor professor) throws Exception
	{
		Professor professorobj = professorService.updateProfessorProfile(professor);
		return new ResponseEntity<Professor>(professorobj, HttpStatus.OK);
	}

	@GetMapping("/gettotalprofessors")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getTotalProfessors() throws Exception
	{
		List<Professor> professors = professorService.getAllProfessors();
		List<Integer> professorsCount = new ArrayList<>();
		professorsCount.add(professors.size());
		return new ResponseEntity<List<Integer>>(professorsCount, HttpStatus.OK);
	}

	@GetMapping("/gettotalchapters")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getTotalChapters() throws Exception
	{
		List<Chapter> chapters = chapterService.getAllChapters();
		List<Integer> chaptersCount = new ArrayList<>();
		chaptersCount.add(chapters.size());
		return new ResponseEntity<List<Integer>>(chaptersCount, HttpStatus.OK);
	}

	@GetMapping("/gettotalcourses")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getTotalCourses() throws Exception
	{
		List<Course> courses = courseService.getAllCourses();
		List<Integer> coursesCount = new ArrayList<>();
		coursesCount.add(courses.size());
		return new ResponseEntity<List<Integer>>(coursesCount, HttpStatus.OK);
	}

	@GetMapping("/gettotalwishlist")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<Integer>> getTotalWishlist() throws Exception
	{
		List<Wishlist> wishlists = wishlistService.getAllLikedCourses();
		List<Integer> wishlistCount = new ArrayList<>();
		wishlistCount.add(wishlists.size());
		return new ResponseEntity<List<Integer>>(wishlistCount, HttpStatus.OK);
	}

  @GetMapping("/getcoursenames")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<List<String>> getCourseNames() throws Exception
	{
		List<Course> courses = courseService.getAllCourses();
		List<String> coursenames = new ArrayList<>();
		for(Course obj : courses)
		{
			coursenames.add(obj.getCoursename());
		}
		return new ResponseEntity<List<String>>(coursenames, HttpStatus.OK);
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


  @GetMapping("/getIntermediateCourses")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<Course>> getIntermediateCourses() throws Exception
  {
    List<Course> youtubeCourseList = courseService.fetchBySkilllevel("Intermediate");
    return new ResponseEntity<List<Course>>(youtubeCourseList, HttpStatus.OK);
  }
  @GetMapping("/getBasicCourses")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<Course>> getBasicCourses() throws Exception
  {
    List<Course> youtubeCourseList = courseService.fetchBySkilllevel("Basic");
    return new ResponseEntity<List<Course>>(youtubeCourseList, HttpStatus.OK);
  }

  @GetMapping("/getAdvancedCourses")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<Course>> getAdvancedCourses() throws Exception
  {
    List<Course> youtubeCourseList = courseService.fetchBySkilllevel("Advanced");
    return new ResponseEntity<List<Course>>(youtubeCourseList, HttpStatus.OK);
  }
}
