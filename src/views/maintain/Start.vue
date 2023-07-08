<template>
  <div class="box">
    <div class="box-title">
      <p class="title">维修中心</p>
    </div>
    <div class="middle">
      <Steps v-bind:steps="steps"></Steps>
    </div>
    <div class="bottom">
      <div class="box-form">
        <el-form
          label-width="100px"
          ref="formlabelref"
          :rules="rules"
          :inline="true"
          :model="formlabel"
          v-loading="loading" element-loading-text="故障分析中...">
          <el-form-item label="故障集名称" prop="name" class="form-input" :required="true">
            <el-input class="input"
              v-model="data.name"
              maxlength="30"
              placeholder="30个字符以内，必须使用中英文或者数字开头，支持小括号、短横线和空格"
              show-word-limit
              type="text"/>
          </el-form-item><br/>
          <div style="margin: 20px 0" />
          <el-form-item label="状态"  prop="name" class="form-input" :required="true" style="line-height: 30px;">
            <el-radio-group v-model="data.name" class="input">
              <el-radio label="1" size="large">已解决</el-radio>
              <el-radio label="2" size="large">未解决</el-radio>
            </el-radio-group>
          </el-form-item>
          <div style="margin: 20px 0" />
          <el-form-item label="故障集文件"  class="form-input" :required="true" style="margin-left:-500px">
            <el-button  round  :class="button1Class" @click="change(1)">文件上传</el-button>
            <el-button round :class="button2Class"  @click="change(2)">手动上传</el-button>
          </el-form-item><br/>
          <div class="form-update">
            <router-view ></router-view>
          </div>
        </el-form>
      </div>
    </div>
    <div>
      <el-button class="lef_btn" @click="backToList">返回列表</el-button>
      <el-button class="next" @click="next">下一步</el-button>
      </div>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { ref, reactive, onMounted, computed } from 'vue';
import MyTimeLine from '../../components/MyTimeLine.vue';
import Steps from '../../components/Steps.vue';
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const steps = reactive([
  {
    title: '上传故障集',
    description: '进行重新分析',
    status: 'in-progress',
  },
  {
    title: '人员分析中',
    description: '请耐心等待哦',
    status: 'uncompleted',
  },
  {
    title: '完成',
    description: '重新分析完成',
    status: 'uncompleted',
  },
]);
const data = reactive({
  name:'',
  introduce:'',
  centerDialogVisible : false,
})
const loading = ref(false)
const button1Class = ref('edit');
const button2Class = ref('white-color');

onMounted(() => {
})

const change = (buttonNumber) =>{
  if (buttonNumber === 1) {
    button1Class.value = 'edit';
    button2Class.value = 'white-color';
    router.push({ path: "/start/upfile", 
      query:{id: route.query.id}
    });
  } else if (buttonNumber === 2) {
    button1Class.value = 'white-color';
    button2Class.value = 'edit';
    router.push({ path: "/start/paste", 
      query:{id: route.query.id}
    });
  }
}
const next = () => {
  router.push({
    path:'/record', 
    query:{id: route.query.id}
  })
}
const backToList = () => {
  router.push({
    path:'/detail', 
    query:{id: route.query.id}
  })
}
//获取所有订单
const orderFocus = () => {

}
const printResult = () => {

}
const toInfo = () => {

}
</script>
<style lang="less" scoped>
.box{
  flex-direction: column;
  box-sizing: border-box;
  position: sticky;
  top:0;
  width:100%;
  height: 190vh;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.08);
  .box-title{
    text-align: left;
    padding-top: 22px;
    padding-left: 50px;
  }
  .title{
    font-size:18px;
    font-weight:bold;
  }
  .bottom {
    display: flex;
    flex-direction: column;

    .box-form{
      // margin-top: 70px;
      .form-input{
        text-align:left;
        .input{
          width: 690px;
          display: flex;
          background-color: #fff;
          padding: 0 0 0 10px;
        }
      }
      .form-update{
        padding: 10px 40px 10px 40px;
      }
      .form-button{
        margin-top:20px;
      }
    }
  }
  
}
.middle{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
}

.content_2{
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 70px;
  .correct{
    margin-bottom: 10px;
  }
  .step-content {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .step-title {
    font-size: 16px;
    margin-bottom: 5px;
    color: #000;
    font-weight: bold;
  }
  .step-description {
    font-size: 14px;
    color: #888;
  }
  .lef_btn{
    background-color: rgb(247,248,250);
    border: rgb(247,248,250);
    color: rgb(96, 98, 102);
  }
}
h3{
  font-weight: 540;
}
.next {
  background-color: rgb(34,101,255);
  color: #fff;
}

.edit {
  color: #fff;
  background-color: rgb(191, 194, 197);
  border-color: rgb(191, 194, 197);
  margin: 0 0 0 10px;
}
.edit:hover,
.edit:focus {
  background: var(--el-button-hover-color);
  border-color: var(--el-button-hover-color);
  color: var(--el-button-font-color);
}
.white-color {
  // background-color: white; /* 白色按钮颜色 */
}
</style>
<style src="src/assets/style/base.scss"></style>
