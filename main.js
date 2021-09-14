import Vue from 'vue'
import App from './App'
//Vuex
import store from './store'
Vue.prototype.$store = store

//请求加载组件
import requestLoading from './components/common/loading/loading.vue';
//组件挂载到全局，方便每个页面使用
Vue.component('request-loading', requestLoading);

//挂载全局显示/隐藏请求加载动画
function showLoading() {
	console.log(store)
	store.commit('request_show_loading');
}

function hideLoading() {
	store.commit('request_hide_loading');
}
Vue.prototype.$showLoading = showLoading; //全局显示动画可以 this.$showLoading();
Vue.prototype.$hideLoading = hideLoading; //全局隐藏动画可以 this.$hideLoading();


// #ifdef H5
import wechat from '@/utils/wechat';
import wxH5Login from '@/utils/wxH5Login';
import custom from 'components/common/custom/custom'
Vue.component('custom', custom);
Vue.prototype.$wx = wechat;
Vue.prototype.$wxH5Login = wxH5Login;
// #endif
import tabBar from 'components/freeStyle/footer/index.vue'
Vue.prototype.siteinfo = require('@/utils/siteinfo.js');
Vue.prototype.func = require('@/utils/func.js');
Vue.component('tabBar', tabBar);
const filter = require("@/utils/filter.js")
const api = require("@/api/server-api.js")
const http = require("@/utils/httpHelper.js")
const common = require("@/utils/common.js")
console.log(api.umaArrayObj)
import ZAudio from '@/components/uniapp-zaudio/index.js'
console.log(`ZAudio当前版本`,ZAudio.version)
let zaudio = new ZAudio({
	controls:true,
	continuePlay: true, //续播
	autoPlay: false, //自动播放 部分浏览器不支持
})
Vue.prototype.$zaudio = zaudio
Vue.prototype.$mbgColor='#ffffff'
//this.$mbgColor

// 设置音频数据
//zaudio.setAudio(data)
//渲染第一首音频
zaudio.setRender(0)
// #ifdef MP-WEIXIN
import uma from 'umtrack-wx';
uma.init({
	appKey: api.umaArrayObj,
	useOpenid: true,
	autoGetOpenid: true,
	debug: false,
	uploadUserInfo: true // 自动上传用户信息，设为false取消上传，默认为false
});

// #endif
Vue.config.productionTip = false;
Vue.prototype.$filter = filter;
Vue.prototype.$api = api;
Vue.prototype.$http = http;
Vue.prototype.$common = common;
App.mpType = 'app'
if (!api.isDev) { //去除正式环境console.log
	console.log = () => {}
}
const app = new Vue({
	...App
})
app.$mount()
