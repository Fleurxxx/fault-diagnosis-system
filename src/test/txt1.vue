<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-11 21:04:16
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-15 20:34:28
 * @FilePath: \maintenance\src\test\txt1.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <txt3Vue />
  </div>
</template>

<script>
import * as echarts from 'echarts';
import txt3Vue from './txt3.vue';

export default {
  data(){
    return{

    }
  },
  methods: {
    async getCputhings() {
      const { data: res} = await serverCpu()
      this.serverInfo = res
    },
  },
  created() {
    this.getCputhings()
  },
  mounted() {

    this.timer = window.setInterval(() => {
      setTimeout(()=>{
        this.getCputhings()
      })
    }, 2000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }



};
</script>
<style scoped lang='less'>
.main{
  height: 100%;
  width:100%;
}
</style>
