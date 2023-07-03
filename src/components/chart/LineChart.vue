<template>
  <div class="user_protocal_box">
    <!-- 折线图 -->
    <DayLinkRatioCharts :echartsData="dayLinkRatio" />
  </div>
</template>
 
<script>
import DayLinkRatioCharts from "./Echart.vue";
export default {
components: {
    DayLinkRatioCharts 
  },
  data () {
    return {
      dayLinkRatio:{//日环比
        option:{
          tooltip: {
            trigger: "axis",
          },
          legend: {
            //标记属性
            data: ['今日','昨日'],
            orient: "horizontal", //标记排列显示
            top:20, //标记位置
            right:23, //标记位置
            icon:'rect',
            itemWidth: 16,
            itemHeight:3,
            itemGap:16,
            formatter: [//用富文本组件实现图例与文字对齐的关键是富文本的格式转换
              '{a|{name}}'
            ].join('\n'),
            textStyle: {
              color:'rgba(159,216,253,0.6)',
              fontSize:13,
              height:20,//图例字体高度
              lineHeight:22, //图例字体行高
              rich:{//用富文本组件实现图例与文字对齐
                a:{
                  verticalAlign: 'middle'//图例与文字对齐方式
                }
              }
            },
          },
          grid:{
            //绘图区调整
            left:23,
            right:23,
            bottom:20,
            containLabel: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: ["0点","1点","2点","3点","4点","5点","6点","7点","8点","9点","10点","11点","12点","13点","14点","15点","16点","17点","18点","19点","20点","21点","22点","23点"],//x轴数据
            axisLabel: {
              //坐标轴文字显示样式
              lineHeight: 15, //字体行高
              fontSize:13,
              fontNum: 15, //每行显示字数
              rotate: 0, //文字旋转角度，0不旋转
              color:'rgba(159,216,253,1)',
              interval: 2//刻度间隔个数
            },
            axisLine: {//坐标轴线样式
              lineStyle: {
                color: 'rgba(159,216,253,0.4)',
                type: 'solid'
              },
            },
            axisTick:{//x轴刻度设置
              alignWithLabel: true,//刻度线与点对齐
              length:4,//刻度线的长度
              interval: 2,//刻度间隔个数
              show:true // 不显示坐标轴刻度线
            },
          },
          yAxis:{ 
            name:'',
            type: "value",
            axisLabel:{
              color:'rgba(159,216,253,1)'
            },
            splitLine: {
              show: true,//是否显示网格线
              lineStyle: {
                color: "rgba(159,216,253,0.15)",
                textShadow: '0px 2px 4px 0px rgba(0,0,0,0.50)',
                type: "solid"
              }    
            },
            axisLine:{show:false},//隐藏y轴
          },
          series: [
            {
              name: "今日",
              data:  [13.3, 11.34, 15.44, 13.53, 12.98, 12.36, 13.14, 14.46, 12.36, 12.45, 13.19, 10.64, 11.95, 12.2, 15.94, 15.73, 17.95, 14.94, 12.34, 17.55, 15.5, 15.82, 12.99, 15.98],
              type: "line",
              color:'#46A0FA',
              showSymbol: false,//不显示圆点，hover时显示
              smooth:true,//折线变为曲线
              // yAxisIndex:1,
              areaStyle: {//曲线阴影
                opacity: 0.8,
                color:  new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(70,160,250,0.4)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(70,160,250,0)", // 100% 处的颜色
                  }
                ])
              },
            },
            {
              name: "昨日",
              data: [13.25, 12.96, 11.82, 14.66, 14.63, 12.75, 12.93, 15.29, 18.51, 17.03, 15.18, 15.81, 18.18, 19.14, 14.2, 7.71, 10, 15, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5,],
              type: "line",
              color:'#3FD4CF',
              smooth:true,//折线变为曲线
              showSymbol: false,//不显示圆点，hover时显示
              // yAxisIndex:0,
              areaStyle: {//曲线阴影
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[
                  {
                    offset: 0,
                    color: "rgba(63,212,207,0.4)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(63,212,207,0)", // 100% 处的颜色
                  }]),
              },
            }
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