
import api from './index'
import { axios } from '../utils/request'

export function getVideo(parameter) {
  return axios({
    url: api.ResGetVideo+parameter,
    method: 'get'
  })
}
export function getCode(parameter) {
  return axios({
    url: api.ResGetCode+parameter,
    method: 'get'
  })
}
export function getUrl(parameter) {
  return axios({
    url: api.ResUrl+parameter,
    method: 'get'
  })
}


export function getGradeDistribute(parameter) {
  return axios({
    url: api.GradeDistribute+parameter,
    method: 'get'
  })
}
export function getResListForChoose () {
  return axios({
    url: api.ResListForChapter,
    method: 'get',
  })
}

export function submitHomework (id,parameter) {
  return axios({
    url: api.SubmitHomework+id,
    method: 'post',
    data:parameter
  })
}

export function getHomework (parameter) {
  return axios({
    url: api.GetHomework+parameter,
    method: 'get'
  })
}


export function getLessonDetail (parameter) {
  return axios({
    url: api.LessonDetail+parameter,
    method: 'get'
  })
}

export function getResourceList () {
  return axios({
    url: api.ResList,
    method: 'get'
  })
}

export function getAdminResourceList (parameter) {
  return axios({
    url: api.AdminResList,
    method: 'get',
    params: parameter
  })
}

export function addOneResource (parameter) {
  return axios({
    url: api.AddRes,
    method: 'post',
    data: parameter
  })
}