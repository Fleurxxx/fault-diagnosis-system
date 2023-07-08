<template>
  <!-- 折现面积图 -->
  <div>
    <!-- 准备好一个盒子必须有宽高这里的id 必须和下面获取的节点一致 -->
    <div id="main" class="pic"></div>
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
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;
       // 指定配置项
      option = {
        // 设置标题的内容
        title: {
          text: "用户来源",
        },
        // 图表的提示框组件
        tooltip: {
        // 触发的方式 坐标轴
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        // 图例组件
        legend: {
        //series有name了，这里的data可以删除掉
          data: ["华东", "华南", "华北", "西部", "其他"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        // 网格设置 grid 可以控制 线形图 柱状图 图标大小
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
           // 是否显示刻度标签
          containLabel: true,
        },
        //  设置x轴的相关配置
        xAxis: [
          {
            type: "category",
            // 线条和y轴是否有缝隙
            boundaryGap: false,
            // data: obj.xlist,
            data:[2528,3018,4928,1858,3002,3695],
          },
        ],
        // 设置x轴的相关配置
        yAxis: [
          {
            type: "value",
          },
        ],
        // 系统图表配置，决定显示哪种类型的图表
        series: [
          {
            name: "华东",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "华南",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "华北",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "西部",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "其他",
            type: "line",
            stack: "Total",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };

      option && myChart.setOption(option);

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
