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
          :rules="rules"
          :inline="true"
          :model="data"
          ref="dataForm"
          v-loading="loading" element-loading-text="故障分析中...">
          <el-form-item label="故障状态"  prop="status" class="form-input" :required="true" style="line-height: 30px;">
            <el-radio-group v-model="data.status" class="input">
              <el-radio label="true" size="large">已解决</el-radio>
              <el-radio label="false" size="large">未解决</el-radio>
            </el-radio-group>
          </el-form-item>
          <div style="margin: 20px 0" />
          <el-form-item label="故障集文件"  class="form-input" :required="true" style="margin-left:-500px">
            <el-button  round  :class="button1Class" @click="change(1)">文件上传</el-button>
            <el-button round :class="button2Class"  @click="change(2)">手动上传</el-button>
          </el-form-item><br/>
          <div class="form-update">
            <Files v-if="data.cutNum===1" @fileInfo="fileInfo" />
            <hand v-else />
          </div>
        </el-form>
      </div>
    </div>
    <div>
      <el-button class="lef_btn" @click="backToList">返回列表</el-button>
      <el-button class="next" @click="next(dataForm)">下一步</el-button>
      </div>
  </div>
</template>
<script setup>
import { ElMessage, ElNotification } from 'element-plus';
import { ref, reactive, onMounted, computed } from 'vue';
import MyTimeLine from '../../components/MyTimeLine.vue';
import Steps from '../../components/Steps.vue';
import Files from '../../components/updata/Files.vue'
import Hand from '../../components/updata/Hand.vue'
import { useRouter, useRoute } from "vue-router";
import apiFun from '../../api/api';
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
    description: '请尽快完成',
    status: 'uncompleted',
  },
  {
    title: '完成',
    description: '重新分析完成',
    status: 'uncompleted',
  },
]);
const data = reactive({
  status: '',
  cutNum:1,
  fileInfo:{},
});
const dataForm = reactive(null);
const loading = ref(false)
const button1Class = ref('edit');
const button2Class = ref('white-color');
const validateData = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("该项不能为空"));
  }else{
    callback()
  }
}
const rules = reactive({
    name: [
      { validator: validateData , trigger: "blur" },
      { required: true, message: '请输入故障集名称', trigger: 'blur'}
    ],
    status: [
      { validator: validateData , trigger: "blur" },
      { required: true, message: '请输入故障状态', trigger: 'blur'}
    ],
    status: [
      { validator: validateData , trigger: "blur" },
      { required: true, message: '请输入故障状态', trigger: 'blur'}
    ]
})

onMounted(() => {
})

let change = (num) =>{
  data.cutNum = num
  if (num === 1) {
    button1Class.value = 'edit';
    button2Class.value = 'white-color';
  } else if (num === 2) {
    button1Class.value = 'white-color';
    button2Class.value = 'edit';
  }
}
function fileInfo(val){
  data.fileInfo = val
}

const next = async(dataForm) =>{
  await dataForm.validate((valid,fields) => {
    if (valid) {
      let param = {
        failureId: route.query.id,
        fileName: data.fileInfo.fileName,
        url: data.fileInfo.url,
        size: data.fileInfo.size,
        isSolve: data.status,
      }
      console.log(param)
      if(param.url === undefined){
        ElNotification({
          title: '尚未上传数据集',
          message: '请上传数据集后再进行下一步此操作',
          type: 'warning',
        })
      }else{
        loading.value = true;
        apiFun.repair.reanalysis(param).then((res)=>{
          console.log(res)
          if(res.code===200){
            loading.value = false;
            // router.push({
            //   path:'/record', 
            //   query:{id: route.query.id}
            // })
          }else{
            ElMessage.error(res.message);
            loading.value = false;
          }
        }).catch((err)=>{
          console.log(err);
        });
      }
    }else{
      ElMessage.warning('请将表格填写完整');
    }
  });
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
