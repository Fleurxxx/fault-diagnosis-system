/*
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-07-10 10:13:57
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-10 10:14:07
 * @FilePath: \maintenance\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createPinia } from 'pinia'
// 引入持久化插件
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
// 使用该插件
store.use(piniaPluginPersist)

//导出
export default store
