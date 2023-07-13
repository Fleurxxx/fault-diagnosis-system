<template>
  <div class="box">

    <div class="box-title">
      <p class="title">模型更新</p>
    </div>
    <div class="box-reminder">
      <div class="reminder">
        <p class="title">操作指导</p>
        <p>同先前步骤，重新上传数据集对模型进行训练优化。</p>
      </div>
    </div>
    <div class="box-form">
      <el-form
            label-width="100px"
            ref="fromData"
            :rules="rules"
            :inline="true"
            :model="data"
            class="con-form"
        >
            <el-form-item label="模型名称" prop="name" class="form-input" :required="true">
                <el-input class="input"
                          v-model="data.name"
                          maxlength="30"
                          placeholder="30个字符以内，必须使用中英文或者数字开头，支持小括号、短横线和空格"
                          show-word-limit
                          type="text"
                        />
            </el-form-item><br/>
            <div style="margin: 20px 0" />
            <el-form-item label="模型介绍"  prop="introduce" class="form-input" :required="true">
                <el-input class="input"
                          v-model="data.introduce"
                          maxlength="100"
                          placeholder="请简单描述该模型"
                          show-word-limit
                          type="textarea"
                        />
            </el-form-item>
            <div style="height: 15px;" />
            <el-form-item label="模型介绍"  class="form-input" :required="true" style="margin-left:-500px">
              <el-button  round  :class="button1Class" @click="change(1)">文件上传</el-button>
              <el-button round :class="button2Class"  @click="change(2)">手动上传</el-button>
            </el-form-item><br/>
            <div class="form-update">
              <Files v-if="data.cutNum===1" @fileInfo="fileInfo" />
              <hand v-else />
              <!-- <router-view ></router-view> -->
            </div>
            <el-form-item  class="form-button" >
                <el-button type="primary" @click="submit(fromData)" style="width: 80px;">下一步</el-button>
                <!-- <el-button @click="reset" style="width: 80px;">返回</el-button> -->
            </el-form-item>
        </el-form>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import  {Message} from 'view-ui-plus'
import { ElMessageBox,ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import api from "../../api/api";
import Files from '../../components/updata/Files.vue'
import Hand from '../../components/updata/Hand.vue'
import modelstore from "../../store/model.js";

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
const modelStore = modelstore();
const data = reactive({
  name:'',
  introduce:'',
  centerDialogVisible : false,
  cutNum:1,
  fileInfo:{},

})

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
      { required: true, message: '请输入模型名称', trigger: 'blur'}
    ],
    introduce: [
      { validator: validateData , trigger: "blur" },
      { required: true, message: '请输入模型名称', trigger: 'blur'}
    ]
})



const button1Class = ref('edit');
const button2Class = ref('white-color');


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
  console.log('子页面传值：',val)
  data.fileInfo = val
}

let fromData = reactive(null)
let submit = async(fromData) =>{
  await fromData.validate((valid,fields) => {
    if (valid) {
      let param = {
        modelId:data.modelId,
        name: data.name,
        describe: data.introduce,
        fileName: data.fileInfo.fileName,
        url: data.fileInfo.url,
        size: data.fileInfo.size,
      }
      // ElMessage.success("验证成功")
      console.log(param)
      api.train.submitForm(param).then((res)=>{
      console.log(res)
      if(res.code===200){
        router.push({ path: "/analysis" });
      }else{
        ElMessage.error(res.message)
      }
      }).catch((err)=>{
      console.log(err);
      })
    }
  });

// Message.error("错误");
}

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  data.modelId = modelStore.id;
  data.name = modelStore.name;
  data.introduce = modelStore.describe;
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

  .box-form{
    margin-top: 70px;
    .form-input{
      text-align:left;
      .input{
        width: 690px;
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

//修改el-input颜色
.edit {
  color: #fff;
  background-color: rgb(191, 194, 197);
  border-color: rgb(191, 194, 197);
}
.edit:hover,
.edit:focus {
  background: var(--el-button-hover-color);
  border-color: var(--el-button-hover-color);
  color: var(--el-button-font-color);
}
// .white-color {
//   // background-color: white; /* 白色按钮颜色 */
// }

//对话框
.dialog-footer button:first-child {
  margin-right: 10px;
}

</style>
