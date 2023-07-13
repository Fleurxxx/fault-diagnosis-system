/*
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-07-08 00:36:13
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-10 09:39:49
 * @FilePath: \maintenance\src\store\model.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import { ref } from "vue";


export default defineStore('model', {
  state: () => {
    return {
        id:'',
        name:'',
        describe:'',

	  };
  },
  getters: {
  },
  action: {

  },
  persist: {
    enabled: true, // 开启缓存  默认会存储在本地localstorage
    storage: sessionStorage, // 缓存使用方式
    paths:[] // 需要缓存键
  }
})

