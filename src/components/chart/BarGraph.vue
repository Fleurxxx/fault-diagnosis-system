<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-14 20:27:00
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-13 17:32:04
 * @FilePath: \maintenance\src\components\chart\BarGraph.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- 折现面积图 -->
  <div >
    <!-- 准备好一个盒子必须有宽高这里的id 必须和下面获取的节点一致 -->
    <div
        :id="ids"
        class="pic"
      ></div>
  </div>
</template>

<script>
// 引入eCharts文件
import * as echarts from "echarts";
import { ref, toRefs, reactive, onMounted,watch  } from "vue";

export default {
  props: {
    ids: String,
  },
  setup(props) {

    const chartInstance = ref(null);

    // 监听ids变化，更新图表
    watch(
      () => props.ids,
      () => {
        updateChart();
      }
    );



    onMounted(() => {
      // 初始化实例对象 echarts.init(dom容器)
      const chartDom = document.getElementById(props.ids)
      // const chart = echarts.init(chartDom)
      chartInstance.value = echarts.init(chartDom);
      updateChart();
    });

    const updateChart = () => {
      const chart = chartInstance.value;
      chart.setOption({
        color: '#3398db',
        tooltip: {},
        xAxis: {
          type: 'category',
          data: generateXAxisData(), // 生成X轴的数据
          // data:['0', '', '', '', '', '', '', '', '', '6285'],
          // data:['feature0','feature1','feature2','feature3'],
          axisLabel:{
            interval: 0,
            formatter: function (value, index) {
              if (index === 0 || index === 10) {
                return value;
              } else {
                return "";
              }
            },
            axisTick: { //坐标轴刻度是否显示
              show: false,
            },
            axisPointer: {
              handle: {
                show: true,
                margin: 0, // 调整下标的显示位置
              },
            }
          }
          // show: false
          // boundaryGap: false
        }, // x轴
        yAxis: {
          show: false
        }, // y轴
        // 一个series就是一个图表
        series: [
          {
            type: 'bar',
            data: generateRandomData(), // 生成随机数据
            // data: [0, 182, 50, 0],
            barWidth: '100%',
            // areaStyle: {
            //   color: 'purple'
            // },
            // lineStyle: {
            //   width: 0
            // },
            // itemStyle: {
            //   opacity: 0
            // },
            // smooth: true
          }
        ],
        grid: {
          top: 0,
          left: 8,
          right: 8,
          // bottom: 0
        }
      })
    }


    const generateXAxisData = () => {
      const data = [];
      const startNumber = generateRandomNumber(-5361522, 5); // 开头的随机数
      const formattedStartNumber = formatNumberWithCount(startNumber);
      data.push(formattedStartNumber);
      for (let i = 1; i < 10; i++) {
        data.push("");
      }
      const endNumber = generateRandomNumber(3, 8635283); // 生成结尾的随机数
      const formattedEndNumber = formatNumberWithCount(endNumber);
      data.push(formattedEndNumber);
      return data;
    };

    //大数单位转换
    const formatNumberWithCount = (number) => {
      let absNumber = Math.abs(number);
      let units = ["", "k", "m", "b", "t", "e"];
      let unitIndex = 0;

      while (absNumber >= 1000 && unitIndex < units.length - 1) {
        absNumber /= 1000;
        unitIndex++;
      }

      let formattedNumber = absNumber.toFixed(1);
      let unit = units[unitIndex];

      if(number>0){
         return `${formattedNumber}${unit}`;
      }else{
        return `-${formattedNumber}${unit}`;
      }

    };

    //随机生成柱子上的数据
    const generateRandomData = () => {
      const data = [];
      let zeroCount = 0;
      for (let i = 0; i < 10; i++) {
        if (zeroCount < 7 && Math.random() < 0.9) {
          data.push(0); // 50%的几率生成0
          zeroCount++;
        } else {
          data.push(generateRandomNumber(1, 100)); // 其他情况生成1到100之间的随机数
        }
      }
      return data;
    };


    const generateRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min; //均匀分布
    };


    return {
      props,
    }

  },
};
</script>
<style scoped lang="scss">
  .pic{
    width: 340px;;
    height: 180px;
  }
</style>
