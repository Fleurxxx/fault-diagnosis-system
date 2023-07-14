
<template>
  <div class="box">
    <div class="box-title">
      <p class="title">模型信息</p>
    </div>
    <div class="box-reminder">
      <div class="reminder">
        <div class="top">
          <el-avatar :fit="fit" :size="35" :src=headImg />
          <p v-if="showDate.isPublic">Fleurxxx · 更新于<Time :time="data.time" /> · 公开</p>
          <p v-else>Fleurxxx · 更新于<Time :time="data.time" /> · 私人</p>
        </div>
        <div class="info" >
            <h1>{{showDate.name}}</h1>
          <p @click="change('txt1')" class="cur"><i class="fa fa-pencil-square-o"></i> {{ showDate.introduce }}</p>
          <div class="info-tag">
            <el-tag v-for="(item, index) in tags" :key="index" :type="item.type" class="tags">{{ item.text }}</el-tag>
          </div>
        </div>
        <div class="analyse ">
          <Button class="analyse-but" type="primary" shape="circle" @click="download(data.modelDataSets.url,data.modelDataSets.fileName)">&nbsp;<Icon type="md-download" />&nbsp;下载（{{data.filesize}}）&nbsp;</Button>
          <Tabs v-model="activeTab" class="custom-tabs">
              <TabPane label="数据卡" name="name1" >
                <div style="height:20px;"></div>
                <DataCard  class="tab-card"/>
              </TabPane>
              <TabPane label="部署" name="name2">
                <!-- <Process /> -->
                <DeploymentSettings />
              </TabPane>
              <TabPane label="设置" name="name3">
                <div id="txt1" class="edit">
                  <h2 class="edit-title1">设置</h2>
                  <h3 class="edit-title2">基本信息</h3>
                  <div class="edit-content">
                    <el-form
                        label-width="100px"
                        ref="formlabelref"
                        :rules="rules"
                        :inline="true"
                        :model="formlabel"
                        class="con-form"
                    >
                        <el-form-item label="模型名称" prop="name" class="form-input" >
                            <el-input class="input"
                                      v-model="data.name"
                                      maxlength="30"
                                      placeholder="30个字符以内，必须使用中英文或者数字开头，支持小括号、短横线和空格"
                                      show-word-limit
                                      type="text"
                                    />
                        </el-form-item><br/>
                        <div style="margin: 20px 0" />
                        <el-form-item label="模型介绍"  prop="introduce" class="form-input" >
                            <el-input class="input"
                                      ref="myInput"
                                      v-model="data.introduce"
                                      maxlength="100"
                                      placeholder="请简单描述该模型"
                                      show-word-limit
                                      type="textarea"
                                    />
                        </el-form-item><br/>
                        <div style="margin: 10px 0" />
                        <el-form-item label="隐私设置"  prop="introduce" class="form-input" >
                          <div class="mb-2 flex items-center text-sm">
                            <el-radio-group v-model="data.radio" class="ml-4">
                              <el-radio label="1" size="large">公开</el-radio>
                              <el-radio label="0" size="large">私密</el-radio>
                            </el-radio-group>
                          </div>
                        </el-form-item><br/>
                        <el-form-item label="模型标签">
                          <el-tag
                                  v-for="tag in dynamicTags"
                                  :key="tag"
                                  class="ml-1"
                                  closable
                                  :disable-transitions="false"
                                  @close="handleClose(tag)"
                                >
                            {{ tag }}
                          </el-tag>
                          <el-input
                            v-if="inputVisible"
                            ref="InputRef"
                            v-model="inputValue"
                            class="ml-1 w-20 info-tag"
                            size="small"
                            @keyup.enter="handleInputConfirm"
                            @blur="handleInputConfirm"
                          />
                          <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                            + 新标签
                          </el-button>
                        </el-form-item>
                        <div style="margin: 30px 0" />
                        <el-form-item  class="form-button" >
                            <el-button type="primary" @click="submit(data)" style="width: 80px;">保存修改</el-button>
                        </el-form-item>
                    </el-form>
                  </div>
                </div>
              </TabPane>
              <TabPane label="版本" name="name4">
                <div class="hint">
                  <Version :showimg="true" v-model:modelId=data.modelId />
                </div>
              </TabPane>
          </Tabs>
        </div>

      </div>
    </div>
    <div class="box-table">

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, nextTick, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import  {Message} from 'view-ui-plus'
import { ElMessageBox,ElMessage,ElInput } from 'element-plus';
import ScrollIntoView from 'scroll-into-view-if-needed'
import { useRoute, useRouter } from 'vue-router';
import DataCard from '../../components/data/DataCard.vue'
import Version from '../../components/data/ModelVersion.vue'
import Process from '../../components/deployment/Process.vue'
import DeploymentSettings from '../../components/deployment/DeploymentSettings.vue'
import api from "../../api/api";
import headImg from '../../assets/icon/head/羊1.png'
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
const data = reactive({
  radio:"1",
  name:'模型数据1',
  introduce:'添加描述信息',
  filesize:'5MB',
  time: (new Date()).getTime() - 60 * 3 * 1000,
  isPublic:false,
  modelId: '',
  modelDataSets:{}
})
const showDate = reactive({
  name:'模型数据1',
  introduce:'添加描述信息',
  isPublic:false,
})


/* 文件大小数据转化 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const modelStore = modelstore();
//获取模型信息
function getModels() {
  console.log(modelStore.id)
  api.model.getModel(data.modelId).then((res)=>{
    console.log(res)
    if(res.code===200){
      showDate.name = res.data.name
      showDate.introduce = res.data.describe
      showDate.isPublic = res.data.isPublic
      data.name = res.data.name
      data.introduce = res.data.describe
      data.filesize = formatBytes(res.data.modelDataSets.size)
      data.isPublic = res.data.isPublic
      data.modelDataSets = res.data.modelDataSets
      if(res.data.isPublic===false){
        data.radio = "0"
      }else{
        data.radio = "1"
      }
      modelStore.name = data.name;
      modelStore.describe = data.introduce;
    }else{
      ElMessage.error(res.message)
    }
  }).catch((err)=>{
    console.log(err);
  })
}
// // 解构modelStore里面的变量和方法 toRefs作用是让解构出来的变量具有响应性
// const {id, name, describe} = toRefs(modelStore);




//修改模型信息
const submit =(index)=>{
  console.log(index)
  if(index.radio === "1"){
    index.isPublic = true
  }else{
    index.isPublic = false
  }
  let params = {
    name:index.name,
    describe:index.introduce,
    isPublic:index.isPublic,
    id:index.modelId,

  }
  api.model.submitInfo(params).then((res)=>{
    console.log(res)
    if(res.code===200){
      ElMessage({
        message: '保存成功',
        type: 'success',
      })
      getModels()
      // router.push({ path: "/info" });
    }else{
      ElMessage.error(res.message)
    }
  }).catch((err)=>{
    console.log(err);
  })

}

//简介跳转
const myInput = ref(null);
const activeTab = ref('name1')
const change = (index) => {
  // 在跳转后等待一段时间，以确保页面滚动完成
  setTimeout(() => {
    activeTab.value = 'name3'

  }, 100);
  // //平滑定位跳转
  // document?.getElementById(index)?.scrollIntoView({
  //   behavior: "smooth", //smooth:平滑，auto：直接定位
  //   block: "start",
  //   inline: "start",
  // });
  //聚焦输入框
  nextTick(() => {
        myInput.value.focus();
  });

};


//下载文件
const download = (fileUrl,fileName) =>{
  console.log(fileName)
  api.train.download(fileUrl,fileName).then((res)=>{
    console.log(res)
    const blob = new Blob([res]);
    const elink = document.createElement('a');
    elink.download = fileName;
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
    // ElMessage({
    //   message: '下载成功',
    //   type: 'success',
    // })
  }).catch((err)=>{
    console.log(err);
  })
}



/**
 * 标签
 */
const tags = ref([
  { text: '标签1', type: 'success' },
  { text: '标签2', type: 'info' },
  { text: '标签3', type: 'warning' },
  { text: '标签4', type: 'danger' },
])
const inputValue = ref('')
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const InputRef = ref()

//删除标签
const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)

}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  console.log(modelStore.id)
  data.modelId = modelStore.id
  getModels()
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
  // height: 190vh;
  // height:100%;
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
    padding:5% 12% 0 14%;
    .reminder{
      text-align: left;
    }
    .top {
      display: flex;
      align-items: center;
    }
    .el-avatar {
      margin-right: 10px; /* 根据需要调整元素之间的间距 */
    }
    .top p{
      margin:3px 10px;
      font-size:16px;
      font-weight:bold;
    }

    .info{
      margin-top: 90px;
    }
    .info p{
      padding-top: 35px;
    }
    .info-tag{
      padding-top: 20px;
      .tags{
        margin-right: 10px;
      }

    .info-tag{
      padding-top: 20px;
      .tags{
        margin-right: 10px;
      }

    }
    .el-tag.is-closable {
        margin-right: 10px;
    }

    .analyse{
      margin-top: 35px;
      // position: relative;
      .analyse-but{
        position: absolute;
        right: 20%;
        z-index:10;
      }
      .tab-card{
        box-shadow:0 0 0 #fff; /*去掉阴影 */;
      }
    }
    .hint{
      float: center;
      padding:5% 3% 0 3%;
      // background-color:rgba(184, 182, 182, 0.08);
      .hint-reminder{
        padding: 13px 20px 60px 30px; //上右下左
        background-color: rgba(10, 10, 10, 0.054);
        .hint-left{
          width:40%;
          height:100%;
          float: left;
          margin-right: -70px;
          .hint-img{
              width:200px;
            }
        }
        .hint-right{
          display: flex;
        }
        .hint-content{
          flex-direction:column;
          padding: 30px 0 0px 0;
          .hint-progress{
            width: 650px;
            padding: 10px 0 10px 0;
          }
        }

      }
    }

  }

  .cur{
    cursor: pointer; /*鼠标悬停变小手*/
  }
  .box-reminder h1{

    line-height: 2;
  }

  .box-table{
    margin-top: 50px;


  }
  .edit{
    margin-top: 40px;
    margin-left: 15px;
    .edit-title1{
      margin-bottom: 40px;;
    }
    .edit-title2{
      margin-bottom: 20px;;
    }
    .edit-content{
      margin-left: -30px;
      .input{
        width:400px;
      }
    }
    .form-button{
      margin-left: 420px;
    }
  }
  }
}

/deep/.step-line {
  margin-top:20px;
  width: 50px;
}


</style>