<template>
  <div>
    <div class="operation">
      <div class="operation-left">
        <Space>
          <p>已上线服务</p>
          <div class="left-tip">
            <Tooltip theme="light" content="Top Right text" placement="top-end">
              <el-icon class="left-icon"><QuestionFilled /></el-icon>
            </Tooltip>
          </div>
        </Space>
      </div>
      <div class="operation-right">
        <Space>
          <p @click="StartServer"><i :class="status===1?'fa fa-pause-circle-o':'fa fa-play-circle-o'"></i>&nbsp;&nbsp;{{ statusText }}</p>
          <p @click="DeleteServer"><i class="fa fa-trash-o fa-fw"></i>&nbsp;删除</p>
        </Space>
      </div>
    </div>
    <div class="hint">
      <div class="reminder">
        <div class="rectangle">
          <div class="left-side">
            <Space>
              <Space direction="vertical" class="left-content">
                <p>test</p>
                <h1 style="color: #15cb30;">运行中</h1>
              </Space>
              <Space direction="vertical" class="left-content">
                <p>最近7天调用</p>
                <h1>0</h1>
              </Space>
              <Space direction="vertical" class="left-content">
                <p>无调用时长</p>
                <h1>0.18天</h1>
              </Space>
            </Space>
          </div>
          <div class="right-side">
            <Space direction="vertical" class="right-content">
              <p>创建时间： 2023-04-17 10:31</p>
              <p>API key： 77d2652e-7ea1-495a-994a-c03bd215c699</p>
              <p>服务地址： https://http://127.0.0.1:5173/serving/online/54</p>
            </Space>
          </div>
        </div>
      </div>
    </div>
    <div class="hint">
      <div class="hint-reminder">
        <div class="hint-left">
          <img src="../../assets/icon/请先选择.png" class="hint-img"/>
        </div>
        <div class="hint-right">
          <div class="hint-content">
            <p class="title">暂未部署模型</p>
            <div class="hint-progress">
              <MineSteps v-bind:steps="steps"/>
            </div>
            <p>选择其中一个沙盒服务进行部署，</p>
            <p>模型部署是为开发者提供应用化功能，来提供对新数据的预测和决策支持。</p>
            <a @click="drawer.value = true">立即部署</a>
          </div>
        </div>
      </div>
    </div>
    <div class="hint">
      <div class="box-top">
        <ButtonGroup>
            <Button type="primary">沙盒</Button>
            <Button >草稿箱</Button>
            <div class="box-top-tips">
              <!-- <Alert type="warning" cneter>最多只能创建五个沙盒服务</Alert> -->
              <el-alert title="最多只能创建五个沙盒服务" type="warning" center :closable="false" />
            </div>
        </ButtonGroup>
      </div>
      <div class="box-bottom">
        <el-row class="table">
          <el-table
            :data="fixData"
            @selection-change="handleSelectionChange"
            style="width: 100%"
            :header-cell-style="{
              background: 'rgb(242,243,245)',
              color: 'rgb(0,0,71)',
              fonsSize: '18px',
            }"
            :cell-style="{color: 'rgb(85,68,85)', fontWeight: '350'}"
          >
            <el-table-column  width="10"/>
            <el-table-column prop="name" label="沙盒名称" width="130px" >
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="160px" />
            <el-table-column prop="url" label="沙盒地址" width="120px" >
              <template v-slot="scope">
                <!-- <span class="txt-color">查看URL</span>&nbsp;
                <el-icon style="cursor: pointer;" class="txt-color"  @click="copyURL(scope.row.url)"><DocumentCopy /> </el-icon> -->
                <Paragraph copyable copy-text="custom text" style="color:#3f3fc2;margin-bottom: -5px;" :copy-config="{ tooltips: false }" @click="copyURL(scope.row.url)">查看URL</Paragraph>
              </template>

            </el-table-column>
            <el-table-column prop="status" label="状态" width="">
              <template v-slot="scope">
                <span v-if="scope.row.status === 0">运行中</span>
                <span v-else>已修复</span>
              </template>
            </el-table-column>
            <el-table-column prop="remaining" label="剩余时间" width="120px" >
              <CountDown :target="targetTime1" @on-end="handleEnd" v-font="14" />
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template v-slot="scope">
                <el-button link type="primary" class="txt-color" @click="handleCheck(scope.row)">编辑</el-button>
                <el-button link type="primary" class="txt-color" @click="handleDelete(scope.row)">删除</el-button>
                <el-button link type="primary" class="txt-color" @click="handleDelete(scope.row)">正式部署</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </div>
    <div >
      <!-- 抽屉 -->
      <Drawer title="模型部署"
        v-model="drawer.value"
        width="620"
        :mask-closable="false"
        :styles="drawer.styles">
        <Form :model="drawer.formData">
            <p :style="drawer.pStyle">基本信息</p>
            <Row :gutter="32">
                <Col span="14">
                    <FormItem label="沙盒名称" label-position="top">
                        <Input v-model="drawer.formData.name" placeholder="请输入沙盒名称" />
                    </FormItem>
                </Col>
                <!-- <Col span="12">
                  <FormItem label="数据版本" label-position="top">
                    <DatePicker v-model="drawer.formData.date" type="date" placeholder="请选择版本对应日期" style="display: block" placement="bottom-end" :disabled-date="disabledDate"></DatePicker>
                  </FormItem>

                </Col> -->
            </Row>
            <FormItem label="数据版本" label-position="top">
              <div class="history-data">
                <Version :showimg="false"/>
              </div>
            </FormItem>
            <Divider />
            <p :style="drawer.pStyle">版本详情</p>
            <div class="demo-drawer-profile">
                <Row>
                    <Col span="12">
                        名称： Programmer
                    </Col>
                    <Col span="12">
                        更迭时间： 2023-05-14 14:05:11
                    </Col>
                </Row>
                <!-- <Row>
                    <Col span="12">
                        标签： Map visualization
                    </Col>
                </Row> -->
                简述： C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc.
                <div class="file-box">
                  <div class="file-color" @click="handleClick">
                    <Row>
                        <Col span="2">
                          <Avatar :src=avatarUrl shape="square" icon="ios-person" size="large" />
                        </Col>
                        <div style="padding-left:10px;"></div>
                        <Col span="10">
                            <p>模型测试样例.csv</p>
                            <p>13.56 KB</p>
                        </Col>
                        <!-- <Col span="10">
                          <Space wrap>
                              <ButtonGroup>
                                  <Button icon="md-download"></Button>
                                  <Button icon="ios-sunny-outline"></Button>
                              </ButtonGroup>
                          </Space>
                        </Col> -->
                    </Row>
                  </div>
                </div>
            </div>
        </Form>
        <Divider />
        <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" @click="exportCsv">下载数据</Button>
            <Button type="primary" @click="drawer.value = false">提交部署</Button>
        </div>
      </Drawer>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Papa from "papaparse";
import jschardet from 'jschardet';
import { ElMessage } from 'element-plus'
import MineSteps from '../../components/Steps.vue'
import avatarUrl from '../../assets/icon/csv.png'
import Version from '../../components/data/ModelVersion.vue'
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

const status = ref(0)
const statusText = computed(() => {
  return status.value === 1 ? '运行' : '暂停';
});

const StartServer = () =>{
  if(status.value === 1){
    status.value=0
    ElMessage({
    message: '暂停成功',
    type: 'success',
  })
  }else{
    status.value=1
    ElMessage({
    message: '启动成功',
    type: 'success',
  })
  }


}

const DeleteServer = () =>{
  ElMessage({
    message: '删除成功',
    type: 'success',
  })
}

//步骤条
const steps = reactive([
 {
   title: '部署设置',
   description: '',
   status: 'uncompleted',
 },
 {
   title: '选择部署',
   description: '',
   status: 'in-progress',
 },
 {
   title: '数据诊断',
   description: '',
   status: 'uncompleted',
 },
]);

//表格
const fixData = [
  {
    id: '1',
    name: 'test',
    createTime: '2016-05-03 12:04:07',
    size: 10767,
    url: 'http://127.0.0.1:5173/#/home',
    status: 0,
  },
  {
    id: '2',
    createTime: '2016-05-02',
    name: 'test',
    size: 10767,
    url: 'http://127.0.0.1:5173/#/home',
    status: 0,
  },
  {
    id: '3',
    createTime: '2016-05-04',
    name: 'test',
    size: 10767,
    url: 'http://127.0.0.1:5173/#/home',
    status: 0,
  },
  {
    id: '4',
    createTime: '2016-05-01',
    name: 'test',
    size: 10767,
    url: '查看URL',
    status: 1,
  },
  {
    id: '5',
    createTime: '2016-05-08',
    name: 'test',
    size: 10767,
    url: '查看URL',
    status: 1,
  }
];

const copyURL = (url) =>{
  var input = document.createElement("input"); // 创建input对象
  input.value = url; // 设置复制内容
  document.body.appendChild(input); // 添加临时实例
  input.select(); // 选择实例内容
  document.execCommand("Copy"); // 执行复制
  document.body.removeChild(input); // 删除临时实例
  ElMessage({
    message: '复制成功',
    type: 'success',
  })
}

//倒计时
const targetTime1 = new Date().getTime() + 3900000
  const  handleEnd = () => {
  this.$Message.info('倒计时结束');
}

//抽屉
const drawer = reactive({
  value: false,
  styles: {
      height: 'calc(100% - 55px)',
      overflow: 'auto',
      paddingBottom: '53px',
      position: 'static',
  },
  formData: {
      name: '',
      url: '',
      owner: '',
      type: '',
      approver: '',
      date: '',
      desc: ''
  },
  pStyle: {
      fontSize: '16px',
      color: 'rgba(0,0,0,0.85)',
      lineHeight: '24px',
      display: 'block',
      marginBottom: '16px'
  }
})




// const data = reactive({})
const data = [
    {
        "id": "112345",
        "name": "Roberta",
        "age": "39",
        "gender": "M"
    },
    {
        "id": "221433",
        "name": "Oliver",
        "age": "25",
        "gender": "M"
    },
    {
        "id": "33257879",
        "name": "Shayna",
        "age": "18",
        "gender": "F"
    },
    {
        "id": "4345785",
        "name": "Fechin",
        "age": "18",
        "gender": "M"
    }
]
//查看csv
const handleClick = () => {
  // 添加表头信息
  let keys = Object.keys(data[0]);
  const header = {}
  keys.forEach(item => {
    header[item]= item
  })
  console.log(header)
  data.unshift(header)
  Heiho(data, { max: 100, title: '在线浏览.csv' });

}
//导出
const exportCsv = () => {
  let keys = Object.keys(data[0]);
  console.log(keys)
  const header = {}
  keys.forEach(item => {
    header[item]= item
  })
  console.log(header)
  export_csv(header, data);

  function export_csv(header, data) {
    let list = [];
    for (let i in data) {
        let item = data[i];
        let obj = {};
        for (let key in header) {
            let title = header[key];
            let value = item[key];
            obj[title] = value;
        }
        list.push(obj);
    }

    var csv = Papa.unparse(list);
    //定义文件内容，类型必须为Blob 否则createObjectURL会报错
    let content = new Blob(['\uFEFF' + csv]);
    //生成url对象
    let urlObject = window.URL || window.webkitURL || window;
    let url = urlObject.createObjectURL(content);
    //生成<a></a>DOM元素
    let el = document.createElement("a");
    //链接赋值
    el.href = url;
    el.download = "文件导出.csv";
    //必须点击否则不会下载
    el.click();
    //移除链接释放资源
    urlObject.revokeObjectURL(url);
  }
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
.txt-color{
  color:#3f3fc2;
}
.title{
   font-size:18px;
   font-weight:bold;
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


//最上面一行
.operation{
  position: relative;
  padding-top:35px;
}
.operation-left{
  position: absolute;
  left: 27px;
  //提示矫正
  .left-tip{
    padding-left: 10px;
  }
  .left-icon{
    right: 15px;
  }
}
.operation-right{
  cursor: pointer;
  position: absolute;
  right: 30px;
}

//第一个box
.reminder{
  padding: 23px 20px 23px 20px; //上右下左
  background-color: rgba(10, 10, 10, 0.054);
}
.rectangle {
  position: relative;
  width: 770px; /* 根据需要设置适当的宽度 */
  height: 130px; /* 根据需要设置适当的高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  p{
    padding-bottom: 10px;
  }
}
.left-side {
  position: absolute;
  top: 30px;
  left: 30px;
  width: 50%; /* 设置左边部分的宽度，这里是整个宽度的一半 */
  height: 100%;
  // background-color: lightgray; /* 左边部分的背景色 */
}

.right-side {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%; /* 设置右边部分的宽度，这里是整个宽度的一半 */
  height: 100%;
  // background-color: white; /* 右边部分的背景色 */
  border-left: 1px solid darkgray; /* 添加竖线，颜色为深灰色 */
}

.left-content{
  padding-right: 30px;
}
.right-content{
  padding-left: 30px;
  padding-top:15px;
}
.box-top{
  position: relative;
  width:400px;
  .box-top-tips{
    position:absolute;
    left: 150px;
    top:-2px;
    width:210px;

  }

}
.box-bottom{
  padding-top: 20px;
  .el-button:focus,
  .el-button:active {
    outline: none;
    box-shadow: none;
  }

}

.demo-drawer-profile{
    font-size: 14px;
}
.demo-drawer-profile .ivu-col{
    margin-bottom: 12px;
}

.file-box{
  padding:30px 10px 0 10px;
  .file-color{
    z-index:9999;
    padding:15px 0px 0px 20px;
    background-color: rgba(10, 10, 10, 0.064);
    cursor: pointer; /*鼠标悬停变小手*/
    p:nth-child(1){
      font-size:16px;
      font-weight: bold;
    }
    p:nth-child(2){
      font-size:13px;
    }
  }
}

.demo-drawer-footer Button{
  width:90px;
}

.history-data{
  margin-top:30px;
  margin-left: 120px
}
/deep/ #heiho-view {
  z-index: 2000;
}
</style>
