// ie polyfill
import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter
Vue.config.productionTip = false
//使用视频播放需要导入
import VueAliplayerV2 from '../packages';
Vue.use(VueAliplayerV2);
// axios组件
Vue.use(VueAxios)
//-------------七牛云------------------------------
Vue.use(qiniu)
import * as qiniu from 'qiniu-js'
//------------------格式主题--------------------
import './assets/stylus/index.styl'
import './assets/theme/index.styl'
//--------------bootstrap-vue-------------------
import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
//--------------引入图标-----------------
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//-------------导入elementUI------------------
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//----------注册Mooc组件----------------------
import Mooc from './register.js'
Vue.use(Mooc)
//----------------注册ant 的menu组件----------------
// import { Menu } from 'ant-design-vue'
// Vue.use(Menu)
//------------------iview组件----------------------
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
Vue.use(iView);
//-------------初始化-------------------------
new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
