<template>
  <div class="box">
    <div class="box-title">
      <p class="title">维修中心</p>
    </div>
    <div class="content_2">
      <div class="correct">
        <el-image style="width: 60px" :src="url" :fit="fit" />
      </div>
      <div class="step-content">
          <div class="step-title">{{ steps[status].title }}</div>
          <div class="step-description">{{ steps[status].description }}</div>
        </div>
      <div>
        <el-button class="lef_btn" v-if="status === 4" @click="printResult">打印结果</el-button>
        <el-button class="lef_btn" v-else @click="toInfo">查看详情</el-button>
        <el-button class="next" @click="backToList">返回列表</el-button>
      </div>
    </div>
    <div class="middle">
      <Steps v-bind:steps="steps"></Steps>
    </div>
    <div class="bottom">
      <div class="content-bottom">
        <div class="box-reminder">
          <div class="reminder">
            <div class="top">
              <el-avatar :fit="fit" :size="35" :src = way.avatar />
              <span class="top_name">{{ way.author }}</span>
            </div>
            <div class="analyse ">
              <Tabs v-model="activeTab" class="custom-tabs">
                <TabPane label="分析结果" name="name1" >
                  <el-card class="box-card" shadow="hover">
                    <template #header>
                      <div class="card-header" >
                        <span><i class="fa fa-dot-circle-o"></i>&nbsp;&nbsp;&nbsp;分析结果</span>
                      </div>
                    </template>
                    <div class="box-table">
                      <Table class="t-table" :columns="data.columns" :data="data.data"></Table>
                    </div>
                  </el-card>
                  <el-card class="box-card" shadow="hover">
                    <template #header>
                      <div class="card-header" >
                        <span><i class="fa fa-dot-circle-o"></i>&nbsp;&nbsp;&nbsp;分析结果</span>
                      </div>
                    </template>
                    <div style="padding-top:50px;">
                      <RadarChart  style="margin: 0 auto;"/>
                      <Bubble />
                    </div>
                  </el-card>
                </TabPane>
                <TabPane label="解决方案" name="name2">
                  <div class="right">
                    <el-drawer
                      v-model="drawVisible"
                      title="重新上传分析"
                      width="35%">
                      <el-form
                        class="show"
                        ref="addForm"
                        :model="form"
                        label-width="auto"
                        label-position="left"
                      >
                        <el-form-item label="数据集上传" prop="name">
                          <div class="form-update">
                            <Upload multiple type="drag" action="" :before-upload="beforeUpload">
                              <div style="padding: 20px 20px">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>Click or drag files here to upload</p>
                              </div>
                            </Upload>
                          </div>
                        </el-form-item>
                        <el-form-item label="分析描述" prop="status" :required="true">
                          <el-input v-model="form.name" type="textarea" :autosize="{ minRows: 5, maxRows: 5}"></el-input>
                        </el-form-item>
                      </el-form>
                      <template #footer>
                        <span class="dialog-footer">
                          <el-button @click="drawVisible = false">取 消</el-button>
                          <el-button type="primary" @click="handleAnalysis">确 定</el-button>
                        </span>
                      </template>
                    </el-drawer>
                    <Alert show-icon class="alert">
                      提示
                      <template #icon>
                          <Icon type="ios-bulb-outline"></Icon>
                      </template>
                      <template #desc>感谢提供的关于解决故障的详细信息。用户可以参考系统推荐的相似历史故障的解决方案，解决自己的故障</template>
                    </Alert>
                    <el-card class="card" shadow="hover">
                      <template #header>
                        <div class="card-header-2" >
                          <div>
                            <span><i class='fa fa-dot-circle-o'></i>&nbsp;&nbsp;&nbsp;解决方案</span>
                          </div>
                          <div class="card-header-2-right">
                            <span style="cursor: pointer;" @click="likeChange">
                              <i :class="way.flag === false ? 'fa fa-thumbs-o-up' : 'fa fa-thumbs-up'" @click="likeChange"></i> {{ way.like }}
                            </span>
                            <span class="top_date">{{ way.date }}</span>
                          </div>
                        </div>
                      </template>
                      <div class="fault small-div-body" v-if="valueHtml === null">
                        <el-empty description="未找到解决方案" image-size="90" v-if="valueHtml === ''">
                          <el-button type="primary" @click="handleAnalysis">重新上传分析</el-button>
                        </el-empty>
                      </div>
                      <!-- 展示已经写完的内容 -->
                      <!-- <div v-else v-html="valueHtml" class="way"></div> -->
                      <div class="info-content" v-else>
                        <Editor
                          style="height: 500px; width: 100%; overflow-x: hidden;"
                          v-model="valueHtml"
                          :defaultConfig="editorConfig"
                          :mode="mode"
                          @onCreated="handleCreated"/>
                      </div>
                    </el-card>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { ref, reactive, onMounted, computed, shallowRef, onBeforeMount } from 'vue';
import MyTimeLine from '../../components/MyTimeLine.vue';
import Steps from '../../components/Steps.vue';
import RadarChart from '../../components/chart/RadarChart.vue'
import Bubble from '../../components/chart/Bubble.vue';
import avatar from '../../assets/icon/head/羊1.png'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const status = ref(2);
let way = reactive({
  author: null,
  avatar: null,
  date: null,
  view: 0,
  like: 0,
  flag: false,
  way: null,
  detail: null,
});
const url = ref('src/assets/image/correct.svg');
const form = reactive({
    order: '',
    name: '',
    createTime: ref(new Date()),
    provCityCounty: null,
    address: null,
    status: null,
  },
);
const steps = reactive([
  {
    title: '上传故障集',
    description: '进行重新分析',
    status: 'completed',
  },
  {
    title: '人员分析中',
    description: '请耐心等待哦',
    status: 'completed',
  },
  {
    title: '完成',
    description: '重新分析完成',
    status: 'completed',
  },
]);
const data = reactive({
  name:'',
  introduce:'',
  columns: [
      {
          title: '故障标签',
          key: 'value'
      },
      {
          title: '数量',
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
});
// 内容 HTML
let valueHtml = ref('');
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const editorConfig = {readOnly: true }

onBeforeMount(() => {
  // const editor = editorRef.value
  // if (editor == null) return
  // editor.destroy()
  way.author = JSON.parse(route.query.value).author;
  way.avatar = JSON.parse(route.query.value).avatar;
  way.date = JSON.parse(route.query.value).date;
  way.view  = JSON.parse(route.query.value).view;
  way.like = JSON.parse(route.query.value).like;
  way.flag = JSON.parse(route.query.value).flag;
  way.way = JSON.parse(route.query.value).way;
  way.detail = JSON.parse(route.query.value).detail;
})

onMounted(() => {
  valueHtml.value = way.detail;
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const backToList = () => {
  router.push({
    path:'/detail', 
    query:{id: route.query.id}
  })
}

const likeChange = () => {
  if(way.flag === false){
    way.like++;
  }else{
    way.like--;
  }
  way.flag = !way.flag;
}

const printResult = () => {

}
const toInfo = () => {

}
</script>
<style lang="less" scoped>
/deep/code{
  // text-align: left;
  // word-wrap:break-word;
  // word-break: break-all;
  
white-space: normal;
word-break: break-all;
}
.box{
  flex-direction: column;
  box-sizing: border-box;
  position: sticky;
  top:0;
  width:100%;
  // height: 190vh;
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
}
.box-card{
  margin: 10px 0 10px 0;
  .card-header {
    text-align: left;
  }
}


.header {
  display: flex;
  justify-content: space-between;
}
.middle{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
}
.bottom {
  display: flex;
  flex-direction: column;
}
.content {
  background-color: #fff;
  display: flex;
  gap: 50px;
  padding: 40px 50px;
  .correct{
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
.form{
  flex: 1;
  gap: 10px;
}
.next {
  background-color: rgb(34,101,255);
  color: #fff;
}

.content-bottom {
  width: 100%;
  display: flex;
  gap: 25px;
  padding: 0 20% 0 20%;
  flex-direction: column;

  .left {
    flex: 1;
    display: flex;
    gap: 25px;
    flex-direction: column;
    height: 100%;
  }

  .right {
    flex: 1;
    display: flex;
    gap: 10px;
    flex-direction: column;
    height: 100%;

    .form-update{
      width: 100%;
      border: 1px solid #dcdfe6 ;
      padding: 10px;
      border-radius: 4px;
    }
  }

  .card {
    margin: 0 0 20px 0;
    .card-header-2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 10px;

      .card-header-2-right span {
        display: inline-block;
        width: 80px;
      }
      
      .alert {
        font-size: 10px;
      }

      span {
        width: 100px;
      }
    }

    .small-div-body {
      padding: 20px;
      padding-top: 0;
      font-size: 15px;
      font-weight: 400;
      color: #666666;
      line-height: 30px;
    }

    .fault {
      max-height: 300px;
      text-align: left;
      overflow: auto;
    }
    .way {
      text-align: left;
      white-space:"pre-wrap";
      font-size: 14px;
      padding: 10px;
    }

    // .info-content{
    //   // margin-left: -30px;
    //   box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.06);
    //   border: 1px solid #ccc;
    //   width: 100%;
    //   .editor {
    //     width: 100%;
    //     height: 500px;
    //     box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.06)
    //   }
    // }
  }
}

.box-reminder{
    .reminder{
      text-align: left;
    }
    .top {
      display: flex;
      align-items: center;
    }

    .top_name {
      min-width: 90px;
      word-break: break-all;
      font-size: 16px;
      font-weight: 600;
    }

    .top_date {
      font-size: 14px;
      font-weight: 500;
    }
    .el-avatar {
      margin-right: 10px; /* 根据需要调整元素之间的间距 */
    }
    .top p{
      margin:3px 10px;
      font-size:16px;
      font-weight:bold;
    }

    .analyse{
      margin-top: 35px;
    }
  }

  // 美化滚动条
::-webkit-scrollbar {
  width: 3px;
  height: 10px;
}

::-webkit-scrollbar-track {
  width: 2px;
  background: rgba(#101F1C, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(144,147,153,.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color .3s;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144,147,153,.3);
}
</style>
<style src="src/assets/style/base.scss"></style>
