import api from './index'
import { axios } from '../utils/request'

export function selectQuestions(id,parameter) {
  return axios({
    url: api.TrainQuestionsSelect+id,
    method: 'post',
    data: parameter
  })
}

export function getTrainStudentDetail(parameter) {
  return axios({
    url: api.TrainCourseStudentCourseDetail+parameter,
    method: 'get'
  })
}
export function submitCodes(parameter) {
  return axios({
    url: api.TrainSubmitCode,
    method: 'post',
    data:parameter
  })
}
//获取一页题目
export function getTrainQuestionList(parameter){
  return axios({
    url: api.TrainCourseQuestionPage,
    method: 'get',
    params: parameter
  })
}
// 创建课程
export function createCourse(parameter) {
  return axios({
    url: api.TrainCourse,
    method: 'post',
    data:parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
//创建题目
export function createQuestion(parameter) {
  return axios({
    url: api.TrainCourseQuestionCreate,
    method: 'post',
    data:parameter
  })
}
//获取所有题目
export function questionList() {
  return axios({
    url: api.TrainCourseQuestionList,
    method: 'get'
  })
}
//课程详细信息
export function courseDetail(parameter) {
  return axios({
    url: api.TrainCourseDetail+parameter,
    method: 'get'
  })
}
//上传测试用例文件
export function submitCheckFiles(parameter,data) {
  return axios({
    url: api.TrainQuestionCheckCreate+parameter,
    method: 'post',
    headers : { 'Content-Type': 'multipart/form-data'},
    data
  })
}
