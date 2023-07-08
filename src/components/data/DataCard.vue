<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-05 22:52:58
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-08 01:37:14
 * @FilePath: \maintenance\src\components\DataCard.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="box">
    <span @click="goUpdate" class="cur uppdate" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-superpowers" >&nbsp;&nbsp;更新数据集</i></span>
    <Tabs value="name2">
        <!-- <TabPane label="详细" name="name1">
          标签一的内容
        </TabPane> -->
        <TabPane label="简洁" name="name2">
          <Data />
        </TabPane>
        <TabPane label="图示分析" name="name3">
          <Column />
        </TabPane>
    </Tabs>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Column from './Column.vue'
import Data from './Data.vue'
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

//跳转到更新页面
const goUpdate = () =>{
  router.push({ path: "/info/update" });
}


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
  height: 100%;
}
.cur{
  cursor: pointer; /*鼠标悬停变小手*/
}
.uppdate{
  position: absolute;
  right: 130px;
  z-index:999;
}
</style>
