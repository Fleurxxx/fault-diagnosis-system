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
        <el-button class="next" @click="backToList">返回列表</el-button>
      </div>
    </div>
    <div class="middle">
      <Steps v-bind:steps="steps"></Steps>
    </div>
    <div class="bottom">
      <Tabs v-model="activeTab" class="custom-tabs">
        <TabPane label="相似故障" name="name1" >
          <div class="left">
            <div class="small-div-body fault" v-if="wayData.length === 0">
              <el-empty description="未找到历史解决办法" image-size="130">
              </el-empty>
            </div>
            <div class="small-div-body fault" v-else>
              <div>
                <el-table
                  :data="wayData"
                  @selection-change="handleSelectionChange"
                  style="width: 100%"
                  :header-cell-style="{background: 'rgb(242,243,245)', color: 'rgb(0,0,71)', fonsSize: '22px', height: '60px'}"
                  :cell-style="{color: 'rgb(85,68,85)', fontWeight: '350', fonsSize: '18px',}"
                  :row-style="{height: '50px'}">
                  <el-table-column prop="way" label="解决方案" :formatter="format"/>
                  <el-table-column fixed="right" label="操作" width="120">
                    <template v-slot="scope">
                      <el-button link type="primary" @click="handleCheck(scope.row)">
                        <el-icon><View /></el-icon> 查看
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="pager">
                <el-pagination
                  :current-page="currentPage"
                  :page-size="pageSize"
                  layout="total, prev, pager, next"
                  :total="totalNum"
                  @current-change="handleCurrentChange"/>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane label="修复中心" name="name2">
          <div class="right">
            <div class="info">
              <Alert show-icon class="alert">
                提示
                <template #icon>
                    <Icon type="ios-bulb-outline"></Icon>
                </template>
                <template #desc>为了帮助我们共同改进和学习，需要您提供一些关于您解决故障的详细信息，填写以下内容时尽可能提供清晰准确的描述。</template>
              </Alert>
              <div class="info-content">
                <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editorRef"
                  :defaultConfig="toolbarConfig"
                  :mode="mode"/>
                <Editor
                  style="height: 500px; width: 100%; overflow-y: hidden;"
                  v-model="valueHtml"
                  :defaultConfig="editorConfig"
                  :mode="mode"
                  @onCreated="handleCreated"/>
              </div>
              <el-button class="next" @click="next">提交</el-button>
            </div>
          </div>
        </TabPane>
      </Tabs>
      <div>
        <!-- <el-button class="lef_btn" @click="">上一步</el-button> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElMessage, ElNotification } from 'element-plus';
import { ref, reactive, onBeforeUnmount, shallowRef, onMounted, computed } from 'vue';
import MyTimeLine from '../../components/MyTimeLine.vue';
import Steps from '../../components/Steps.vue';
import { useRouter, useRoute } from "vue-router";
import apiFun from '../../api/api';
// import { toolbar } from '../../assets/js/editorToolbar';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {
  Editor,
  Toolbar,
} from "@wangeditor/editor-for-vue";
const router = useRouter();
const route = useRoute();
const status = ref(1);
const url = ref('src/assets/image/correct.svg');
const pageSize = ref(5);
let totalNum = ref(5);
let currentPage = ref(1);
const steps = reactive([
  {
    title: '上传故障集',
    description: '进行重新分析',
    status: 'completed',
  },
  {
    title: '人员分析中',
    description: '请耐心等待哦',
    status: 'in-progress',
  },
  {
    title: '完成',
    description: '重新分析完成',
    status: 'uncompleted',
  },
]);
const wayData = reactive([
  {
    way: '报错：There is a chart instance already initialized on the dom',
    detail: `<p>npm install echarts --save</p><p> </p><p>//在main.js中添加：</p><p>import * as echarts from 'echarts'</p><p>Vue.prototype.$echarts = echarts</p><p> </p><p>//即可直接使用：</p><p>var myChart = this.$echarts.init(document.getElementById('myChart'))</p><p> </p><p> </p><p>//index.html文件中此处的echarts引用需要删除</p><p> &nbsp; &lt;!-- 开发环境 --&gt;</p><p> &nbsp; &nbsp;&lt;link rel="shortcut icon" type="image/x-icon" href="./static/img/favicon.ico"&gt;</p><p> &nbsp; &nbsp;&lt;script src="./static/config/index.js"&gt;&lt;/script&gt;</p><p> &nbsp; &nbsp;&lt;script src="./static/plugins/mock-1.0.0-beta3/mock-min.js"&gt;&lt;/script&gt;</p><p> &nbsp; &nbsp;&lt;script src="./static/plugins/echarts-3.8.5/echarts.common.min.js"&gt;&lt;/script&gt;</p><p> &nbsp; &nbsp;&lt;script src="./static/plugins/ueditor-1.4.3.3/ueditor.config.js"&gt;&lt;/script&gt;</p><p> &nbsp; &nbsp;&lt;script src="./static/plugins/ueditor-1.4.3.3/ueditor.all.min.js"&gt;&lt;/script&gt;</p><p> &nbsp; &nbsp;&lt;script src="./static/plugins/ueditor-1.4.3.3/lang/zh-cn/zh-cn.js"&gt;&lt;/script&gt;</p><p> </p><p> </p><p> </p><p>// build/webpack.base.conf.js 文件中的下方也需要干掉</p><p> &nbsp;externals: {</p><p> &nbsp; &nbsp;mockjs: 'Mock',</p><p> &nbsp; &nbsp;echarts: 'echarts',</p><p> &nbsp; &nbsp;ueditor: 'UE'</p><p> &nbsp;}</p><p> </p><p> </p><p>//当然，也可以直接更改外链版本~</p>`
  },
  {
    way: '图表不展示',
    detail: `<p><span style="color: rgb(77, 77, 77); background-color: rgb(255, 255, 255); font-size: 16px;">一定要设置高宽。</span></p><pre><code > &lt;div id="chart style="width:500px; height:500px" &gt;&lt;/div&gt;</code></pre><p><br></p>`,
  },
  {
    way: '报错：export '+ 'default' + ' (imported as' + 'echarts' + ') was not found in' + 'echarts' + '。',
    detail: `<p><strong>版本不匹配</strong></p><p>安装指定版本</p><pre><code >npm install echarts@4.9.0</code></pre><p><br></p>`,
  },
  {
    way: 'echart 节点重复报错',
    detail: `<p><span style="color: rgb(77, 77, 77); background-color: rgb(255, 255, 255); font-size: 16px;">加上一个id，用id进行匹配，新的结构：</span></p><pre><code >nodes: [{name: '操作系统集团',id:1,category: 0}, {
    name: '浏览器有限公司',
    id:2,
    category: 0
  }, {
    name: 'HTML科技',
    id:3,
    category: 0
  }]

</code></pre><p><br></p>`,
  },
  {
    way: 'XXX  is not a function 或者 XXX is not defined 报错',
    detail: `<p>解决思路: &nbsp;</p><p>一开始是用required 设置path引入的,结果报错:required is not defined,改成&lt;script&gt;标签形式引入,结果报 XXX is not a function,搜索后发现是echarts.js 版本错了,我的初始化是用的2的实例,但echarts.js 包是3 版本的.好吧,换成2 版本的,又报错: echart is not defined,最后才搞好,下载2版本的 echarts-all.js 这个文件</p>`
  },
]);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}


onMounted(() => {
  // setTimeout(() => {
    // valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  // }, 1500);
  getDetail();
});

const getDetail = () => {
  
};

const handleCheck = (row) => {
  router.push({
    path:'/finish', 
    query:{ value: row.detail, status: 3}
  })
};

const next = () => {
  console.log(valueHtml.value);
  if(valueHtml.value === '' || valueHtml.value === null || valueHtml.value === undefined || valueHtml.value === '<p><br></p>'){
    ElNotification({
      title: '警告',
      message: '填写完毕后提交',
      type: 'warning',
    });
  }else{
    ElMessage.success("人员分析提交成功");
    router.push({
      path:'/finish', 
      query:{
        id: route.query.id,
        value: valueHtml.value,
      }
    });
  }
  
  // apiFun.repair.humanAnalysis(data.failureId, data.courseId, data.analysis).then((res) => {
  //   if(res.code === 200){
  //     router.push({
  //     path:'/finish', 
  //     query:{id: route.query.id}
  //   })
  //   }else{
  //     ElMessage.error("人员分析提交失败");
  //   }
  // });
}
const backToList = () => {
  router.push({
    path:'/detail', 
    query:{id: route.query.id}
  })
};
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
  gap: 25px;
  padding: 0 180px 0 180px;
  flex-direction: column;

  .left {
    display: flex;
    flex: 1;
    gap: 25px;
    flex-direction: column;
    height: 100%;
  }

  .right {
    display: flex;
    flex: 1;
    gap: 25px;
    flex-direction: column;
    height: 100%;
  }

  .card {
    margin: 20px 0 20px 0;
    display: flex;
    flex-direction: column;

    .card-header-2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 10px;
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
      padding: 20px 100px 20px 100px;

      .pager {
        float: right;
        margin-top: 40px;
      }
    }
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
.form{
  flex: 1;
  gap: 10px;
}
.card{
  flex: 1;
  display: flex;
  padding: 0;
  .box-card{
    display: flex;
    gap: 50px;
    width: 100%;
  }
}

.info{
  // padding: 4% 14% 0 4%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .alert {
    margin-bottom: 20px;
    width: 100%;
  }
  .info-title1{
    margin-bottom: 20px;
  }
  .info-title2{
    margin-bottom: 5px;
  }
  .info-content{
    // margin-left: -30px;
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.06);
    border: 1px solid #ccc;
    .editor {
      width: 100%;
      height: 500px;
      box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.06)
    }
  }
  .form-button{
    margin-left: 420px;
  }
}
.next {
  margin-top: 20px;
  background-color: rgb(34,101,255);
  color: #fff;
}


</style>
<style src="src/assets/style/base.scss"></style>
