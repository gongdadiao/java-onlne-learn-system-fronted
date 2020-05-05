// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '../layouts'
import { examList, examAdmin, questionAdmin } from '../core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '在线考试系统' },
    redirect: '/dashboard/home',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/home',
        component: RouteView,
        hideChildrenInMenu: true,
        meta: { title: '首页', keepAlive: true, icon: 'home', permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/home',
            name: 'Workplace',
            component: () => import('../views/user/home/index'),
            meta: { title: '简介', keepAlive: true, permission: ['dashboard'] },
            children:[]
          },
          {
            path:'/course/view/:id',
            name:'CoursePreView',
            component: () => import('../views/classes/PreViewCourse'),
            meta: { title: '课程信息', keepAlive: false},
          }
        ]
      },
      // {
      //   path: '/messages',
      //   component: RouteView,
      //   redirect: '/messages/center',
      //   name: '',
      //   // 隐藏当前菜单，但是因为是需要的，所以不能删掉
      //   hidden: true,
      //   meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] }
      // },
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        // 隐藏当前菜单，但是因为是需要的，所以不能删掉
        hidden: true,
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/messages',
            name: 'messages',
            component: () => import('../views/account/messages/index'),
            meta: { title: '消息', hideHeader: true, permission: ['user'] },
            //redirect: '/account/settings/base',
            //hideChildrenInMenu: true,
            //children: []
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('../views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('../views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('../views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: ['user'] }
              }
              ,
              {
                path: '/account/settings/student',
                name: 'StudentSettings',
                component: () => import('../views/account/settings/StudentSetting'),
                meta: { title: '学生信息', hidden: true, keepAlive: true, permission: ['user'] }
              }
            ]
          }
        ]
      },
      {
        path: '/student-class',
        name:'student-class',
        redirect: '/classes/student-class',
        component: PageView,
        hideChildrenInMenu: true,
        meta: { title: '我的课程', keepAlive: true, icon: examList, permission: ['student-class'] },
        children: [
          {
            path: '/classes/student-class',
            name: 'StudentClassList',
            component: () => import('../views/classes/StudentClassList'),
            meta: { title: '列表', keepAlive: true, permission: ['student-class'] }
          },
          {
            path: '/classes/studentdetail/:id',
            name: 'StudentClassDetail',
            component: () => import('../views/resources/resource-detail/index'),
            meta: { title: '详情', keepAlive: true, permission: ['student-class'] },
          },
          {
            path: '/train/studentdetail/:id',
            name: 'StudentTrainClassDetail',
            component: () => import('../views/traincourse/StudentTrainDetail'),
            meta: { title: '详情', keepAlive: true, permission: ['student-class'] },
          },
          {
            path:'/classes/video/:id',
            name: 'VideoDetail',
            component: ()=>import('../views/resources/VideoDetail'),
            meta: { title:'视频',keepAlive: true, permission: ['student-class']}
          },
          {
            path:'/classes/office/:id',
            name: 'OfficeDetail',
            component: ()=>import('../views/resources/DocDetail'),
            meta:{ title:'文档',keepAlive: true, permission: ['student-class']}
          },
          {
            path:'/classes/exam/:id',
            name: 'ExamDetail',
            component: ()=>import('../views/list/ExamDetail'),
            meta:{ title:'试卷',keepAlive: true, permission: ['student-class']}
          },
          {
            path:'/classes/test/:id',
            name: 'TestDetail',
            component: ()=>import('../views/resources/HomeworkDetail'),
            meta:{ title:'作业',keepAlive: true, permission: ['student-class']}
          }
        ]
      },
      {
        path: '/my-class',
        name:'my-class',
        redirect: '/classes/my-class',
        component: PageView,
        hideChildrenInMenu: true,
        meta: { title: '我的课程', keepAlive: true, icon: examList, permission: ['my-class'] },
        children: [
          {
            path: '/classes/my-class',
            name: 'MyClassList',
            component: () => import('../views/classes/index'),
            meta: { title: '列表', keepAlive: true, permission: ['my-class'] },
            children: []
          },
          {
            path: '/classes/detail/:id',
            name: 'MyClassDetail',
            component: () => import('../views/classes/ClassDetail'),
            meta: { title: '详情', keepAlive:true, permission: ['my-class'] },
          },
          {
            path: '/train/detail/:id',
            name: 'MyTrainClassDetail',
            component: () => import('../views/traincourse/MyTrainClassDetail'),
            meta: { title: '详情', keepAlive:true, permission: ['my-class'] },
          },
          {
            path: '/submit/show-test/:id',
            name:'MarkTestDetail',
            component: () => import('../views/list/MarkingPage'),
            meta: { title: '批改', keepAlive: true, permission: ['my-class'] },
          }
        ]
      },
      {
        path: '/manage-student',
        name:'manage-student',
        redirect: '/students/manage-student',
        component: PageView,
        hideChildrenInMenu: true,
        meta: { title: '学生管理', keepAlive: true, icon: examList, permission: ['manage-student'] },
        children: [
          {
            path: '/students/manage-student',
            name: 'MyStudentList',
            component: () => import('../views/students/StudentList'),
            meta: { title: ' 详情', keepAlive: true, permission: ['manage-student'] }
          }
        ]
      },
      {
        path: '/question-admin',
        name: 'question-admin',
        redirect: '/list/question-table-list',
        component: PageView,
        hideChildrenInMenu: true,
        meta: { title: '题库', keepAlive: true, icon: questionAdmin, permission: ['question-admin'] },
        children: [
          {
            path: '/list/question-table-list',
            name: 'QuestionTableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('../views/list/QuestionTableList'),
            meta: { title: '详情', keepAlive: true, permission: ['question-admin'] }
          }
        ]
      },
      {
        path:'/res-add',
        name: 'res-add',
        component: PageView,
        redirect: '/resource/resource-add',
        hideChildrenInMenu: true,
        meta: { title: '资源库', keepAlive: true,icon: examAdmin, permission: ['resource-add'] },
        children: [
          {
            path: '/resource/resource-add',
            name: 'ResourceAddWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('../views/resources/AddResourceDetail'),
            meta: { title: '管理资源', keepAlive: true, permission: ['resource-add'] },
            // children:[]
          }
        ]
      }
      // {
      //   path: '/code-editor',
      //   name:'cod-editor',
      //   redirect: '/code/code-editor',
      //   component: PageView,
      //   hideChildrenInMenu: true,
      //   meta: { title: '编程实践', keepAlive: true, icon: examList, permission: ['code-editor'] },
      //   children: [
      //     {
      //       path: '/code/code-editor',
      //       name: 'CodeEditorDetail',
      //       component: () => import('../views/code/index'),
      //       meta: { title: '实践', keepAlive: true, permission: ['code-editor'] }
      //     }
      //     ]
      // },
      // {
      //   path: '/exam-card',
      //   name: 'exam-card',
      //   redirect: '/list/exam-card',
      //   component: PageView,
      //   hideChildrenInMenu: true,
      //   meta: { title: '考试列表', keepAlive: true, icon: examList, permission: ['exam-card'] },
      //   children: [
      //     {
      //       path: '/list/exam-card',
      //       name: 'ExamCardList',
      //       component: () => import('../views/list/ExamCardList'),
      //       meta: { title: '详情', keepAlive: true, permission: ['exam-card'] }
      //     }
      //   ]
      // },
      // {
      //   path: '/question-admin',
      //   name: 'question-admin',
      //   redirect: '/list/question-table-list',
      //   component: PageView,
      //   hideChildrenInMenu: true,
      //   meta: { title: '问题管理', keepAlive: true, icon: questionAdmin, permission: ['question-admin'] },
      //   children: [
      //     {
      //       path: '/list/question-table-list',
      //       name: 'QuestionTableListWrapper',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('../views/list/QuestionTableList'),
      //       meta: { title: '详情', keepAlive: true, permission: ['question-admin'] }
      //     }
      //   ]
      // },
      // {
      //   path:'/res-list',
      //   name: 'res-list',
      //   component: PageView,
      //   redirect: '/resource/resource-list',
      //   hideChildrenInMenu: true,
      //   meta: { title: '资源列表', keepAlive: true,icon: examAdmin, permission: ['resource-list'] },
      //   children: [
      //     {
      //       path: '/resource/resource-list',
      //       name: 'ResourceListWrapper',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('../views/resources/resource-detail/index'),
      //       meta: { title: '资源菜单', keepAlive: true, permission: ['resource-list'] },
      //       children:[
      //
      //       ]
      //     },
      //     {
      //       path: '/resource/show-video/:id',
      //       name: 'VideoDetail',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('../views/resources/VideoDetail'),
      //       meta: { title: '播放', keepAlive: true , permission: ['resource-list'] },
      //     },
      //     {
      //       path: '/resource/show-doc/:id',
      //       name: 'DocDetail',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('../views/resources/DocDetail'),
      //       meta: { title: '文档', keepAlive: true , permission: ['resource-list'] },
      //     },
      //     {
      //       path: '/resource/show-homework/:id',
      //       name: 'HomeWorkDetail',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('../views/resources/HomeworkDetail'),
      //       meta: { title: '作业', keepAlive: true , permission: ['resource-list'] },
      //     }
      //   ]
      // },
      // {
      //   path:'/res-add',
      //   name: 'res-add',
      //   component: PageView,
      //   redirect: '/resource/resource-add',
      //   hideChildrenInMenu: true,
      //   meta: { title: '管理资源', keepAlive: true,icon: examAdmin, permission: ['resource-add'] },
      //   children: [
      //     {
      //       path: '/resource/resource-add',
      //       name: 'ResourceAddWrapper',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('../views/resources/AddResourceDetail'),
      //       meta: { title: '管理资源', keepAlive: true, permission: ['resource-add'] },
      //       // children:[]
      //     }
      //   ]
      // },
      // {
      //   path: '/announce/announce-publish',
      //   name: 'announce-publish',
      //   component: PageView,
      //   redirect: '/announce/announce-publish',
      //   hideChildrenInMenu: true,
      //   meta: { title: '发布公告', icon: examAdmin, permission: ['announce-publish'] },
      //   children: [
      //     {
      //       path: '/announce/announce-publish',
      //       name: 'AnnouncePublishWrapper',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('../views/annoucement/Annoucement'),
      //       meta: { title: '详情', keepAlive: true, permission: ['announce-publish'] }
      //     }
      //   ]
      // },
      // {
      //   path: '/list/exam-table-list',
      //   name: 'exam-table-list',
      //   component: PageView,
      //   redirect: '/list/exam-table-list',
      //   hideChildrenInMenu: true,
      //   meta: { title: '考试管理', icon: examAdmin, permission: ['exam-table-list'] },
      //   children: [
      //     {
      //       path: '/list/exam-table-list',
      //       name: 'ExamTableListWrapper',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('../views/list/ExamTableList'),
      //       meta: { title: '详情', keepAlive: true, permission: ['exam-table-list'] }
      //     }
      //   ]
      // },
      // {
      //   path: '/list/submit-table-list',
      //   name: 'submit-table-list',
      //   component: PageView,
      //   redirect: '/list/submit-table-list',
      //   hideChildrenInMenu: true,
      //   meta: { title: '提交管理', icon: examAdmin, permission: ['submit-table-list'] },
      //   children: [
      //     {
      //       path: '/list/submit-table-list',
      //       name: 'TeacherRecordListWrapper',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('../views/list/TeacherRecordList'),
      //       meta: { title: '列表', keepAlive: true, permission: ['submit-table-list'] }
      //     },
      //     {
      //       path: '/submit/show-test/:id',
      //       name: 'SubmitDetail',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('../views/list/MarkingPage'),
      //       meta: { title: '学生提交', keepAlive: true , permission: ['submit-table-list'] },
      //     }
      //   ]
      // },
      // {
      //   path: '/exam-record-list',
      //   name: 'exam-record-list',
      //   redirect: '/list/exam-record-list',
      //   component: PageView,
      //   hideChildrenInMenu: true,
      //   meta: { title: '我的考试', keepAlive: true, icon: 'user', permission: ['exam-record-list'] },
      //   children: [
      //     {
      //       path: '/list/exam-record-list',
      //       name: 'ExamRecordList',
      //       component: () => import('../views/list/ExamRecordList'),
      //       meta: { title: '详情', keepAlive: true, permission: ['exam-record-list'] }
      //     }
      //   ]
      // },
      // {
      //   path: '/account',
      //   component: RouteView,
      //   redirect: '/account/center',
      //   name: 'account',
      //   // 隐藏当前菜单，但是因为是需要的，所以不能删掉
      //   hidden: true,
      //   meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
      //   children: [
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: () => import('../views/account/settings/Index'),
      //       meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
      //       redirect: '/account/settings/base',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/account/settings/base',
      //           name: 'BaseSettings',
      //           component: () => import('../views/account/settings/BaseSetting'),
      //           meta: { title: '基本设置', hidden: true, permission: ['user'] }
      //         },
      //         {
      //           path: '/account/settings/custom',
      //           name: 'CustomSettings',
      //           component: () => import('../views/account/settings/Custom'),
      //           meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: ['user'] }
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  },
  {
    // 所有访问不到的路径最终都会落到404里
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由，不在主菜单上展示，独立的路由
 * @type { *[] }
 */
/*
*   {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '在线考试系统' },
    redirect: '/dashboard/home',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/home',
        component: RouteView,
        hideChildrenInMenu: true,
        meta: { title: '首页', keepAlive: true, icon: 'home', permission: ['dashboard'] },
        children: [
          {
* */
export const constantRouterMap = [
  {
    path: '/user',
    component: BasicLayout,
    redirect: '/user/login',
    meta: { title: 'java学习实践系统' },
    hidden: true,
    children: [
      {
        path: '/user/login',
        name: 'firstboard',
        redirect: '/user/login',
        component: RouteView,
        hideChildrenInMenu: true,
        meta: { title: '首页', keepAlive: true, icon: 'home'},
        children: [
          {
          path: '/user/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "user" */ '../views/user/home/index')
         },
          {
            path:'/user/register',
            name:'register',
            component: () => import ('../views/user/Register')
          },
          {
            path: 'register-result',
            name: 'registerResult',
            component: () => import(/* webpackChunkName: "user" */ '../views/user/RegisterResult')
          }
        ]
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('../views/TestHome')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '../views/exception/404')
   }
  // {
  //   path: '/exam/:id',
  //   component: () => import(/* webpackChunkName: "fail" */ '../views/list/ExamDetail')
  // },
  // {
  //   path: '/exam/record/:exam_id/:record_id',
  //   component: () => import(/* webpackChunkName: "fail" */ '../views/list/ExamRecordDetail')
  // }
]
