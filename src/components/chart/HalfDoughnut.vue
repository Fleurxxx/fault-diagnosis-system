<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-07-11 20:58:33
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-07-26 12:50:42
 * @FilePath: \maintenance\src\components\chart\HalfDoughnut.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- 半环球图 -->
  <div class="box">
      <div id="main" class="bar"></div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import * as echarts from 'echarts'
import 'echarts-gl';

const info = () => {
  var chartDom = document.getElementById('main');
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center',
      // doesn't perfectly work with our tricks, disable it
      selectedMode: false
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '90%'],
        // adjust the start angle
        color:['RGBA(36, 80, 171, 1)','#6395F9'],
        // color:['#0444AB','#80A6E2'],
        startAngle: 180,
        label: {
          show: true,
          fontSize: 14,
          formatter(param) {
            // correct the percentage
            return param.name + ' (' + param.percent * 2 + '%)';
          }
        },
        data: [
          { value: 1048, name: 'PV' },
          { value: 735, name: 'UV' },
          {
            // make an record to fill the bottom 50%
            value: 1048 + 735,
            itemStyle: {
              // stop the chart from rendering this piece
              color: 'none',
              decal: {
                symbol: 'none'
              },
            },
            label: {
              show: false,
            },
          }
        ]
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
  padding-top: 10px;
}
.bar {
  height: 140px;
  width: 100%;
}
</style>
