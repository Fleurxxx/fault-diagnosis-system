<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-05-31 15:25:57
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-01 23:33:01
 * @FilePath: \maintenance\src\views\home\Index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 首页 -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <el-affix >
          <Header></Header>
        </el-affix>
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
          <!-- <div>
            <GlobalFooter :links="links" :copyright="copyright" />
          </div> -->
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
// console.log("当前路由信息:")
// console.log(route.matched)
/**
* 路由实例
*/
const router = useRouter();
// console.log("当前路由的匹配记录:")
// console.log(router.currentRoute.value.matched)


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
    // console.log("这是当前的路径信息：")
    // console.log(data.breadList)
}
getMatched()

//页脚
const links = reactive([
    {
        key: '帮助',
        title: '帮助',
        href: 'https://www.iviewui.com',
        blankTarget: true
    },
    {
        key: 'github',
        icon: 'logo-github',
        href: 'https://github.com/view-design/ViewUIPlus',
        blankTarget: true
    },
    {
        key: '条款',
        title: '条款',
        href: '',
        blankTarget: true
    }
])
const copyright = ref('Copyright © 2023 起舞队')


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
//使用Container布局容器时侧栏固定，header固定，main主体内容多时可以滑动
.el-main {
  // 181px为顶部header高度+底部footer高度
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>
