<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-03-06 18:52:09
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-06-01 00:51:50
 * @FilePath: \oss-backstage\src\components\Header.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="header-container">
        <div>
            <img class="Logo" src="../assets/image/logo.jpg" alt="">
        </div>
        <div class="l-content">
            <div class="h-6" />
        </div>
        <div class="r-content">
            <!--            头像-->
            <div class="flex-grow" />
            <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                          <img class="user" src="../assets/icon/head/羊1.png">
                    </span>
                <template v-slot:dropdown>
                    <el-dropdown-menu >
                        <el-dropdown-item command="person" divided>个人主页</el-dropdown-item>
                        <el-dropdown-item command="exit" divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
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

const handleCommand = (cmditem) => {
  console.log(cmditem)
  if (!cmditem) {
      this.$message("菜单选项缺少command属性");
      return;
  }
  switch (cmditem) {
      case "person":
          this.$router.push("/home/person");
          break;
      case "exit":
          this.exitBut();
          break;
  }
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

    // .header-container{
    //     padding: 0 0px;
    // }
    /deep/.el-menu{
        width: 630px;
        .el-menu-item{
            width: 130px;
        }
    }
    .header-container{
        padding: 0 20px;
        background-color: #FFFFFFFF;
        box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, 0.08);
        // box-shadow: rgba(0, 0, 0, 0.06) 10px 10px ;
        border : 1px solid #FFFFFFFF;
        border-bottom-color: #e4dfd7;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .Logo{
            width:250px;
            padding-top: 0px;
            padding-left: 15px;
        }
        .l-content{
            position: relative;
            left: -100px;
        }
        .r-content{
            margin-right: 45px;
            .user{
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
    }
    .el-menu-demo{
        padding: 0;
    }
    .demo-basic {
        text-align: center;
    }
    .demo-basic .sub-title {
        margin-bottom: 10px;
        font-size: 14px;
        color: var(--el-text-color-secondary);
    }
    .demo-basic .demo-basic--circle,
    .demo-basic .demo-basic--square {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .demo-basic .block:not(:last-child) {
        border-right: 1px solid var(--el-border-color);
    }
    .demo-basic .block {
        flex: 1;
    }
    .demo-basic .el-col:not(:last-child) {
        border-right: 1px solid var(--el-border-color);
    }
    /*头像靠右侧*/
    .flex-grow {
        flex-grow: 1;
    }

</style>
