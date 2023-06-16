<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-03-23 19:35:40
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-03-23 23:24:20
 * @FilePath: \oss-backstage\src\components\chart\Line.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="companyList-ctn" :style="{ 'width':'100%','height': '25vh' }">
    <div :id="id" :style="{'width':'100%','height': '100%'}"></div>
  </div>
</template>
<script>
let _c = { id: 1 };
import * as echarts from 'echarts';
import echartMixins from "../../utils/resizeMixins";
//引入echart
import 'echarts-gl'
export default {
  mixins: [echartMixins],
  created() {
    _c.id++;
    this.id = "charts_" + _c.id;
  },
  props: {
    echartsData: {
      type: Object,
    },
  },
  data() {
    return {
      myPieChart:'',
      width:'100%',
      height:400+'px'
    };
  },
  computed: {
    heightFun(){
      return this.echartsData.height+'px'
    }
  },
  watch: {
    echartsData:{
         handler(newval, oldVal){
           this.initChart();
         },
         deep:true //true 深度监听
     }
  },
  mounted() {
    // 初始化echarts
    this.$nextTick(()=>{
      this.initChart();
    })
    window.addEventListener('resize',this.initChart,false);
  },
  //vue组件实例销毁之前移除监听事件，避免当我们切换路由时导致vue出现警告：
  //echarts.js?1be7:2160 Uncaught Error: Initialize failed: invalid dom.
  beforeDestroy () {
    window.removeEventListener('resize', this.initChart)
  },
  methods: {
    initChart() {
      var chartDom = document.getElementById(this.id);
      if (this.myPieChart != null && this.myPieChart != "" && this.myPieChart != undefined) {
        this.myPieChart.dispose();//销毁
      }
      this.myPieChart = echarts.init(chartDom);
      this.myPieChart.resize()
      var option=this.echartsData.option
      this.myPieChart.setOption(option);
    },
  },
};
</script>
<style lang="less" scoped>
.companyList-ctn {
  width: 260px;
  border-radius: 4px;
  // background: white;
  .companyList-oneItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>