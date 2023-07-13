<template>
  <div id="mass_main" class="pic"></div>
</template>

<script setup>
import * as echarts from 'echarts';

import { ref, onMounted } from 'vue';

const chartDom = ref(null);
const myChart = ref(null);
const option = ref(null);

onMounted(() => {

  var chartDom = document.getElementById('mass_main');
  var myChart = echarts.init(chartDom);
  var option;

  const dataCount = 1e5;
  const data = generateData(dataCount);
  option = {
    title: {
      // text: echarts.format.addCommas(dataCount) + ' Data',
      text: '数据分布',
      left: 10

    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: false
        },
        saveAsImage: {
          pixelRatio: 2
        }
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      bottom: 90
    },
    dataZoom: [
      {
        type: 'inside'
      },
      {
        type: 'slider'
      }
    ],
    xAxis: {
      data: data.categoryData,
      silent: false,
      splitLine: {
        show: false
      },
      splitArea: {
        show: false
      },
    },
    yAxis: {
      splitArea: {
        show: false
      }
    },
    series: [
      {
        type: 'bar',
        data: data.valueData,
        // Set `large` for large data amount
        large: true,
        color:'#6C91c2'
      }
    ]
  };
  function generateData(count) {
    let baseValue = Math.random() * 1000;
    let time = +new Date(2023, 6, 7);
    let smallBaseValue;
    function next(idx) {
      smallBaseValue =
        idx % 30 === 0
          ? Math.random() * 700
          : smallBaseValue + Math.random() * 500 - 250;
      baseValue += Math.random() * 20 - 10;
      return Math.max(0, Math.round(baseValue + smallBaseValue) + 3000);
    }
    const categoryData = [];
    const valueData = [];
    // for (let i = 0; i < count; i++) {
    //   categoryData.push(
    //     echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', time, false)
    //   );
    //   valueData.push(next(i).toFixed(2));
    //   time += 1000;
    // }
    for (let i = 0; i < 107; i++) {
      categoryData.push(
        'feature'+i
      );
      valueData.push(next(i).toFixed(2));
    }
    return {
      categoryData: categoryData,
      valueData: valueData
    };
  }

  option && myChart.setOption(option);

})
</script>
<style scoped lang='less'>
  .pic{
    width: 100%;
    height: 345px;
    margin-left: 15px;
  }

</style>
