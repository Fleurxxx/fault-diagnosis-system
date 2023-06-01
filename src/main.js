/*
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-05-30 20:36:57
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-05-31 19:27:22
 * @FilePath: \maintenance\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import './style.css'
import router from "./router"
import App from './App.vue'
import Vuex from 'vuex'

// ======= pinia //
import { createPinia } from 'pinia'
const state = createPinia()

// ======= element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// ======= awesome字体图标
import 'font-awesome/css/font-awesome.min.css'



const app = createApp(App)

// 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

//挂载
app.use(router)
    .use(Vuex)
    .use(state)
    .use(ElementPlus)
    .mount('#app')