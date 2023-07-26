<template>
  <div id="pie_main" class="pic"></div>
</template>

<script setup>
import * as echarts from 'echarts';

import { ref, onMounted } from 'vue';

const chartDom = ref(null);
const myChart = ref(null);
const option = ref(null);

onMounted(() => {
  chartDom.value = document.getElementById('pie_main');
  myChart.value = echarts.init(chartDom.value);

  setTimeout(() => {
    option.value = {
      legend: {},
      tooltip: {
        trigger: 'axis',
        showContent: true
      },
      dataset: {
        source: [
          ['product', '2023-6-13', '2023-6-18', '2023-6-22', '2023-6-26','2023-7-5','2023-7-8','2023-7-15'],
          ['故障0', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1, 38.5],
          ['故障1', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7, 42.4],
          ['故障2', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5, 57.2],
          ['故障3', 25.2, 37.1, 41.2, 18.2, 33.9, 49.1, 37.1],
          ['故障4', 10.7, 53.6, 34.3, 43.2, 55.1, 28.4, 37.9],
          ['故障5', 18.4, 37.1, 41.2, 18, 33.9, 49.1,37.1],
        ]
      },
      xAxis: { type: 'category' },
      yAxis: { gridIndex: 0 },
      grid: { top: '55%' },
      series: [
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          // color: '#84A3A9',
          color:  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#fee140'
              },
              // {
              //   offset: 1,
              //   color: '#fa709a'
              // }
            ]),
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          // color: '#DCD7C1',
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(243, 58, 161)'
              },
              // {
              //   offset: 1,
              //   color: 'rgb(109, 152, 244)'
              // }
            ]),
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          // color: '#BFB1D0',
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(116, 33, 219)'
              },
              // {
              //   offset: 1,
              //   color: 'rgb(109, 152, 244)'
              // }
            ]),
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          // color: '#6C91C2',
          color:  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color:  '#48c6ef'
              },
              // {
              //   offset: 1,
              //   color: '#6f86d6'
              // }
            ]),
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          // color: '#A7c0DE',
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color:  '#96fbc4'
              },
              // {
              //   offset: 1,
              //   color: 'rgb(71, 203, 250)'
              // }
            ]),
          emphasis: { focus: 'series' }
        },
        {
          type: 'line',
          smooth: true,
          seriesLayoutBy: 'row',
          // color: '#b3d6ad',
          color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
                offset: 0,
                color: 'rgb(254, 237, 123)'
              },
              // {
              //   offset: 1,
              //   color: 'rgb(251, 188, 60)'
              // }
            ]),
          emphasis: { focus: 'series' }
        },
        {
          type: 'pie',
          id: 'pie',
          // radius: '30%',
          radius: ['15%',"30%"],
          center: ['50%', '25%'],
          emphasis: {
            focus: 'self'
          },
          label: {
            formatter: '{b}: {@2012} ({d}%)'
          },
          encode: {
            itemName: 'product',
            value: '2012',
            tooltip: '2012'
          },
          // color: ['#FEED7B','#FBBC3C','#F033A1', '#6D98F4','#47CBFA','#77EECA'] // 修改为红色和绿色
          color: [ // 设置饼图的颜色为渐变色
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#fee140'
              },
              {
                offset: 1,
                color: '#fa709a'
              }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(243, 58, 161)'
              },
              {
                offset: 1,
                color: 'rgb(109, 152, 244)'
              }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(116, 33, 219)'
              },
              {
                offset: 1,
                color: 'rgb(109, 152, 244)'
              }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color:  '#48c6ef'
              },
              {
                offset: 1,
                color: '#6f86d6'
              }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color:  '#96fbc4'
              },
              {
                offset: 1,
                color: 'rgb(71, 203, 250)'
              }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
                offset: 0,
                color: 'rgb(254, 237, 123)'
              },
              {
                offset: 1,
                color: 'rgb(251, 188, 60)'
              }
            ]),
          ]


        }
      ]
    };

    myChart.value.on('updateAxisPointer', (event) => {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        myChart.value.setOption({
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

    myChart.value.setOption(option.value);
  });

  option.value && myChart.value.setOption(option.value);
})
</script>
<style scoped lang='less'>
  .pic{
    width: 100%;
    height: 580px;
  }

</style>
