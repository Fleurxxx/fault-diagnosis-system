<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-05-31 15:25:57
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-06-01 01:37:11
 * @FilePath: \maintenance\src\views\home\Index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 首页 -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="260px">
          <Aside></Aside>
        </el-aside>
        <el-main>
          <div class="bread">
            <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <template v-for="(item, index) in data.breadList">
                    <el-breadcrumb-item
                        v-if="item.meta.title"
                        :key="index"
                        :to="{path: item.path}"
                    >{{ item.meta.title }}</el-breadcrumb-item>
                </template>
            </el-breadcrumb>
          </div>
          <router-view class="main"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watch, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Header from '../../components/Header1.vue'
import Aside from '../../components/Aside.vue'
/**
* 仓库
*/
const store = useStore();
/**
* 路由对象
*/
const route = useRoute();
console.log("当前路由信息:")
console.log(route.matched)
/**
* 路由实例
*/
const router = useRouter();
console.log("当前路由的匹配记录:")
console.log(router.currentRoute.value.matched)


//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/

const data = reactive({
    breadList:[]
})

//面包屑显示
const getMatched = () => {
    data.breadList = route.matched
    console.log("这是当前的路径信息：")
    console.log(data.breadList)
}
getMatched()


onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})

watch(() => router.currentRoute.value.path,(toPath) => {
  // 监听路径的改变,如果发生变化了，执行方法
  getMatched()
},{immediate: true,deep: true})

watchEffect(()=>{
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='less'>

/deep/.el-header {
        --el-header-padding: 0 0px;
    }
.common-layout{
        width: 100%;
        height: 100%;
        display: flex;//将容器的子元素垂直排列
        flex-direction: column;
        .container{
        height: 100% 
        }
        .bread{ //面包屑
          position:relative;
          padding-bottom:15px;
        }
        
  }
</style>
<style src="src/assets/style/base.scss"></style>