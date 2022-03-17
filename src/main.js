import Vue from "vue";
import axios from "./router/axios";
import VueAxios from "vue-axios";
import App from "./App";
import router from "./router/router";
import "./permission"; // 权限
import "./error"; // 日志
import "./cache"; //页面缓存
import store from "./store";
import { loadStyle } from "./util/util";
import * as urls from "@/config/env";
import Element from "element-ui";
import { Message } from 'element-ui'
import { iconfontUrl, iconfontVersion } from "@/config/env";
import i18n from "./lang"; // Internationalization
import "./styles/common.scss";
import basicBlock from "./components/basic-block/main";
import basicContainer from "./components/basic-container/main";
import thirdRegister from "./components/third-register/main";
import avueUeditor from "avue-plugin-ueditor";
import website from "@/config/website";
import lodash from "lodash";
// 字体图标 prefix="icon-mes-"
import "./assets/icon/iconfont.css";
// 以下为bpmn工作流绘图工具的样式
import "bpmn-js/dist/assets/diagram-js.css"; // 左边工具栏以及编辑节点的样式
import search from "@/components/search/index"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import filter from "./filter";
import VDistpicker from "v-distpicker";
import Directive from "@/directives";
import { client } from "@/util/oss.js";
import uploadFile from '@/components/uploadFile'
import printer from '@/mixins/printer'
import * as echarts from 'echarts'
import VueAnimateNumber from 'vue-animate-number'
import moment from 'moment'
import wl from "wl-vue-select";
import "wl-vue-select/lib/wl-vue-select.css"
import { VueJsonp } from 'vue-jsonp'    // 网上很多博客引用不加{}，会报错
Vue.use(VueAnimateNumber)
Vue.use(VueJsonp)
Vue.prototype.$axios = axios
Vue.prototype.echarts = echarts
// import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment
moment.locale('zh-cn')
Vue.use(wl);
Vue.mixin(printer)
import './theme/index.css'
Vue.prototype._ = lodash;
Vue.use(router);
Vue.use(VueAxios, axios);
Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
});
Vue.use(window.AVUE, {
    size: "small",
    tableSize: "small",
    i18n: (key, value) => i18n.t(key, value)
});
Vue.use(filter);
//注册全局容器
Vue.component("basicContainer", basicContainer);
Vue.component("basicBlock", basicBlock);
Vue.component("thirdRegister", thirdRegister);
Vue.component("avueUeditor", avueUeditor);
Vue.component("VDistpicker", VDistpicker);
Vue.component("uploadFile", uploadFile); // 图片上传
Vue.component("search", search); // 搜索

// 加载相关url地址
Object.keys(urls).forEach(key => {
    Vue.prototype[key] = urls[key];
});
// 加载自定义指令
Vue.use(Directive);
// 加载website
Vue.prototype.website = website;
// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
    loadStyle(iconfontUrl.replace("$key", ele));
});
Vue.prototype.$oss = client;
Vue.prototype.$message = Message;
// Vue.prototype.$report = "http://192.168.0.123:8108";
// Vue.prototype.$report = "http://saber.bpy156.com:8108";
//  Vue.prototype.$report = "http://saber.bipinyun.com:8108";
Vue.prototype.$report = window.baseServerUrl + ":8108";
Vue.prototype.$report1 = "http://192.168.196.123" + ":8108";
if (process.env.NODE_ENV == "development") {
    // 设置devtools
    Vue.config.devtools = true;
} else {
    Vue.config.devtools = false;
}
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");