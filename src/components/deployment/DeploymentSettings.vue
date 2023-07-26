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
    <div class="hint line" v-if="wholeData.cardState==3" >
      <div class="title1-box">
        <p class="title1">服务器使用情况</p>
      </div>
      <LineNow />
      <!-- <Row>
        <Col span="4">
          <div style="padding-top:99px;">
            <div>服务器上模型使用比例</div><br />
            <h1 style="font-size:55px;">28%</h1><br />

          </div>
        </Col>
        <Col span="20">
          <LineNow />
        </Col>
      </Row> -->
    </div>
    <div class="hint"  v-if="wholeData.cardState==3">
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
              <p>创建时间： 2023-07-14 21:04:07</p>
              <p>API key： 77d2652e-7ea1-495a-994a-c03bd215c699</p>
              <p>服务地址： http://127.0.0.1:5173/serving/online/54</p>
            </Space>
          </div>
        </div>
      </div>
    </div>
    <div class="hint"  v-if="wholeData.cardState===1">
      <div class="hint-reminder">
        <div class="hint-left">
          <img src="../../assets/icon/暂无数据.png" class="hint-img"/>
        </div>
        <div class="hint-right">
          <div class="hint-content">
            <p class="title">暂未部署模型</p>
            <div class="hint-progress">
              <MineSteps v-bind:steps="steps"/>
            </div>
            <p>模型部署是为开发者提供应用化功能，来提供对新数据的预测和决策支持。</p>
            <a @click="drawer.value = true">立即部署</a>
          </div>
        </div>
      </div>
    </div>
    <div class="hint" v-else-if="wholeData.cardState===2">
      <div class="hint-reminder">
        <div class="hint-left">
          <img src="../../assets/icon/请先选择.png" class="hint-img"/>
        </div>
        <div class="hint-right">
          <div class="hint-content">
            <p class="title">选择部署模型</p>
            <div class="hint-progress">
              <MineSteps v-bind:steps="steps"/>
            </div>
            <p>选择其中一个沙盒服务进行部署。</p>
          </div>
        </div>
      </div>
    </div>
    <div class="hint"  v-else>
      <div class="hint-reminder">
        <div class="hint-left">
          <img src="../../assets/icon/OK.png" class="hint-img"/>
        </div>
        <div class="hint-right">
          <div class="hint-content">
            <p class="title">已部署</p>
            <div class="hint-progress">
              <MineSteps v-bind:steps="steps"/>
            </div>
            <p>在线数据测试是在已部署的应用程序中使用实时数据进行测试的过程。</p>
            <a >立即诊断</a>
          </div>
        </div>
      </div>
    </div>
    <div class="hint" v-if="wholeData.cardState!==1">
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
      <div class="box-bottom" >
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
                <span v-else>待运行</span>
              </template>
            </el-table-column>
            <el-table-column prop="remaining" label="剩余时间" width="120px" >
              <CountDown :target="targetTime1" @on-end="handleEnd" v-font="14" />
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template v-slot="scope">
                <el-button link type="primary" class="txt-color" @click="handleCheck(scope.row)">编辑</el-button>
                <el-button link type="primary" class="txt-color" @click="handleDelete(scope.row)">删除</el-button>
                <el-button link type="primary" class="txt-color" @click="handleDeployment(scope.row)">正式部署</el-button>
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
                        名称： {{ drawer.dataInfo.name }}
                    </Col>
                    <Col span="12">
                        更迭时间： {{ drawer.dataInfo.time }}
                    </Col>
                </Row>
                <!-- <Row>
                    <Col span="12">
                        标签： Map visualization
                    </Col>
                </Row> -->
                <p style="line-height:24px;">
                  简述：{{ drawer.dataInfo.intruction }}
                </p>

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
            <Button type="primary" @click="submit">提交部署</Button>
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
import Line from '../chart/Line.vue';
import LineNow from '../chart/LineNow.vue';
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
const wholeData = reactive({
  cardState:1,
})
const status = ref(0)
const statusText = computed(() => {
  return status.value === 1 ? '运行' : '暂停';
});

const StartServer = () =>{
  if(status.value === 1){
    status.value=0
    steps[0].status = 'uncompleted'
    steps[1].status = 'in-progress'
    steps[2].status = 'uncompleted'
    wholeData.cardState = 2;
    ElMessage({
    message: '暂停成功',
    type: 'success',
  })
  }else{
    status.value=1
    steps[0].status = 'uncompleted'
    steps[1].status = 'uncompleted'
    steps[2].status = 'in-progress'
    wholeData.cardState = 3;
    ElMessage({
    message: '启动成功',
    type: 'success',
  })
  }


}

//删除运行
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
   status: 'in-progress',
 },
 {
   title: '选择部署',
   description: '',
   status: 'uncompleted',
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
    createTime: '2023-07-14 21:04:07',
    size: 10767,
    url: 'http://127.0.0.1:5173/#/home',
    status: 0,
  },
  // {
  //   id: '2',
  //   createTime: '2016-05-02',
  //   name: 'test',
  //   size: 10767,
  //   url: 'http://127.0.0.1:5173/#/home',
  //   status: 0,
  // },
  // {
  //   id: '3',
  //   createTime: '2016-05-04',
  //   name: 'test',
  //   size: 10767,
  //   url: 'http://127.0.0.1:5173/#/home',
  //   status: 0,
  // },
  // {
  //   id: '4',
  //   createTime: '2016-05-01',
  //   name: 'test',
  //   size: 10767,
  //   url: '查看URL',
  //   status: 1,
  // },
  // {
  //   id: '5',
  //   createTime: '2016-05-08',
  //   name: 'test',
  //   size: 10767,
  //   url: '查看URL',
  //   status: 1,
  // }
];

//复制链接
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

const handleCheck = () =>{
  ElMessage({
    message: '修改成功',
    type: 'success',
  })
}

const handleDelete = () =>{
  ElMessage({
    message: '删除成功',
    type: 'success',
  })
}

const handleDeployment = (index) =>{
  steps[0].status = 'uncompleted'
  steps[1].status = 'uncompleted'
  steps[2].status = 'in-progress'
  wholeData.cardState = 3;
  console.log(index)
  status.value=1;  //没用
  fixData[0].status = 0;
  ElMessage({
    message: '部署成功',
    type: 'success',
  })
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
  },
  dataInfo: {
    name:'模型数据1',
    time:'2023-07-14 14:05:11',
    intruction:'基于机器学习的分布式系统故障诊断模型可以有效地提高故障诊断的效率和准确性，降低系统维护的成本和风险。该模型可以自动学习和适应系统的变化，具有较好的可扩展性和适应性，可以应用于各种规模和复杂度的分布式系统。',
  }
})





const data = [
  {
    "sample_id": 0,
    "feature0": 51.56724987,
    "feature1": 288358.4,
    "feature2": "nan",
    "feature3": 1.855899851,
    "feature4": 201.4601694,
    "feature5": 6.582260591,
    "feature6": -0.516321231,
    "feature7": 563677000000,
    "feature8": 222221.2109
  },
  {
    "sample_id": 1,
    "feature0": 63.80487396,
    "feature1": 288358.4,
    "feature2": 1.10680249,
    "feature3": 1.050386639,
    "feature4": 391.6053751,
    "feature5": 13.32343925,
    "feature6": 4.662871314,
    "feature7": "nan",
    "feature8": -144247.3576
  },
  {
    "sample_id": 2,
    "feature0": 49.13852695,
    "feature1": 288358.4,
    "feature2": 1.11164904,
    "feature3": 0.767126838,
    "feature4": 130.7080672,
    "feature5": 6.485547005,
    "feature6": 5.696815199,
    "feature7": 547460000000,
    "feature8": -428840.327
  },
  {
    "sample_id": 3,
    "feature0": "nan",
    "feature1": 288358.4,
    "feature2": 1.109168509,
    "feature3": "",
    "feature4": 258.5210761,
    "feature5": 0.716737178,
    "feature6": 23.23846148,
    "feature7": -353989000000,
    "feature8": ""
  },
  {
    "sample_id": 4,
    "feature0": 76.52083097,
    "feature1": 288358.4,
    "feature2": 1.113410267,
    "feature3": 5.795408332,
    "feature4": 256.0389965,
    "feature5": -1.803482668,
    "feature6": 14.04049464,
    "feature7": -107101000000,
    "feature8": 649972.2666
  },
  {
    "sample_id": 5,
    "feature0": 69.38270767,
    "feature1": 288358.4,
    "feature2": 1.104776532,
    "feature3": "",
    "feature4": 305.6980442,
    "feature5": 13.08362527,
    "feature6": 1.245861564,
    "feature7": "nan",
    "feature8": ""
  },
  {
    "sample_id": 6,
    "feature0": 52.02835017,
    "feature1": "",
    "feature2": 1.103117418,
    "feature3": 1.547828124,
    "feature4": 209.218614,
    "feature5": 1.852463541,
    "feature6": 7.632214349,
    "feature7": -594573000000,
    "feature8": -60071.82736
  },
  {
    "sample_id": 7,
    "feature0": 73.83668243,
    "feature1": 288358.4,
    "feature2": 1.107633509,
    "feature3": 0.633408002,
    "feature4": 184.5618278,
    "feature5": 12.5619859,
    "feature6": -0.905920701,
    "feature7": 443568000000,
    "feature8": -284754.6744
  },
  {
    "sample_id": 8,
    "feature0": 112.0472228,
    "feature1": 288358.4,
    "feature2": 1.102054073,
    "feature3": "",
    "feature4": 194.1994673,
    "feature5": 22.00642215,
    "feature6": -17.00117944,
    "feature7": 110223000000,
    "feature8": -145636.4213
  },
  {
    "sample_id": 9,
    "feature0": 65.01815139,
    "feature1": 288358.4,
    "feature2": 1.103728047,
    "feature3": 4.751556355,
    "feature4": 158.1415087,
    "feature5": 21.13976938,
    "feature6": -11.4397777,
    "feature7": -453298000000,
    "feature8": -428159.4668
  },
  {
    "sample_id": 10,
    "feature0": 57.98995708,
    "feature1": 288358.4,
    "feature2": 1.109555169,
    "feature3": 0.199094212,
    "feature4": 183.746607,
    "feature5": 26.22768229,
    "feature6": 7.070650226,
    "feature7": 277743000000,
    "feature8": -613443.3935
  },
  {
    "sample_id": 11,
    "feature0": "nan",
    "feature1": 288358.4,
    "feature2": 1.110710654,
    "feature3": "",
    "feature4": 273.995882,
    "feature5": 4.353947074,
    "feature6": -14.16457216,
    "feature7": -144457000000,
    "feature8": -984608.651
  },
  {
    "sample_id": 12,
    "feature0": 32.76011871,
    "feature1": 288358.4,
    "feature2": 1.102317132,
    "feature3": 0.822616805,
    "feature4": 243.1901191,
    "feature5": 5.556984341,
    "feature6": -1.806020374,
    "feature7": 1193610000000,
    "feature8": -689194.0221
  },
  {
    "sample_id": 13,
    "feature0": 67.60798772,
    "feature1": 288358.4,
    "feature2": 1.107323753,
    "feature3": 0.28710576,
    "feature4": "",
    "feature5": 6.780638699,
    "feature6": -2.153108338,
    "feature7": -407618000000,
    "feature8": -99330.09749
  },
  {
    "sample_id": 14,
    "feature0": 48.94548134,
    "feature1": 288358.4,
    "feature2": 1.110150873,
    "feature3": 0.381190852,
    "feature4": 238.2528177,
    "feature5": 4.444870357,
    "feature6": 14.02829924,
    "feature7": 106530000000,
    "feature8": -888877.9005
  },
  {
    "sample_id": 15,
    "feature0": 118.2410869,
    "feature1": 288358.4,
    "feature2": 1.106468068,
    "feature3": 1.172701198,
    "feature4": 119.3490943,
    "feature5": 12.3998887,
    "feature6": 1.766084894,
    "feature7": "nan",
    "feature8": 451170.4605
  },
  {
    "sample_id": 16,
    "feature0": 72.33358503,
    "feature1": 288358.4,
    "feature2": 1.104363484,
    "feature3": 1.309631466,
    "feature4": 160.7371996,
    "feature5": 4.047478784,
    "feature6": 18.54007343,
    "feature7": -2200839432,
    "feature8": 290787.7912
  },
  {
    "sample_id": 17,
    "feature0": 86.00452467,
    "feature1": 288358.4,
    "feature2": 1.102093445,
    "feature3": 1.440522395,
    "feature4": 223.2538512,
    "feature5": 6.844563764,
    "feature6": 11.66319779,
    "feature7": 259984000000,
    "feature8": -126969.9038
  },
  {
    "sample_id": 18,
    "feature0": 61.4999325,
    "feature1": 288358.4,
    "feature2": 1.10867657,
    "feature3": 2.218416551,
    "feature4": 181.6275698,
    "feature5": 6.839794059,
    "feature6": 2.333473572,
    "feature7": -376003000000,
    "feature8": -537347.8377
  },
  {
    "sample_id": 19,
    "feature0": 90.45035112,
    "feature1": 288358.4,
    "feature2": 1.107547223,
    "feature3": 0.022798946,
    "feature4": 148.5409018,
    "feature5": 6.877127665,
    "feature6": 13.09115445,
    "feature7": -12273300182,
    "feature8": 329460.1273
  },
  {
    "sample_id": 20,
    "feature0": 78.51489557,
    "feature1": "",
    "feature2": 1.105645573,
    "feature3": 0.2552591,
    "feature4": 180.294017,
    "feature5": -0.746576543,
    "feature6": -4.782139304,
    "feature7": -233763000000,
    "feature8": 136823.2704
  },
  {
    "sample_id": 21,
    "feature0": 45.44118749,
    "feature1": 288358.4,
    "feature2": 1.108719271,
    "feature3": 1.166946964,
    "feature4": 134.5606084,
    "feature5": 17.420866,
    "feature6": 0.360110002,
    "feature7": "nan",
    "feature8": -58708.34565
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
  console.log(data)
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

const submit = () =>{
  steps[0].status = 'uncompleted'
  steps[1].status = 'in-progress'
  steps[2].status = 'uncompleted'
  wholeData.cardState = 2;
  fixData[0].status = 1;
  drawer.value = false
}

onBeforeMount(() => {
 //console.log('2.组件挂载页面之前执行----onBeforeMount')
 console.log(wholeData.cardState)
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
 .line{
  margin-bottom: -40px;
  margin-top:40px;
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

.title1-box{
  width: 300px;
  height: 20px;
  border-left: 5px solid #6C91c2; //实线
}
.title1{
  padding-left: 10px;;
  text-align: left;
  font-weight: bolder;
  font-size: 20;
  padding-bottom: 5px;
}
</style>
