import { axios } from '../utils/request'
import api from '../api/index'


export function getAnnounceList (id) {
  return axios({
    url: api.GetAnnounceList+id,
    method: 'get',
  })
}

export function setAnnounce (parameter) {
  return axios({
    url: api.SetAnnounce,
    method: 'post',
    data: parameter
  })
}