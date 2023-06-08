/*
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-05-30 20:36:57
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-06-06 19:30:04
 * @FilePath: \maintenance\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import './style.css'
import router from "./router"
import App from './App.vue'
import Vuex from 'vuex'

// ======= iView
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'

// ======= pinia
import { createPinia } from 'pinia'
const state = createPinia()

// ======= element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// ======= awesome字体图标
import 'font-awesome/css/font-awesome.min.css'

// ======= codemirror编辑器
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// import "codemirror/addon/hint/show-hint.css";


// ======= echarts
import * as echarts from 'echarts'
// import echarts from 'echarts'




const app = createApp(App)

app.config.globalProperties.$echarts = echarts
// app.prototype.$echarts = echarts

// 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

//挂载
app.use(router)
    .use(Vuex)
    .use(state)
    .use(VueCodeMirror)
    .use(ViewUIPlus)
    .use(ElementPlus)
    .mount('#app')
