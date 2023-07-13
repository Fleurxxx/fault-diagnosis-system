<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-07-12 10:55:58
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-12 16:42:12
 * @FilePath: \maintenance\src\views\spectaculars\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="box">
    <div class="title-box">
      <p class="title">数据看板</p>
    </div>
    <div class="box-content">
      <Tabs value="name1">
          <TabPane label="历史趋势分析" name="name1">
            <div style="height: 20px;" ></div>
            <HistoricalData />
          </TabPane>
          <TabPane label="历史模型准确度" name="name2">
            <div style="height: 20px;" ></div>
            <Rate />
          </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import HistoricalData from './HistoricalData.vue';
import Rate from '../../components/chart/rate/Rate.vue'
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
.box{
  flex-direction: column;
  box-sizing: border-box;
  position: sticky;
  top:0;
  width:100%;
  height: 190vh;
  // height:100%;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.08);
  .title-box{
    text-align: left;
    padding-top: 22px;
    padding-left: 50px;

  }
 .title{
    font-size:18px;
    font-weight:bold;
  }
  .box-content{
    padding:20px 50px 0 50px;
  }
}
</style>
