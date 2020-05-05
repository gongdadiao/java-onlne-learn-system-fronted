import api from './index'
import { axios } from '../utils/request'

export function getStudentList (parameter) {
  return axios({
    url: api.StudentList,
    method: 'get',
    params:parameter
  })
}

export function getThisClassStudentList(parameter) {
  return axios({
    url: api.ClassStudentList+parameter,
    method: 'get'
  })
}

export function submitExcelfile(data) {
  return axios({
    url:api.SubmitExcel,
    method:'post',
    headers : { 'Content-Type': 'multipart/form-data'},
    data
})
}