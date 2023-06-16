<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-12 22:49:14
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-06-14 20:32:42
 * @FilePath: \maintenance\src\components\data\Column.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="box">
    <h3>柱子</h3>
    <div>
      <!-- <BarChart /> -->
      <Bar />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import axios from "axios";
import { useRoute, useRouter } from 'vue-router';
import BarChart from '../chart/bar/BarChart.vue';
import Bar from '../chart/BarGraph.vue'

/**
* 仓库
*/
const store = useStore();
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const data = reactive({})



onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  axios.post("/echarts/bar").then((res) => {
    console.log("测试数据", res);
  });
  
})
watchEffect(()=>{
})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='less'>
</style>
