import axioss from './axios.js'
import { axios } from '../utils/request'
import api from '../api/index'


// export function getAnnounceList () {
//   return axios({
//     url: api.GetAnnounceList,
//     method: 'get',
//   })
// }
// 获取主页导航信息
export function getHomeNav () {
  // return axios.get('/mock/home/nav.json')
  return axios({
    url: api.HomeNav,
    method: 'get'
  })
}
// 获取主页滚动轮播数据
export function getSliderList () {
  return axioss.get('/mock/home/slider.json')
}
// 获取主页课程信息
export function getHomeCourse () {
  return axios({
    url: api.HomeRecommend,
    method: 'get'
  })
}
// 获取主页猿问和手记信息
export function getArticle () {
  return axioss.get('/mock/home/article.json')
}
// 获取精英讲师信息
export function getTeacher () {
  return axioss.get('/mock/home/teacher.json')
}
// 获取全明星信息
export function getAllStar () {
  return axioss.get('/mock/home/allstar.json')
}