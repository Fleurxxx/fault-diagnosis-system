<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-14 15:19:03
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-06-14 20:29:11
 * @FilePath: \maintenance\src\components\chart\BarChart.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="output_3DBarCharts"></div>
</template>

<script>
  import { get3DOptions } from "./options.js";
  export default {
    name: "outputMea",
    data(){
      return {
        options:{
          xData:['青磁窑矿', '蒋家湾', '兴旺煤矿', '焦煤矿业', '安平煤矿', '树儿里村'],
          data:[2528,3018,4928,1858,3002,3695],
        },
      }
    },
    mounted() {
      this.init();
    },
    methods:{
      init() {
        //日总产量
        let output_3DBarCharts = this.$echarts.init(document.getElementById("output_3DBarCharts"));
        let options = get3DOptions(this.options);
        output_3DBarCharts.setOption(options);
        window.addEventListener("resize", function () {
          output_3DBarCharts.resize();
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  #output_3DBarCharts{
    // width: calc(100% - 40px);
    // height: calc(100% - 98px);
    width:500px;
    height: 800px;
    margin: 0 20px;
    background: url("../../assets/bigData/3dBarBg.png") no-repeat 46px 93.5%;
    background-size: calc(100% - 60px) auto;
  }
</style>
