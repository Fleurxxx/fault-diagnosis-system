<template>
  <div class="header">
    <h3>维修详情</h3>
  </div>
  <div class="fault-repair-details">
    <div class="small-div">
      <div class="small-div-header">
          <h3>数据集信息</h3>
      </div>
      <div class="small-div-body">
          <div class="line"></div>
          <div class="label">
              <div class="label-name">数据集名称</div>
              <div class="label-content">{{ dataset.name }}</div>
          </div>
          <div class="line"></div>
          <div class="label">
              <div class="label-name">数据集大小</div>
              <div class="label-content">{{ dataset.size }}</div>
          </div>
          <div class="line"></div>
          <div class="label">
              <div class="label-name">数据集创建日期</div>
              <div class="label-content">{{ dataset.createdDate }}</div>
          </div>
      </div>
    </div>
    <div class="content-bottom">
        <div class="left">
            <div class="small-div">
                <div class="small-div-header">
                    <h3>故障信息</h3>
                </div>
                <div class="small-div-body">
                    <div class="label">
                        <div class="label-name">故障类型</div>
                        <div class="label-content">{{ fault.type }}</div>
                    </div>
                    <div class="line"></div>
                    <div class="label">
                        <div class="label-name">故障描述</div>
                        <div class="label-content">{{ fault.description }}</div>
                    </div>
                    <div class="line"></div>
                    <div class="label">
                        <div class="label-name">故障发生时间</div>
                        <div class="label-content">{{ fault.occurredAt }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="small-div">
                <div class="small-div-header">
                    <h3>维修状态</h3>
                </div>
                <div class="small-div-body">
                    <div class="label">
                        <div class="label-name">员工ID号</div>
                        <div class="label-content">{{ dataset.name }}</div>
                    </div>
                    <div class="line"></div>
                    <div class="label">
                        <div class="label-name">姓名</div>
                        <div class="label-content">{{ dataset.name }}</div>
                    </div>
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
</template>

<script setup>
import { ref, reactive, onMounted, computed, nextTick } from 'vue';
import * as echarts from "echarts";
const dataset = reactive({
  name: '数据集名称',
  size: '100GB',
  createdDate: '2023-06-01',
});
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
  cause: '网络连接故障：可能由于网络中断、不稳定的连接或配置错误导致。资源耗尽：系统资源（如内存、磁盘空间）耗尽，导致应用程序无法正常运行。配置错误：错误的配置参数或设置可能导致系统出现问题。',
  solution: '检查网络连接：确保网络连接正常，检查网络设备、电缆和路由器是否正常工作。如果发现问题，修复或更换故障设备。优化资源利用：分析系统资源使用情况，查找资源耗尽的原因。清理不必要的文件或进程，增加可用资源。如果需要，考虑升级硬件或调整系统配置。检查配置设置：仔细检查系统配置文件和参数设置，确保其正确性。如果发现配置错误，及时进行修复并重新启动应用程序。',
});
const trendAnalysisOptions = reactive({
  // 故障趋势分析的 ECharts 配置项
  xAxis: {
    type: 'category',
    data: ['2023-06-01', '2023-06-02', '2023-06-03', '2023-06-04', '2023-06-05', '2023-06-06'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '故障次数',
      type: 'line',
      data: [10, 15, 8, 12, 18, 5],
    },
  ],
});
const riskAssessmentOptions = reactive({
  // 故障风险评估的 ECharts 配置项
  tooltip: {
    trigger: 'item',
  },
  legend: {
    data: ['高风险', '中风险', '低风险'],
  },
  series: [
    {
      name: '风险评估',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [
        { value: 20, name: '高风险' },
        { value: 30, name: '中风险' },
        { value: 50, name: '低风险' },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});
// onMounted(() => {
//   const drawLine = () => {
//     const trendAnalysis = echarts.init(document.getElementById("trendAnalysis"));
//     trendAnalysis.setOption(trendAnalysisOptions)
//     const riskAssess = echarts.init(document.getElementById("riskAssess"));
//     riskAssess.setOption(riskAssessmentOptions);
//   }
//   drawLine();
// });
onMounted(() => {
  initChart();
});

// 基础配置一下Echarts
function initChart() {
  let trendAnalysis = echarts.init(document.getElementById("trendAnalysis"));
  trendAnalysis.setOption(trendAnalysisOptions);
  let riskAssess = echarts.init(document.getElementById("riskAssess"));
  riskAssess.setOption(riskAssessmentOptions);
  window.onresize = function() {
    //自适应大小
    trendAnalysis.resize();
    riskAssess.resize();
  };
}
// onMounted(async () => {
//   await nextTick();
//   const drawLine = () => {
//     console.log(document.getElementById('trendAnalysis'))
//     console.log(document.getElementById('riskAssess'))
//     const trendAnalysis = echarts.init(document.getElementById('trendAnalysis'));
//     trendAnalysis.setOption(trendAnalysisOptions);
//     const riskAssess = echarts.init(document.getElementById('riskAssess'));
//     riskAssess.setOption(riskAssessmentOptions);
//   };
//   drawLine();
// });
const trendAnalysisRef = ref();
// const riskAssessRef = ref('riskAssessRef');
const initTrend = () => {
  console.log(trendAnalysisRef)
  const trendAnalysisRefEcharts = echarts.init(trendAnalysisRef);
  window.addEventListener("resize", function () {
    trendAnalysisRefEcharts.resize();
  });
  trendAnalysisRefEcharts.setOption(trendAnalysisOptions);
};
// const initRisk = () => {
//   const riskAssessEcharts = echarts.init(riskAssessRef.value);
//   window.addEventListener("resize", function () {
//     riskAssessEcharts.resize();
//   });
//   riskAssessEcharts.setOption(riskAssessmentOptions);
// };
const getDetail = () => {

}
// onMounted(() => {
//   getDetail();
//   // console.log(trendAnalysisRef.value);
//   // console.log(riskAssessRef.value);
//   // initTrend();
//   // initRisk();
// });

const data = ref([
{value:67,name:'A'},
{value:40,name:'B'},
{value:58,name:'D'},
{value:85,name:'E'},
])

const option = computed(()=>{
 return {
xAxis: {
type: 'category',
data: data.value.map(el=>el.name)
 },
yAxis: {
type: 'value'
 },
 series: [
 {
 data: data.value.map(el=>el.value),
type: 'line'
 }
 ]

}
})
</script>

<style scoped lang="less">
.chart {
  height: 400px;
  height: 500px;
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
  max-height: 280px;
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
}

.label-name {
  color: #666666;
  width: calc(30% + 20px);
  padding-top: 0 !important;
  padding-right: 20px;
  padding-bottom: 4px;
  text-indent: 15px;
  word-break: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.label-content {
  width: calc(70% - 20px);
  margin-bottom: 5px;
  padding-top: 0;
  padding-bottom: 5px;
  position: relative;
  padding-right: 20px;
}

.line {
  text-align: center;
  width: 95%;
  height: 1px;
  border-top: solid #EFF2F7 1px;
  margin: 0 auto; /* 让分割线居中 */
}
.echart{
  margin-top: 25px;
}
</style>
<style src="src/assets/style/base.scss"></style>