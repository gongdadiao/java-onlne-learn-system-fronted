import api from './index'
import { axios } from '../utils/request'

export function removeStudent(parameter) {
  return axios({
    url: api.ClassStudentRemove,
    method: 'get',
    params: parameter
  })
}

export function sendMailMsg(parameter) {
  return axios({
    url: api.MailSend,
    method: 'post',
    data: parameter
  })
}
export function getMailMsg() {
  return axios({
    url: api.Mailget,
    method: 'get'
  })
}

export function getClassPreViewData(parameter) {
  return axios({
    url: api.ClassPreViewData+parameter,
    method: 'get'
  })
}

export function joinCourse(parameter) {
  return axios({
    url:api.JoinClass+parameter,
    method: 'get'
  })
}
export function getClassesCardList (parameter) {
  return axios({
    url: api.ClassCardList,
    method: 'get'
  })
}
export function getTrainClassesCardList (parameter) {
  return axios({
    url: api.ClassTrainCardList,
    method: 'get'
  })
}
export function getStudentClassesCardList() {
  return axios({
    url:api.StudentCardList,
    method: 'get'
  })
}
export function getStudentTrainClassesCardList() {
  return axios({
    url:api.StudentTrainCardList,
    method: 'get'
  })
}

export function getCourseInfo (parameter) {
  return axios({
    url: api.CourseInfo+parameter,
    method: 'get'
  })
}

export function addOneCourse (parameter) {
  return axios({
    url: api.ClassAdd,
    method: 'post',
    data:parameter
  })
}

export function addCourseTheme (parameter) {
  return axios({
    url: api.CourseThemeAdd,
    method: 'post',
    data:parameter
  })
}
export function addCourseChapter (parameter) {
  return axios({
    url: api.CourseChapterAdd,
    method: 'post',
    data:parameter
  })
}