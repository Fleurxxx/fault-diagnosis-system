<template>
  <div class="box">
      <div id="stack_main" class="bar"></div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import * as echarts from 'echarts'
import 'echarts-gl';

const info = () => {

  var chartDom = document.getElementById('stack_main');
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00', '#FDED63'],
    title: {
      // text: '近期结果分类记录'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['故障0', '故障1', '故障2', '故障3', '故障4', '故障5']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['测试7', '测试8', '测试8', '测试10', '测试11', '测试12', '测试13']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '故障0',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)'
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [240, 332, 281, 334, 350, 340, 280]
      },
      {
        name: '故障1',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0, 221, 255)'
            },
            {
              offset: 1,
              color: 'rgb(77, 119, 255)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 282, 111, 327, 220, 340, 310]
      },
      {
        name: '故障2',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(55, 162, 255)'
            },
            {
              offset: 1,
              color: 'rgb(116, 21, 219)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 201, 371, 190, 130, 220]
      },
      {
        name: '故障3',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 0, 135)'
            },
            {
              offset: 1,
              color: 'rgb(135, 0, 157)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 402, 231, 315, 190, 230, 120]
      },
      {
        name: '故障4',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 191, 0)'
            },
            {
              offset: 1,
              color: 'rgb(224, 62, 76)'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 302, 181, 296, 210, 290, 150]
      },
      {
        name: '故障5',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        label: {
          show: true,
          position: 'top'
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#FDED63'
            },
            {
              offset: 1,
              color: '#FFCB22'
            }
          ])
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 302, 181, 307, 210, 290, 150]
      }
    ]
  };

  option && myChart.setOption(option);

}

onMounted(() => {
  info();
})

</script>
<style scoped lang='less'>
.box{
  width: 100%;
  height: 100%;
}
.bar {
  width: 100%;
  height: 273px;
}
</style>
