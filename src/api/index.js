const api = {
  TrainCourseQuestion:'/train/create/question',
  TrainCourse:'/train/create/course',
  TrainCourseDetail:'/train/course/detail/',
  TrainCourseQuestionList:'/train/questions/list',
  TrainCourseQuestionCreate:'/train/question/create',
  TrainCourseQuestionPage:  '/train/questions/page',
  TrainQuestionCheckCreate:'/train/create/check/',
  TrainQuestionsSelect:'/train/select/questions/',
  TrainCourseStudentCourseDetail:'/train/course/studentdetail/',
  TrainSubmitCode:'/train/code/run',

  Login: '/auth/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',

  StudentList:'/student/list',
  SubmitExcel:'/student/importfile',
  ClassStudentList:'/student/classList/',

  //get token
  getToken: '/auth/token/',
  // 下面是自己的用户认证的接口
  UserRegister: '/user/register',
  UserLogin: '/user/login',
  UserSetting:'/user/settings',
  UserStudentSetting:'/user/settings/student',

  // 考试的接口
  ExamQuestionList: '/exam/question/list',
  ExamQuestionUpdate: '/exam/question/update',
  ExamQuestionSelection: '/exam/question/selection',
  ExamQuestionCreate: '/exam/question/create',
  ExamList: '/exam/list',
  // 获取问题列表，按照单选、多选和判断进行分类
  ExamQuestionTypeList: '/exam/question/type/list',
  ExamCreate: '/exam/create',
  ExamCardList: '/exam/card/list',
  QuestionList:'/exam/question/list/30',
  AdminQuestionList:'/exam/question/pageList',
  QuestionAdd: '/exam/question/create',
  // 获取考试详情
  ExamDetail: '/exam/detail/',
  // 获取考试详情
  QuestionDetail: '/exam/question/detail/',
  // 交卷
  FinishExam: '/exam/finish/',
  ExamRecordList: '/exam/record/list',
  recordDetail: '/exam/record/detail/',

  AdminRecordList: '/record/admin/list/',
  AdminGetOneExamRecord:'/record/admin/detail',
  GradeDistribute: '/record/grade/info/',
  SubmitMarked: '/record/admin/marked/',
  //资源接口
  UploadHomework:'/res/upload/homework',
  ResList: '/res/themes',
  ResListForChapter:'/res/chapter/list/30',
  AdminResList:'/res/admin/list',
  AddRes: '/res/addRes',
  LessonDetail: '/classes/detail/',
  GetHomework:'/res/test/get/',
  SubmitHomework: '/res/test/submit/',
  //关于公告
  GetAnnounceList:'/announce/list/',
  SetAnnounce:'/announce/submit',

//-------课程------------------------
  ClassCardList:'/classes/list',
  ClassTrainCardList:'/classes/train/list',
  StudentCardList:'/classes/student/list',
  StudentTrainCardList:'/classes/student/train/list',
  ClassAdd:'/classes/add',
  CourseInfo:'/classes/detail/',
  ClassPreViewData:'/classes/preview/',
  ClassStudentRemove:'/classes/student/delete/',
  //--------课程信息-----------------
  CourseThemeAdd:'/classes/addTheme',
  CourseChapterAdd:'/classes/addChapter',
  JoinClass:'/classes/joinClass/',

  //首页设置
  HomeNav:'/view/nav',
  HomeRecommend:'/view/recommend',

  MailSend: '/mail/send',
  Mailget: '/mail/list'
}
export default api
