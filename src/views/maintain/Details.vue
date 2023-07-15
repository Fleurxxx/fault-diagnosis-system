<template>
  <div class="box">
    <div class="box-title">
      <p class="title">维修详情</p>
    </div>
    <div class="fault-repair-details">
      <div class="small-div-body">
        <el-card class="card" shadow="hover">
          <template #header>
            <div class="card-header-2" >
              <span><i class='fa fa-dot-circle-o'></i>&nbsp;&nbsp;&nbsp;模型详情</span>
              <el-button class="button" type="primary" text @click="modelDetail">查看更多</el-button>
            </div>
          </template>
          <div class="detail">
            <el-descriptions :column="2" border size="large">
              <el-descriptions-item
                label="模型名称"
                label-align="center"
                align="left"
                label-class-name="my-label"
                class-name="my-content">
                {{ state.record.modelId }}
              </el-descriptions-item>
              <el-descriptions-item label="模型大小" label-align="center" align="left">
                {{ state.record.gmtCreate }}
              </el-descriptions-item>
              <el-descriptions-item label="创建时间" label-align="center" align="left">
                {{ state.record.gmtModified }}
              </el-descriptions-item>
              <el-descriptions-item label="修改时间" label-align="center" align="left">
                {{ state.record.gmtModified }}
              </el-descriptions-item>
              <el-descriptions-item label="标签" label-align="center">
                <div class="info-tag">
                  <el-tag v-for="(item, index) in tags" :key="index" :type="item.type" class="tags">{{ item.text }}</el-tag>
                </div>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
        <el-card class="card" shadow="hover">
          <template #header>
            <div class="card-header-2" >
              <span><i class='fa fa-dot-circle-o'></i>&nbsp;&nbsp;&nbsp;测试集数据</span>
              <div class="alert">
                <el-icon><QuestionFilled /></el-icon>
                点击文件查看详细数据
              </div>
            </div>
          </template>
          <div class="demo-drawer-profile">
            <div class="file-box">
              <div class="file-color" @click="handleClick">
                <Row>
                  <Col span="2">
                    <Avatar :src=avatarUrl shape="square" icon="ios-person" size="large" />
                  </Col>
                  <div style="padding-left:10px;"></div>
                  <Col span="10">
                      <p>{{ state.record.failureDataSets.fileName }}</p>
                      <p>{{ state.record.failureDataSets.size }} KB</p>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <Divider/>
      <div class="fault-maintain">
        <div class="small-div-body">
          <el-card class="card" shadow="hover">
            <template #header>
              <div class="card-header-2" >
                <span><i class='fa fa-dot-circle-o'></i>&nbsp;&nbsp;&nbsp;故障记录</span>
                <el-button class="button" type="primary" text>添加</el-button>
              </div>
            </template>
            <div class="detail">
                <el-table :data="state.maintains"
                  :header-cell-style="{background: 'rgb(242,243,245)', color: 'rgb(0,0,20)', fonsSize: '18px',}"
                  :cell-style="{color: 'rgb(85,68,85)', fontWeight: '350'}">
                <el-table-column prop="id" label="记录编号" />
                <el-table-column prop="failureId" label="故障ID"/>
                <el-table-column prop="analysis" label="人工分析" :formatter="format"/>
                <el-table-column prop="isSolve" label="状态">
                  <template v-slot="scope">
                    <span v-if="scope.row.isSolve === false">未修复</span>
                    <span v-else>已修复</span>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180">
                  <template v-slot="scope">
                    <el-button link type="primary" @click="handleCheck(scope.row)"
                      ><el-icon><View /></el-icon> </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </div>
      </div>
      <Divider/>
      <div class="echart">
        <div class="small-div-body">
          <el-card class="card" shadow="hover">
            <div id="riskAssess" ref="riskAssessRef" :style="{ width: '100%', height: '650px' }"></div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref, reactive, onBeforeMount, onMounted, computed, nextTick } from 'vue';
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import apiFun from '../../api/api';
import * as echarts from "echarts";
import avatarUrl from '../../assets/icon/csv.png'
import { trendAnalysisOption } from '../../assets/js/echarts/trendAnalysis';
import { riskAssessmentOption } from '../../assets/js/echarts/riskAssessmentOption';
const recordId = ref();
const data = [
    {
      "id": "1",
      "name": "Roberta",
      "age": "39",
      "gender": "M"
    },
    {
      "id": "2",
      "name": "Oliver",
      "age": "25",
      "gender": "M"
    },
    {
      "id": "3",
      "name": "Shayna",
      "age": "18",
      "gender": "F"
    },
    {
      "id": "4",
      "name": "Fechin",
      "age": "18",
      "gender": "M"
    }
];
const tags = ref([
  { text: '标签1', type: 'success' },
  { text: '标签2', type: 'info' },
  { text: '标签3', type: 'warning' },
  { text: '标签4', type: 'danger' },
]);
let dialogVisible = ref(false);
let drawVisible = ref(false);
const dateData = reactive(['2023-06-01', '2023-06-02', '2023-06-03', '2023-06-04', '2023-06-05', '2023-06-06']);
const trendData = reactive([10, 15, 8, 12, 18, 5]);
const riskData = reactive([
  { value: 20, name: '高风险' },
  { value: 30, name: '中风险' },
  { value: 50, name: '低风险' },
]);
const state = reactive({
  record: {
    "id": 2,
    "userId": 2,
    "modelId": 10002,
    "gmtCreate": "",
    "gmtModified": "2023-07-05T11:45:12.000+00:00",
    "describe": "test",
    "title": "test",
    "courseId": 1,
    "failureDataSets": {
        "id": 1,
        "name": "test2",
        "failureId": 1,
        "describe": "test2",
        "courseId": 1,
        "url": "",
        "size": 0
    }
  },
  maintains: []
});
const form = reactive({
    id: '',
    describe: '',
  },
);

onBeforeMount(async () => {
  await getRecordDetail();
  await getMaintains();
});
onMounted(() => {
  initChart();
});

const getRecordDetail = async () => {
  recordId.value = route.query.id;
  await apiFun.repair.getRecordDetail(recordId.value).then((res) => {
    if(res.code === 200){
      state.record = res.data;
      state.record.gmtCreate = formatDate(state.record.gmtCreate);
      state.record.gmtModified = formatDate(state.record.gmtModified);
    }else{
      ElMessage.error("获取失败");
    }
  });
};

const format = (row, column) => {
  if(column.property === 'analysis'){
    if(row.analysis === '' || row.analysis === undefined || row.analysis === null){
      return '- -'
    }
    return row.analysis;
  }
}

const formatDate = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const getMaintains = async () => {
  await apiFun.repair.getMaintains(recordId.value).then((res) => {
    if(res.code === 200){
      console.log(res)
      state.maintains = res.data;
    }else{
      ElMessage.error("获取失败");
    }
  });
}

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
const handleCheck = (row) => {
  router.push({
    path:'/start',
    query:{id: row.id}
  })
  // console.log(row);
  // apiFun.repair.getMaintainDetail(recordId.value, row.id).then((res) => {
  //   if(res.code === 200){
  //     console.log(res);
  //   }else{
  //     ElMessage.error("获取失败");
  //   }
  // });
};

const handleAnalysis = () => {

  drawVisible.value = true;
}

const modelDetail = () => {
  router.push('/info')
};

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

//初始化echarts
function initChart() {
  // let trendAnalysis = echarts.init(document.getElementById("trendAnalysis"));
  // trendAnalysis.setOption(trendAnalysisOption(dateData, trendData));
  let riskAssess = echarts.init(document.getElementById("riskAssess"));
  riskAssess.setOption(riskAssessmentOption(riskData));
  window.onresize = function() {
    //自适应大小
    // trendAnalysis.resize();
    riskAssess.resize();
  };
  riskAssess.on('updateAxisPointer', function (event) {
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1;
      riskAssess.setOption({
        series: {
          id: 'pie',
          label: {
            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
          },
          encode: {
            value: dimension,
            tooltip: dimension
          }
        }
      });
    }
  });
}

const getRecommendDetail = (row) => {
  console.log(row);
}
</script>

<style scoped lang="less">
.box{
  flex-direction: column;
  box-sizing: border-box;
  position: sticky;
  top:0;
  width:100%;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.08);
  // overflow: auto;
  .box-title{
    text-align: left;
    padding-top: 22px;
    padding-left: 50px;
  }
  .title{
    font-size:18px;
    font-weight:bold;
  }
  .fault-repair-details {
    padding: 22px 50px 10px 50px;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 20px;
  h3{
    font-size: 18px;
    font-weight: 540;
  }
}
.content-bottom {
  width: 100%;
  display: flex;
  gap: 25px;
  margin-top: 20px;
}

.left {
  flex: 1;
  display: flex;
  gap: 25px;
  flex-direction: column;
  height: 100%;
}
.fault {
  max-height: 300px;
  text-align: left;
  overflow: auto;
}
.right {
  flex: 1;
  display: flex;
  gap: 25px;
  flex-direction: column;
  height: 100%;
}
.small-div {
  width: 100%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  border-radius: 2px;
  overflow: hidden;
}

.small-div-header {
  border: none;
  padding: 15px 20px;
  position: relative;
  overflow: hidden;
  text-align: left;
}

h3 {
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

.small-div-header::before{
  background-color: #4b89dc;
  content: "";
  position: absolute;
  top: 20%;
  left: -20px;
  width: 25px;
  height: 30px;
  border-radius: 100%;
}

.small-div-body {
  padding: 20px;
  padding-top: 0;
  font-size: 15px;
  font-weight: 400;
  color: #666666;
  line-height: 30px;
}

.label {
  width: 100%;
  margin: 15px;
  display: flex;
  padding: 0 20px 0 60px;
}

.label-name {
  color: #666666;
  width: calc(20% + 70px);
  padding-top: 0 !important;
  padding-right: 20px;
  padding-bottom: 4px;
  text-indent: 15px;
  word-break: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  text-align: left;
}

.label-content {
  width: calc(50% - 70px);
  margin-bottom: 5px;
  padding-top: 0;
  padding-bottom: 5px;
  position: relative;
  padding-right: 20px;
  text-align: left;
}

.label-mate {
  width: 50px;
}

.card {
  margin: 20px 0 20px 0;
  .demo-drawer-profile{
    font-size: 16px;
    text-align: left;
  }
  .card-header-2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10px;

    .alert {
      font-size: 10px;
    }
  }

  .detail {
    .status-create {
      display: flex;
      justify-content: space-between;
    }
  }
}

.fault-maintain {
  margin-top: 20px;
}

.recommend:hover {
  cursor: pointer;
  color: #409eff;
}

.line {
  text-align: center;
  width: 95%;
  height: 1px;
  border-top: solid #EFF2F7 1px;
  margin: 0 auto; /* 让分割线居中 */
}

.info-tag{
  // padding-top: 20px;
  .tags{
    margin-right: 10px;
  }

}
.el-tag.is-closable {
    margin-right: 10px;
}

.file-box{
  width: 100%;
  padding:0 200px 0 0;
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

.box-card{
  display: flex;
  width: 90%;
  padding: 0 0 0 60px;
  .card-header{
    display: flex;
    flex: 1;
    gap: 40px;
    .avatar{
      flex: 1;
    }
    .info{
      flex: 4;
      font-size: 14px;
      text-align: left;
      .person-info-list {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }

      .person-info-list li {
        margin-bottom: 10px;
      }

      .person-info-list li:last-child {
        margin-bottom: 0; /* 去除最后一个列表项的底部边距 */
      }
    }
  }
  .card-bottom{
    flex: 1;
    display: flex;
    align-items: center;
    gap: 35px;
    align-items: flex-start;

    .card-content {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      margin-left: 10px; /* 左边距为 10px */
    }

    .skills-list {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      margin-top: 0;
      margin-bottom: 0;
      text-align: left;
    }

    .skills-list li {
      flex-basis: 50%; /* 列宽度为父容器的一半 */
      margin-bottom: 5px;
    }
  }
}

.form-update{
  width: 100%;
  border: 1px solid #dcdfe6 ;
  padding: 10px;
  border-radius: 4px;
}
:deep(.el-drawer__title)  {
    font-size: 18px;
    color: #3b3d3f;
}
.echart{
  margin-top: 25px;
}
.colSty{
  display: inline-block;
}

.detail_text {
  display: inline-block;
  padding: 0 0 0 53px;
  padding-top: 0;
  font-size: 16px;
  font-weight: 400;
  color: #666666;
  line-height: 30px;
  margin: -30px 0 0 0;
}
// :deep(.el-card__body)  {
//     padding: 20px 100px 0 20px;
// }
</style>
<style src="src/assets/style/base.scss"></style>
