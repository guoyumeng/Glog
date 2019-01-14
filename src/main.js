
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


import "babel-polyfill"
// eslint-disable-next-line no-use-before-define
Vue.config.productionTip = false

import Vue from 'vue'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/font/iconfont.css'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueWechatTitle from 'vue-wechat-title';
 import _path from './api/_path' //引用文件
 import router from './router'
 Vue.prototype._path = _path //挂载到Vue实例上面
Vue.use(VueWechatTitle)



Vue.use(VueAxios, axios)
Vue.use(ElementUI)

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})


Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
