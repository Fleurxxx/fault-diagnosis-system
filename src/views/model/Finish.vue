
<template>
  <div class="box">
    <div class="box-title">
      <p class="title">在线训练</p>
    </div>
    <div class="box-reminder">
      <div class="reminder">
        <p class="title">操作指导</p>
        <p>1. 填写模型信息并上传数据集</p>
        <p>2. 进行在线数据分析，若数据异常请及时进行数据矫正。</p>
        <p>3. 模型训练完成，下载训练模型。</p>
      </div>
    </div>
    <div class="box-table">
      <div class="container">
        <img src="../../assets/image/成功.png" alt="Image" class="center-image">
        <div class="text">
          <div class="line1">训练完成</div>
          <div class="line2">模型训练成功</div>
        </div>
        <div class="text">
          <el-button @click="back()" style="width: 80px;">查看详情</el-button>
          <el-button type="primary" @click="submit()" style="width: 80px;">下载模型</el-button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import  {Message} from 'view-ui-plus'
import { ElMessageBox,ElMessage } from 'element-plus';
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
const data = reactive({
  name:'',
  introduce:'',

})

const back =()=>{
  router.push({ path: "/info" });
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
    margin-top: 70px;

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



</style>
