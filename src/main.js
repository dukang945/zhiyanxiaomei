// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import multiCascader from "multi-cascader";
import VueDND from 'awe-dnd'
import './assets/icon/iconfont.css'
import {
  has,
  del,
  check,
  online,
  push
} from './components/common/btnPermissions';
Vue.use(ElementUI)
Vue.use(multiCascader);
Vue.use(VueDND)
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
axios.defaults.withCredentials = true;
import Vuex from 'vuex'
import './directive.js';
Vue.use( Vuex );
// axios.defaults.baseURL = 'http://localhost:8080';
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
// Vue.http.options.emulateJSON = true;

//构建vuex
const store = new Vuex.Store({
  //待添加
  state:{
    loading:[]
  },
  mutations: {
    getRoute(state,route){
        let loadingList = state.loading.push(route)
        console.log(state)
    }
  }
})
//路由拦截
router.beforeEach((to, from, next) => {
  const role = sessionStorage.getItem('ms_username');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入
    role === 'admin' ? next() : next('/403');
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    } else {
      next();
    }
  }
})
// http response 拦截器
axios.interceptors.response.use(
  response => {
//     if(typeof(response.data)=="string"){
//       router.replace({
//         path: 'login'
//     })
//     }
      return response;
  },
  error => {
      if (error.response) {
          switch (error.response.status) {
              case 401:
                  // 返回 401 清除token信息并跳转到登录页面
                  store.commit(types.LOGOUT);
                  router.replace({
                      path: 'login'
                  })
          }
      }
      return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  })
// 时间格式化
//元素的补零计算
function addZero(val) {
  if (val < 10) {
    return "0" + val;
  } else {
    return val;
  }
};

//实现vue中的过滤器功能  先定义过滤器 在使用        value是过滤器前面的值，type是过滤器中定义的字段
Vue.filter("formatTime", function (value, type) {
  var dataTime = "";
  var data = new Date();
  data.setTime(value);
  var year = data.getFullYear();
  var month = addZero(data.getMonth() + 1);
  var day = addZero(data.getDate());
  var hour = addZero(data.getHours());
  var minute = addZero(data.getMinutes());
  var second = addZero(data.getSeconds());
  if (type == "YMD") {
    dataTime = year + "-" + month + "-" + day;
  } else if (type == "YMDHMS") {
    dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  } else if (type == "HMS") {
    dataTime = hour + ":" + minute + ":" + second;
  } else if (type == "YM") {
    dataTime = year + "-" + month;
  }
  return dataTime; //将格式化后的字符串输出到前端显示
});


new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
