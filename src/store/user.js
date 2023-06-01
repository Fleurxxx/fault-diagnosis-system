/*
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-05-31 19:26:02
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-05-31 19:28:12
 * @FilePath: \maintenance\src\store\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import { ref } from "vue";


export default defineStore('first', {
  state: () => {
    return {
			token: '',
      id:'',
      username:'',
      name:'测试用户'
		};
  },
  getters: {
  },
  action: {

  }
})

