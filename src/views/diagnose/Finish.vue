
<template>
  <div class="box">
    <div class="box-title">
      <p class="title">在线诊断</p>
    </div>
    <div class="box-reminder">
      <Steps v-bind:steps="steps"/>
    </div>
    <div class="box-table">
      <p class="t-title">训练结果：</p>
      <Table class="t-table" :columns="data.columns" :data="data.data"></Table>
    </div>
    <div class="box-table">
      <p class="t-title">结果集：</p>
      <Button :size="buttonSize" class="t-but" icon="ios-download-outline" type="primary">结果下载</Button>
      <div class="t-json">
        <json-viewer
              :value="data.jsonData"
              :expand-depth="5"
              class="viewer"
              copyable
              boxed
              sort
              :expanded="expanded"
              :key="expanded"
            ></json-viewer>

        </div>
      <!-- <div class="container">
        <img src="../../assets/image/成功.png" alt="Image" class="center-image">
        <div class="text">
          <div class="line1">诊断完成</div>
          <div class="line2">模型诊断成功</div>
        </div>
        <div class="text">
          <el-button @click="back()" style="width: 80px;">查看详情</el-button>
          <el-button type="primary" @click="submit()" style="width: 80px;">下载模型</el-button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import  {Message} from 'view-ui-plus'
import { ElMessageBox,ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import Steps from '../../components/Steps.vue';
import axios from 'axios';

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
const data = reactive({
  name:'',
  introduce:'',
  columns: [
      {
          title: 'Value',
          key: 'value'
      },
      {
          title: 'Count',
          key: 'count'
      }
  ],
  data: [
      {
        value: '0',
        count: 322,
      },
      {
        value: '1',
        count: 341,
      },
      {
        value: '2',
        count: 327,
      },
      {
        value: '3',
        count: 307,
      },
      {
        value: '4',
        count: 389,
      },
      {
        value: '5',
        count: 328,
      }
  ]

})

const steps = reactive([
  {
    title: '数据上传',
    description: '上传诊断数据',
    status: 'uncompleted',
  },
  {
    title: '故障分析',
    description: '获取检测结果',
    status: 'uncompleted',
  },
  {
    title: '完成',
    description: '诊断完成',
    status: 'in-progress',
  },
]);

const initialize = () =>{
  axios.get('src/assets/result1.json')
      .then(response => {
        data.jsonData = response.data;
      })
      .catch(error => {
        console.error('Error retrieving JSON data:', error);
      });
}

const back =()=>{
  router.push({ path: "/info" });
}

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  initialize()
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
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.08);
  .box-title{
    float: left;
    padding-top: 22px;
    padding-left: 50px;
  }
  .title{
    font-size:18px;
    font-weight:bold;
  }
  .box-reminder{
    float: center;
    padding:5% 18% 0 18%;

    // background-color:rgba(184, 182, 182, 0.08);
    .reminder{
      padding: 13px 20px 20px 50px; //上右下左
      background-color: rgba(10, 10, 10, 0.064);
    }
  }
  .box-reminder p{
    text-align: left;
    line-height: 2;
  }

  .box-table{
    margin: 70px 220px 0 220px;

    .container {
      // display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .center-image{
      width:60px;
    }
    .text {
      margin-top: 20px;
      text-align: center;
    }
    .line1 {
      font-size: 18px;
      font-weight:bold;
      line-height: 1.5;
    }
    .line2 {
      font-size: 16px;
      line-height: 1.5;
    }

  }
}

.t-title{
  font-size: 18px;
  font-weight: bolder;
  padding-left: 5px;
  padding-bottom: 20px;
  text-align: left;
}
.t-table{
  margin-left: 80px;
  margin-right: 80px;
}
.t-but{
  position: absolute;
  top:576px;
  left: 303px;
}
.t-json{
  padding-left: 80px;
}
.viewer{
  width: 80%;
  min-width: 3.125rem;
  text-align: left;
  padding-left: 50px;
  padding-bottom: 30px;
}


</style>
