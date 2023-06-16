<template>
  <!-- 折现面积图 -->
  <div>
    <!-- 准备好一个盒子必须有宽高这里的id 必须和下面获取的节点一致 -->
    <div
        id="today-users-chart"
        class="pic"
      ></div>
  </div>
</template>

<script>
// 引入eCharts文件
import * as echarts from "echarts";
import { ref, toRefs, reactive, onMounted } from "vue";

export default {

  setup(props) {


    onMounted(() => {


      // 初始化实例对象 echarts.init(dom容器)
      const chartDom = document.getElementById('today-users-chart')
      const chart = echarts.init(chartDom)
      chart.setOption({
        color: '#3398db',
        tooltip: {},
        xAxis: {
          type: 'category',
          data:['feature0','feature1','feature2','feature3','feature4','feature6','feature7','feature8','feature9','feature10','feature11', 'feature12','feature13', 'feature14'],
          // data:[2528,3018,4928,1858,3002,3695],
          axisLabel:{
            interval: 0
          }
          // show: false
          // boundaryGap: false
        }, // x轴
        yAxis: {
          show: false
        }, // y轴
        // 一个series就是一个图表
        series: [
          {
            type: 'bar',
            data: [0, 182, 50, 334, 390, 330, 220, 150, 82, 200, 134, 290, 330, 150],
            barWidth: '100%',
            // areaStyle: {
            //   color: 'purple'
            // },
            // lineStyle: {
            //   width: 0
            // },
            // itemStyle: {
            //   opacity: 0
            // },
            // smooth: true
          }
        ],
        grid: {
          top: 0,
          left: 0,
          right: 0,
          // bottom: 0
        }
      })


    });

  },
};
</script>
<style scoped lang="scss">
  .pic{
    width:800px;
    height:400px;
  }
</style>
