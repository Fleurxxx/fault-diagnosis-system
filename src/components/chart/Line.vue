<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-07-26 10:17:42
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-07-26 11:48:54
 * @FilePath: \maintenance\src\components\chart\Line.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="myChart" class="chart" :style="{width: '100%', height: '280px'}"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'xwPassengerFlow',
  data () {
    return {}
  },
  mounted () {
    this.loadLine()
  },
  methods: {
    loadLine () {
      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['上一时段的使用情况', '当前时段的使用情况', '使用限制'],
          // itemWidth: 12, // 设置图例图标的宽度
          // itemHeight: 12, // 设置图例图标的高度
          textStyle: {
            color: 'black' // 设置图例文字颜色
          },
          // 自定义图例项图标的样式
          itemStyle: {
            borderColor: 'black', // 设置图例图标边框颜色
            borderWidth: 2, // 设置图例图标边框宽度
            borderRadius: 2 // 设置图例图标边框圆角
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['13: 36', '13: 37', '13: 38', '13: 39', '13: 40', '13: 41', '13: 42']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '上一时段的使用情况',
            type: 'line',
            stack: 'Total',
            data: [0, 172, 251, 387, 492, 532, 555],
            lineStyle: {
              color: '#67c23a', // 设置绿色线条
            },
            itemStyle: {
              color: '#67c23a' // 设置蓝色图例项图标
            },
            areaStyle: {
              color: 'rgba(255, 0, 0, 0)', // 设置蓝色区域填充
            }
          },
          {
            name: '当前时段的使用情况',
            type: 'line',
            stack: 'Total',
            data: [0, 232, 281, 254, 190, 330, 410],
            lineStyle: {
              color: '#2d8cf0', // 设置蓝色线条
            },
            itemStyle: {
              color: '#2d8cf0' // 设置蓝色图例项图标
            },
            areaStyle: {
              color: 'rgba(255, 0, 0, 0)', // 设置绿色区域填充
            }
          },
          {
            name: '使用限制',
            type: 'line',
            stack: 'Total',
            data: [1140, 740, 620, 510, 470, 293, 200],
            lineStyle: {
              color: '#f56c6c', // 设置红色线条
            },
            itemStyle: {
              color: '#f56c6c' // 设置蓝色图例项图标
            },
            areaStyle: {
              color: 'rgba(255, 0, 0, 0)', // 设置红色区域填充为透明
            }
          },
        ]
      };

      this.myChartOne = echarts.init(document.getElementById('myChart'))
      this.myChartOne.setOption(option)
    }
  }
}
</script>
