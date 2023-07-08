<template>
  <div class="box">
    <div class="box-title">
      <p class="title">维修详情</p>
    </div>
    <div class="fault-repair-details">
      <div class="small-div">
        <div class="small-div-header">
            <h3>模型信息</h3>
        </div>
        <div class="small-div-body">
          <el-card class="card" shadow="hover">
            <template #header>
              <div class="card-header-2" >
                <span><i class='fa fa-dot-circle-o'></i>&nbsp;&nbsp;&nbsp;{{ dataset.name }}</span>
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
                  {{ dataset.name }}
                </el-descriptions-item>
                <el-descriptions-item label="模型大小" label-align="center" align="left">
                  {{ dataset.size }}
                </el-descriptions-item>
                <el-descriptions-item label="状态" label-align="center" align="left">
                  {{ dataset.statue }}
                </el-descriptions-item>
                <el-descriptions-item label="创建时间" label-align="center" align="left">
                  {{ dataset.createdDate }}
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
                </Row>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div>
          <div class="fault-maintain">
              <div class="small-div">
                  <div class="small-div-header">
                      <h3>故障信息</h3>
                  </div>
                  <div class="small-div-body">
                    <el-descriptions
                      direction="vertical"
                      :column="4"
                      :size="large"
                      border>
                      <el-descriptions-item label="故障类型">{{ fault.type }}</el-descriptions-item>
                      <el-descriptions-item label="故障发生时间">{{ fault.occurredAt }}</el-descriptions-item>
                      <el-descriptions-item label="故障描述" :span="2" width="400px">{{ fault.description }}</el-descriptions-item>
                    </el-descriptions>
                  </div>
              </div>
          </div>
      </div>
      <div class="content-bottom">
          <div class="left">
            <div class="small-div">
              <div class="small-div-header">
                  <h3>故障原因</h3>
              </div>
              <div class="small-div-body fault">
                {{ faultAnalysis.cause }}
              </div>
              <div class="small-div-body fault" v-if="faultAnalysis.cause === ''">
                <el-empty description="未找到故障原因" image-size="130">
                </el-empty>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="small-div">
              <div class="small-div-header">
                  <h3>解决方案</h3>
              </div>
              <div class="fault small-div-body ">
                {{ faultAnalysis.solution }}
              </div>
              <div class="fault small-div-body">
                <el-empty description="未找到解决方案" image-size="90" v-if="faultAnalysis.solution === ''">
                  <el-button type="primary">重新上传分析</el-button>
                </el-empty>
              </div>
            </div>
          </div>
      </div>
      <div class="content-bottom">
        <div class="left">
          <div class="small-div">
            <div class="small-div-header">
              <h3>相似历史故障</h3>
            </div>
            <div class="small-div-body">
              <el-empty description="未找到相似历史故障" v-if="recommendations.length === 0">
                <el-button type="primary">重新上传分析</el-button>
              </el-empty>
              <el-table  class="label" :data="recommendations" style="width: 80%" size="large" @row-click="getRecommendDetail()"
                :header-cell-style="{
                  background: 'rgb(242,243,245)',
                  color: 'rgb(0,0,20)',
                  fonsSize: '18px',
                }"
                :cell-style="{color: 'rgb(85,68,85)', fontWeight: '350'}">
                <el-table-column prop="fault" label="故障记录" width="210" />
                <el-table-column prop="fault" label="解决方案" width="300" />
                <el-table-column prop="mate" label="相似度" />
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="content-bottom">
        <div class="left">
          <div class="small-div">
            <div class="small-div-header">
                <h3>人员分析</h3>
            </div>
            <el-dialog
              v-model="dialogVisible"
              width="55%">
              <div class="small-div-body fault box-card">
                <div class="card-header">
                  <div class="avatar">
                    <el-image style="width: 100px; height: 120px" :src="persons[0].avatar" :fit="fit" />
                  </div>
                  <div class="info">
                    <ul class="person-info-list">
                      <li>姓名： {{ persons[0].name }}</li>
                      <li>年龄： {{ persons[0].age }}</li>
                      <li>性别： {{ persons[0].gender }}</li>
                      <li>职业： {{ persons[0].occupation }}</li>
                    </ul>
                  </div>
                </div>
                <div class="card-bottom">
                  <div class="title">技能和专长：</div>
                  <div class="card-content">
                    <ul class="skills-list">
                      <li v-for="(skill, index) in persons[0].skills" :key="index">-  {{ skill }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </el-dialog>
            <div class="small-div-body">
              <el-empty description="暂无人员分析" v-if="persons.length === 0">
              </el-empty>
              <el-table  class="label" :data="persons" style="width: 80%" size="large" @row-click="personDetail()"
                :header-cell-style="{
                  background: 'rgb(242,243,245)',
                  color: 'rgb(0,0,20)',
                  fonsSize: '18px',
                }"
                :cell-style="{color: 'rgb(85,68,85)', fontWeight: '350'}">
                <el-table-column prop="name" label="姓名" width="150" />
                <el-table-column prop="occupation" label="职业" />
                <el-table-column prop="gender" label="解决故障" width="300" />
                <el-table-column prop="gender" label="时间" width="180" />
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="echart">
        <div class="small-div">
          <div class="small-div-header">
              <h3>故障趋势分析</h3>
          </div>
          <div class="small-div-body">
            <div id="trendAnalysis" ref="trendAnalysisRef" :style="{ width: '100%', height: '400px' }"></div>
          </div>
        </div>
      </div>
      <div class="echart">
        <div class="small-div">
          <div class="small-div-header">
              <h3>故障风险评估</h3>
          </div>
          <div class="small-div-body">
            <div id="riskAssess" ref="riskAssessRef" :style="{ width: '100%', height: '300px' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, nextTick } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();
import * as echarts from "echarts";
import avatarUrl from '../../assets/icon/csv.png'
import { trendAnalysisOption } from '../../assets/js/echarts/trendAnalysis';
import { riskAssessmentOption } from '../../assets/js/echarts/riskAssessmentOption';
const dataset = reactive({
  name: '数据集名称',
  size: '100GB',
  createdDate: '2023-06-01',
  statue: 0,
});
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
])
const fault = reactive({
  type: '故障类型',
  description: '故障描述',
  occurredAt: '2023-06-03 10:00:00',
});
const repairStatus = reactive({
  repairPerson: '维修人员A',
  startTime: '2023-06-04 09:00:00',
  endTime: '2023-06-05 13:00:00',
});
const faultAnalysis = reactive({
  // cause: '网络连接故障：可能由于网络中断、不稳定的连接或配置错误导致。资源耗尽：系统资源（如内存、磁盘空间）耗尽，导致应用程序无法正常运行。配置错误：错误的配置参数或设置可能导致系统出现问题。',
  // solution: '检查网络连接：确保网络连接正常，检查网络设备、电缆和路由器是否正常工作。如果发现问题，修复或更换故障设备。优化资源利用：分析系统资源使用情况，查找资源耗尽的原因。清理不必要的文件或进程，增加可用资源。如果需要，考虑升级硬件或调整系统配置。检查配置设置：仔细检查系统配置文件和参数设置，确保其正确性。如果发现配置错误，及时进行修复并重新启动应用程序。',
  cause: '',
  solution: '',
});
const recommendations = reactive([
  {recordId: '111', fault: '规则筛选', mate: '100%'},
  {recordId: '222', fault: '规则筛选', mate: '99%'},
]);
let dialogVisible = ref(false);
const persons = reactive([{
  avatar: 'src/assets/image/tx.png',
  name: "John Doe",
  age: 30,
  gender: "男",
  occupation: "工程师",
  skills: ["技能1", "技能2", "技能3","技能1", "技能2", "技能3"]
}]);
const dateData = reactive(['2023-06-01', '2023-06-02', '2023-06-03', '2023-06-04', '2023-06-05', '2023-06-06']);
const trendData = reactive([10, 15, 8, 12, 18, 5]);
const riskData = reactive([
  { value: 20, name: '高风险' },
  { value: 30, name: '中风险' },
  { value: 50, name: '低风险' },
]);

onMounted(() => {
  initChart();
});

//查看csv
const handleClick = () => {// 添加表头信息
  let keys = Object.keys(data[0]);
  const header = {};
  keys.forEach(item => {
    header[item] = item;
  })
  data.unshift(header);
  Heiho(data,{ max: 100, title: '在线浏览.csv'});
};
const modelDetail = () => {
  router.push('/info')
};
const personDetail = () => {
  dialogVisible.value = true;
}
//初始化echarts
function initChart() {
  let trendAnalysis = echarts.init(document.getElementById("trendAnalysis"));
  trendAnalysis.setOption(trendAnalysisOption(dateData, trendData));
  let riskAssess = echarts.init(document.getElementById("riskAssess"));
  riskAssess.setOption(riskAssessmentOption(riskData));
  window.onresize = function() {
    //自适应大小
    trendAnalysis.resize();
    riskAssess.resize();
  };
}
const getDetail = () => {

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
.fault-repair-details {
  padding: 22px 50px 10px 50px;
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
  margin: 10px 0 10px 0;
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
.echart{
  margin-top: 25px;
}

:deep(.el-card__body)  {
    padding: 20px 100px 0 20px;
}
</style>
<style src="src/assets/style/base.scss"></style>