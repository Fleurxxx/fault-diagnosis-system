
<template>
  <div class="box">
    <div class="box-title">
      <p class="title">在线诊断</p>
    </div>
    <div class="box-reminder">
      <Steps v-bind:steps="steps"/>
    </div>
     <div class="container">
      <img src="../../assets/image/成功.png" alt="Image" class="center-image">
      <div class="text">
        <div class="line1">诊断完成</div>
        <div class="line2">模型诊断成功</div>
      </div>
      <div class="text">
        <el-button @click="back()" style="width: 80px;">查看详情</el-button>
        <el-button type="primary" @click="submit()" style="width: 80px;">结果下载</el-button>
      </div>
    </div>
    <div class="box-table">
      <Tabs v-model="activeTab" class="custom-tabs">
        <TabPane label="训练结果" name="name1" >
          <Table class="t-table" :columns="data.columns" :data="data.data"></Table>
        </TabPane>
      </Tabs>
    </div>
    <div class="box-table">
      <Tabs v-model="activeTab" class="custom-tabs">
        <TabPane label="结果集概览" name="name1" >
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
        </TabPane>
      </Tabs>
        <div>
          <Tabs v-model="activeTab" class="custom-tabs">
            <TabPane label="相似故障推荐" name="name1" >
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
            <!-- <TabPane label="修复中心" name="name2">
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
            </TabPane> -->
          </Tabs>
        </div>
        <div style="padding-top:50px;">
          <Tabs v-model="activeTab" class="custom-tabs">
            <TabPane label="可视化分析" name="name1" >
              <RadarChart  style="margin: 0 auto;"/>
              <Bubble />
            </TabPane>
          </Tabs>
        </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeUnmount, shallowRef, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import  {Message} from 'view-ui-plus'
import { ElMessageBox,ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import Steps from '../../components/Steps.vue';
import axios from 'axios';
import RadarChart from '../../components/chart/RadarChart.vue'
import Bubble from '../../components/chart/Bubble.vue';
import '@wangeditor/editor/dist/css/style.css' // 引入 css

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


const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

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
        id: 1,
        value: valueHtml.value,
      }
    });
  }
}

const back =()=>{
  router.push({ path: "/info" });
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  initialize();
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

  }

  .container {
      // display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 180px;
      margin-top: 60px;
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

.t-title{
  font-size: 18px;
  font-weight: bolder;
  padding-left: 0px;
  padding-bottom: 20px;
  text-align: left;
}

.t-json{
  margin-bottom: 50px;
}
.viewer{
  width: 100%;
  min-width: 3.125rem;
  text-align: left;
  padding-left: 50px;
  padding-bottom: 30px;
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
