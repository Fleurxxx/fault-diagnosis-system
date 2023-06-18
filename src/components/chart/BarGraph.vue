<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-14 20:27:00
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-06-18 17:07:34
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
import { ref, toRefs, reactive, onMounted } from "vue";

export default {
  props: {
    ids: String,
  },
  setup(props) {
    onMounted(() => {
      // console.log(props.ids)
      // 初始化实例对象 echarts.init(dom容器)
      const chartDom = document.getElementById(props.ids)
      const chart = echarts.init(chartDom)
      chart.setOption({
        color: '#3398db',
        tooltip: {},
        xAxis: {
          type: 'category',
          data:['feature0','feature1','feature2','feature3'],
          // data:['feature0','feature1','feature2','feature3','feature4','feature6','feature7','feature8','feature9','feature10','feature11', 'feature12','feature13', 'feature14'],
          // data:[2528,3018,4928,1858,3002,3695],
          axisLabel:{
            interval: 0
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
            data: [0, 182, 50, 0],
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
          left: 0,
          right: 0,
          // bottom: 0
        }
      })

    });
    return {
      props,
    }

  },
};
</script>
<style scoped lang="scss">
  .pic{
    width: 300px;;
    height: 180px;
  }
</style>
