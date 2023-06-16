``<template>
  <div class="user_protocal_box">
    <!-- 3d柱状图 -->
    <BuildEletricCharts :echartsData="buildEletric" />
  </div>
</template>
<script>
import BuildEletricCharts from "./Echart.vue";
let barWidth = 20;
var lastColor = {//3d柱状图柱子两个侧面的颜色
  type: "linear",
  x: 0,
  x2: 1,
  y: 0,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      color: '#1FA6AA',
    },
    {
      offset: 0.45,
      color: '#1FA6AA',
    },
    {
      offset: 0.5,
      color: '#66DFD7',
    },
    {
      offset: 1,
      color: '#30C9C9',
    },
  ],
};
var curColor = {//3d柱状图柱子两个侧面的颜色
  type: "linear",
  x: 0,
  x2: 1,
  y: 0,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      color: '#2B78CF',
    },
    {
      offset: 0.45,
      color: '#2B78CF',
    },
    {
      offset: 0.5,
      color: '#58AFFB',
    },
    {
      offset: 1,
      color: '#46A0FA',
    },
  ],
};
export default {
components: {
    BuildEletricCharts
  },
  data () {
    return {
      buildEletric: {//建筑用电情况(kwh)
        option: {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow", //鼠标悬停显示样式
              shadowStyle: {
                shadowColor: "rgba(0, 0, 0, 0.5)",
                shadowBlur:2,
              },
            },
            formatter: function(params) {
              var str = params[0].name + ":";
              params.filter(function(item) {
                if (item.componentSubType == "bar") {
                  if(item.seriesName=='昨天'){
                    str += "<div id='id_flex3'>"+
                      "<p id='yesterday_circle1'></p>"+
                      "<p id='id_flex'>"+item.seriesName+ "\u00a0\u00a0" +"<span id='fb'>"+item.value+"</span>"+"</p>"+
                    "</div>"
                  }else{
                    str += "<div id='id_flex4'><p id='yesterday_circle2'></p><p id='id_flex2'>" + item.seriesName + "\u00a0\u00a0" + "<span id='fb'>"+item.value+"</span>"+"</p></div>"
                  }
                }
              });
              return str;
            },
          },
          grid: {
            left:23,
            right:23,
            bottom:12,
            containLabel: true,
          },
          legend: {
            show: false,
            data: ["昨天", "今天"],
            top:20, //标记位置
            right:23, //标记位置
            icon:'rect',
            textStyle: {
              color: "rgba(159,216,253,0.4)",
              fontSize: "13",
            },
          },
          dataZoom:[{//展示不下时显示水平滚动条
              show: true,
              backgroundColor: "rgba(159,216,253,0.15)",
              borderRadius: 5,
              borderColor:"none",
              height: 8,
              startValue: 0, // 从头开始。
              endValue: 3, // 一次性展示n个。
              moveHandleIcon: "none",
              moveHandleSize: 10,
              zoomLock: true,
              brushSelect: false,
              showDataShadow: false,
              fillerColor: "#58AFFB",
              handleIcon: "path://M512,512m-448,0a448,448,0,1,0,896,0a448,448,0,1,0,-896,0Z",//滚动条圆角--官方推荐
              handleSize: "70%",
              handleColor:"#58AFFB",
              textStyle: {
                color: "transparent",
              },
              bottom: 2,
            }
          ],
          xAxis: {
            data: ['高一教学楼', '高二教学楼', '高三教学楼', '女生宿舍楼', '男生宿舍楼', '行政楼', '食堂', '音乐厅', '国际交流中心', '实验楼', '图书馆', '体育馆'],
            boundaryGap: true,
            //坐标轴
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "rgba(159,216,253,0.4)"
              },
              textStyle: {
                color: "#000",
                fontSize:20,
              },
            },
            type: "category",
            axisLabel: {
              //坐标轴文字显示样式
              lineHeight: 18, //字体行高
              fontNum: 15, //每行显示字数
              rotate: 0, //文字旋转角度，0不旋转
              textStyle: {
                color: "rgba(159,216,253,0.4)",
                fontWeight: 'normal',
                fontSize: "13",
              },
            },
            axisTick: {
              textStyle: {
                color: "#fff",
                fontSize: "16",
              },
              show: false,
            },
            splitLine: { show: false },
          },
          yAxis: {
            type: "value",
            //坐标轴
            axisLine: {
              show: false,
              lineStyle: {
                width: 1,
                color: "#214776",
              },
              textStyle: {
                color: "#fff",
                fontSize: "10",
              },
            },
            axisTick: {
              show: false,
            },
            //坐标值标注
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(159,216,253,0.4)",
              },
            },
            //分格线
            splitLine: {
              lineStyle: {
                color: "#13365f",
              },
            },
          },
          series: [
            {
              z: 1,
              name: "昨天",
              type: "bar",
              barWidth: barWidth,
              barGap: "0%",
              data: [10.43, 23, 25.14, 27.32, 59.9, 35.82, 29.19, 19.32, 0, 2.22, 0.39, 4.1],
              itemStyle: {
                normal: {
                  color: lastColor,
                },
              },
            },
            {
              z: 2,
              name: "昨天",
              type: "pictorialBar",
              data: [10.43, 23, 25.14, 27.32, 59.9, 35.82, 29.19, 19.32, 0, 2.22, 0.39, 4.1],
              symbol: "diamond",
              symbolPosition: "start",
              symbolOffset: ["-75%", "0%"],//底部切片位置，[x,y]
              symbolSize: [0, 0],//底部切片尺寸，设置为0则不显示[宽，高]
              itemStyle: {
                normal: {
                  color: lastColor,
                },
              },
              tooltip: {
                show: false,
              },
            },
            {
              z: 3,
              name: "昨天",
              type: "pictorialBar",
              symbolPosition: "end",
              data: [10.43, 23, 25.14, 27.32, 59.9, 35.82, 29.19, 19.32, 0, 2.22, 0.39, 4.1],
              symbol: "diamond",
              symbolOffset: ["-75%", "-20%"],//底部切片位置，[x,y]
              symbolSize: [barWidth , 5],//底部切片尺寸，设置为0则不显示[宽，高]
              itemStyle: {
                normal: {
                  borderWidth: -5,
                  color: '#BEF4ED',
                },
              },
              tooltip: {
                show: false,
              },
            },
            {
              z: 1,
              name: "今天",
              type: "bar",
              barWidth: barWidth,
              barGap: "50%",
              data: [13.6, 35.43, 39.61, 35.58, 57.8, 56.58, 45.73, 39.77, 0, 2.89, 1.16, 5.93],
              itemStyle: {
                normal: {
                  color: curColor,
                },
              },
            },
            {
              z: 2,
              name: "今天",
              type: "pictorialBar",
              data: [13.6, 35.43, 39.61, 35.58, 57.8, 56.58, 45.73, 39.77, 0, 2.89, 1.16, 5.93],
              symbol: "diamond",
              symbolPosition: "start",
              symbolOffset: ["75%", "0%"],
              symbolSize: [0, 0],
              itemStyle: {
                normal: {
                  color: curColor,
                },
              },
              tooltip: {
                show: false,
              },
            },
            {
              z: 3,
              name: "今天",
              type: "pictorialBar",
              symbolPosition: "end",
              data: [13.6, 35.43, 39.61, 35.58, 57.8, 56.58, 45.73, 39.77, 0, 2.89, 1.16, 5.93],
              symbol: "diamond",
              symbolOffset: ["75%", "-20%"],
              symbolSize: [barWidth , 5],
              itemStyle: {
                normal: {
                  borderWidth: -5,
                  color: '#C4E8FE',
                },
              },
            },
          ],
        },
      },
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
