<!--
 * @Author: Fleurxxx
 * @Date: 2022-06-13 11:03:49
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-06-14 15:36:56
 * @Description: 测试echarts
-->
<template>
  <div>
    <div id="chartTest"></div>
  </div>
</template>

<script>
import { getChart } from "@/apis/mockTest";
import { reactive, toRefs, onMounted } from "vue";
import echarts from "../utils/echartsUtil";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from "echarts/charts";
// 注册必须的组件
echarts.use([BarChart]);
export default {
  setup() {
    const state = reactive({});

    onMounted(() => {
      getChart().then((res) => {
        initChart(res.data.xDatas, res.data.yDatas);
      });
    });

    /**
     * @description: 渲染图表
     * @param {*} xDatas x轴数据
     * @param {*} yDatas y轴数据
     * @return {*}
     * @Author: liuxin
     */
    const initChart = (xDatas, yDatas) => {
      // 接下来的使用就跟之前一样，初始化图表，设置配置项
      const myChart = echarts.init(document.getElementById("chartTest"));
      myChart.setOption({
        grid: {
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          show: false,
        },
        xAxis: {
          type: "category",
          name: "日期",
          data: xDatas,
          axisLabel: {
            rotate: xDatas.length > 10 ? -20 : 0,
          },
        },
        yAxis: {
          type: "value",
          name: "人数",
        },
        series: [
          {
            name: "客流流量",
            data: yDatas,
            type: "bar",
            barMaxWidth: "40%",
          },
        ],
      });
    };

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
#chartTest {
  width: 100%;
  height: 600px;
}
</style>
