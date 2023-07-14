<template>
    <div class="aside-box">
          <!--        左侧选项栏       -->
          <el-row class="tac">
              <el-col :span="15">
                  <el-aside width="260px">
                      <el-menu router
                               :default-active="this.$router.path"
                               class="el-menu-vertical-demo"
                               @open="handleOpen"
                               @close="handleClose"
                               style="
                                min-height: 90%;
                                box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, 0.06);
                                "
                      >
                          <!--      LOGO     -->
                          <!-- <div class="a-title-box">
                              <img class="a-title" src="../assets/img/云服务器.png">
                          </div> -->

                          <el-menu-item index="/home">
                              {{"\xa0\xa0"}}<i class="fa fa-home"></i>{{"\xa0\xa0"}}
                              <span>首页</span>
                          </el-menu-item>
                          <el-menu-item index="/spectaculars">
                              {{"\xa0\xa0"}}<i class="fa fa-bar-chart"></i>{{"\xa0\xa0"}}
                              <span>数据看板</span>
                          </el-menu-item>
                          <el-sub-menu index="2">
                              <template #title>
                                  {{"\xa0\xa0"}}<i class="fa fa-codepen"></i>{{"\xa0\xa0"}}
                                  <span>分类模型管理</span>
                              </template>
                              <el-menu-item index="/model">{{"\xa0\xa0\xa0\xa0"}}<i class="fa fa-object-group"></i>{{"\xa0\xa0"}}在线训练</el-menu-item>
                              <el-menu-item index="/management">{{"\xa0\xa0\xa0\xa0"}}<i class="fa fa-list-alt"></i>{{"\xa0\xa0"}}模型管理</el-menu-item>
                          </el-sub-menu>
                          <el-sub-menu index="3">
                              <template #title>
                                  {{"\xa0\xa0"}}<i class="fa fa-medkit"></i>{{"\xa0\xa0"}}
                                  <span>故障诊断</span>
                              </template>
                              <el-menu-item index="/diagnose">{{"\xa0\xa0\xa0\xa0"}}<i class="fa fa-github-alt"></i>{{"\xa0\xa0"}}在线诊断</el-menu-item>
                              <el-menu-item index="/history">{{"\xa0\xa0\xa0\xa0"}}<i class="fa fa-th-list"></i>{{"\xa0\xa0"}}历史记录</el-menu-item>
                          </el-sub-menu>
                          <el-sub-menu index="4">
                              <template #title>
                                  {{"\xa0\xa0"}}<i class="fa fa-hospital-o"></i>{{"\xa0\xa0"}}
                                  <span>故障维修</span>
                              </template>
                              <el-menu-item index="/center">{{"\xa0\xa0\xa0\xa0"}}<i class="fa fa-delicious"></i>{{"\xa0\xa0"}}维修中心</el-menu-item>
                              <el-menu-item index="/maintain">{{"\xa0\xa0\xa0\xa0"}}<i class="fa fa-wpforms"></i>{{"\xa0\xa0"}}维修记录</el-menu-item>
                          </el-sub-menu>
                          <el-sub-menu index="5">
                              <template #title>
                                  {{"\xa0\xa0"}}<i class="fa fa-gear"></i>{{"\xa0\xa0"}}
                                  <span>系统管理</span>
                              </template>
                              <el-menu-item index="/users">{{"\xa0\xa0\xa0\xa0"}}<i class="fa fa-users"></i>{{"\xa0\xa0"}}个人资料</el-menu-item>
                          </el-sub-menu>
                      </el-menu>
                  </el-aside>
              </el-col>
          </el-row>
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
  .aside-box{
    height: 100%;
  }

  /*左侧导航栏*/
  .el-menu-vertical-demo {
          width: 250px;
          height: 100%;
          border: 0 !important; /*垂直时，去除右侧白边*/
      }
      .a-title-box{
          background-color:#fff;
      }
      .a-title{
          margin-top: 45px;
          width: 50px;
      }
      .el-menu{
          height: 91vh;
      }
      .el-aside::-webkit-scrollbar {
          display: none;
      }

  </style>
