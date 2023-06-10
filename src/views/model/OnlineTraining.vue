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
    <div class="box-form">
      <el-form
            label-width="100px"
            ref="formlabelref"
            :rules="rules"
            :inline="true"
            :model="formlabel"
            class="con-form"
        >
            <!-- <el-form-item label="登录名称" prop="name">
                <el-input v-model="data.loginame" style="width: 350px;">
                  <template #suffix>
                    <span style="border: none;">@8475738355324.cloudcan.com</span>
                  </template>
                </el-input>
            </el-form-item>
            <el-form-item label="标签"  prop="">
              <p>未绑定标签</p>{{"\xa0\xa0"}}
              <el-icon  @click="edit" style="cursor:pointer;"><EditPen /></el-icon>
            </el-form-item>
            <div class="mb-2 flex items-center text-sm ">
              <el-radio-group v-model="radio" class="ml-4 radio-container">
                <el-radio label="1" size="large">自动生成密码</el-radio>
                <el-radio label="2" size="large">自定义密码</el-radio>
              </el-radio-group>
            </div> -->
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
            </el-form-item><br/>
            <el-form-item label="模型介绍"  class="form-input" :required="true" style="margin-left:-500px">
              <el-button  round  :class="button1Class" @click="change(1)">文件上传</el-button>
              <el-button round :class="button2Class"  @click="change(2)">手动上传</el-button>
            </el-form-item><br/>
            <div class="form-update">
              <router-view ></router-view>
            </div>
            <el-form-item  class="form-button" >
                <el-button type="primary" @click="submit(data)" style="width: 80px;">下一步</el-button>
                <el-button @click="reset" style="width: 80px;">返回</el-button>
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
  centerDialogVisible : false,

})
const button1Class = ref('edit');
const button2Class = ref('white-color');

let change = (buttonNumber) =>{
  if (buttonNumber === 1) {
    button1Class.value = 'edit';
    button2Class.value = 'white-color';
    router.push({ path: "/model/upfile" });
  } else if (buttonNumber === 2) {
    button1Class.value = 'white-color';
    button2Class.value = 'edit';
    router.push({ path: "/model/paste" });
  }
}




let submit = () =>{
  router.push({ path: "/analysis" });
// Message.error("错误");
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
.white-color {
  // background-color: white; /* 白色按钮颜色 */
}

//对话框
.dialog-footer button:first-child {
  margin-right: 10px;
}

</style>
