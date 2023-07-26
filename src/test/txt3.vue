<template>
  <div class="table-echarts">
      <div :id="id" style="width:100%;height:100%;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "table-echarts",
  props: {
      id: {
          type: String,
          default: "echarts",
      },
  },
  data() {
      return {};
  },
  watch: {},
  mounted() {
      this.initEcharts();
  },
  methods: {
      initEcharts() {
          let xAxisData = [
              "2020-9-23",
              "2020-9-24",
              "2020-9-25",
              "2020-9-26",
              "2020-9-27",
              "2020-9-28",
              "2020-9-28",
          ];
          let colors = [
              "#66CCCC",
              "#CCFF66",
              "#FF99CC",
              "#FF9999",
              "#FFFF66",
              "#FFCC00",
              "#FF9900",
              "#CC3399",
              "#CCFF99",
          ];
          let option = {
              color: colors,
              tooltip: {
                  trigger: "axis",
                  axisPointer: {
                      snap: true,
                  },
              },
              legend: {
                  data: ["浏览次数", "访问次数", "表单提交量"],
                  itemGap: 20,
                  left: "0%",
              },
              xAxis: {
                  type: "category",
                  boundaryGap: false,
                  data: xAxisData,
              },
              yAxis: {
                  type: "value",
              },
              series: [
                  {
                      name: "浏览次数",
                      data: [820, 932, 901, 934, 1290, 1330, 1320],
                      type: "line",
                      smooth: true,
                      symbolSize: 10,
                      areaStyle: {
                          color: new echarts.graphic.LinearGradient(
                              0,
                              0,
                              0,
                              1,
                              [
                                  {
                                      offset: 0,
                                      color: "#66CCCC",
                                  },
                                  {
                                      offset: 1,
                                      color: "#fff",
                                  },
                              ]
                          ),
                      },
                  },
                  {
                      name: "访问次数",
                      data: [120, 222, 401, 234, 3290, 430, 820],
                      type: "line",
                      smooth: true,
                      symbolSize: 10,
                      areaStyle: {
                          color: new echarts.graphic.LinearGradient(
                              0,
                              0,
                              0,
                              1,
                              [
                                  {
                                      offset: 0,
                                      color: "#CCFF66",
                                  },
                                  {
                                      offset: 1,
                                      color: "#fff",
                                  },
                              ]
                          ),
                      },
                  },
                  {
                      name: "表单提交量",
                      data: [1120, 322, 101, 534, 890, 230, 520],
                      type: "line",
                      smooth: true,
                      symbolSize: 10,
                      areaStyle: {
                          color: new echarts.graphic.LinearGradient(
                              0,
                              0,
                              0,
                              1,
                              [
                                  {
                                      offset: 0,
                                      color: "#FF99CC",
                                  },
                                  {
                                      offset: 1,
                                      color: "#fff",
                                  },
                              ]
                          ),
                      },
                  },
              ],
          };
          let myChart = echarts.init(document.getElementById(`${this.id}`));
          myChart.clear();
          myChart.setOption(option, true);
          window.addEventListener("resize", () => {
              myChart.resize();
          });
      },
  },
};
</script>

<style lang='less' scoped>
.table-echarts {
  width: 100%;
  height: 436px;
}
</style>
