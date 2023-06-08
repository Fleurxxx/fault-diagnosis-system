<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-07 16:19:43
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-06-07 17:46:44
 * @FilePath: \maintenance\src\components\table\Table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>

 <div class="public-service">
                 <el-table
                  :data="tableData"    :header-cell-style="{
                    background:'#fafafa',color:'#000000',height:'60px',fontWeight:'700'
                  }"  style="width:100%;height:380px;font-size:18px" :row-style="{height:'60px'}" >
                    <el-table-column
                        prop="name"
                        label="服务名称"
                        width="180"
                      align="left" >
                    </el-table-column>

                    <el-table-column prop="num" label="故障数" width="260"  align="left" >
                      <template #default="scope">
                      <!-- <e-charts class="chart1" :option="getOption(scope.row.num)"></e-charts> -->
                      <div class="chart3"  :ref="scope.row.id"></div>
                      </template>
                    </el-table-column>
                      <el-table-column
                        prop="time"
                        label="耗时"
                        width="120">
                    </el-table-column>
                        <el-table-column
                        prop="sucess"
                        label="成功率"
                        width="140">
                    </el-table-column>
                        <el-table-column
                        prop="growp"
                        label="增长率"
                        width="140">
                    </el-table-column>
                        <el-table-column
                        prop="transaction"
                        label="交易笔数"
                        width="140">
                    </el-table-column>
                        <el-table-column
                        prop="business"
                        label="影响业务"
                        width="140">
                    </el-table-column>
              </el-table>
</div>
 </template>
 <script>
 export default {
   data() {
    return {
      // 今日公共服务top5数据
      tableData: [
        {
          name: "综合支付前置",
          id: "1",
          num: [20],
          time: "2.89s",
          sucess: "90%",
          growp: "5%",
          transaction: "2895",
          business: "5"
        },
        {
          name: "综合支付前置",
          id: "2",
          num: [16],
          time: "2.89s",
          sucess: "90%",
          growp: "5%",
          transaction: "2895",
          business: "5"
        },
        {
          name: "综合支付前置",
          id: "3",
          num: [12],
          time: "2.89s",
          sucess: "90%",
          growp: "5%",
          transaction: "2895",
          business: "5"
        },
        {
          name: "综合支付前置",
          id: "4",
          num: [8],
          time: "2.89s",
          sucess: "90%",
          growp: "5%",
          transaction: "2895",
          business: "5"
        },
        {
          name: "综合支付前置",
          id: "5",
          num: [6],
          time: "2.89s",
          sucess: "90%",
          growp: "5%",
          transaction: "2895",
          business: "5"
        }
      ],

    };
  },
mounted(){
this.publicService();
},
methods:{
     publicService() {
      setTimeout(_ => {
        this.tableData.forEach(e => {
          let myChart3 =  this.$echarts.init(this.$refs[e.id]);
          myChart3.setOption({
            // grid: {
            //   left: "0",
            //   top: "10%",
            //   right: "0",
            //   bottom: "10%",

            // },
            xAxis: {
              type: "value",
              show: false,
              max: 20
            },
            yAxis: {
              type: "category",
              show: false
            },
            series: [
              {
                data: e.num,
                type: "bar",
                barWidth: "20%",
                label: {
                  show: true, //开启显示
                  // inside(自适应，柱状内部中央),top（柱状外的正上方）,bottom(柱状外的正下方)，left(柱状外的左边)，right(柱状外的右边)。
                  //insideTop(柱状内部靠顶部)，insideBottom(柱状内部靠下方)，insideRight(柱状内部靠右边)，insideLeft(柱状内部靠左边)。
                  position: "insideLeft", //在上方显示
                  // formatter: '{c}%',//显示百分号
                  textStyle: {
                    //数值样式
                    color: "white", //字体颜色
                    fontSize: 14 //字体大小
                  }
                },
                itemStyle: {
                  //给柱状设置渐变颜色
                  // normal: {
                  // 圆角边框
                  // barBorderRadius: 7,
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 1, color: "#ffc867" },
                    { offset: 0, color: "#f5953e" }
                  ])
                  // color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  //   { offset: 1, color: " #c5F3FF" },
                  //   { offset: 0, color: " #E5F3FF" }
                  // ])
                  // background: linear-gradient(to right, #c5F3FF 0%, #E5F3FF 10%, #fff 10%, #fff 100%);
                  // }
                }
              }
            ]
          });
          window.addEventListener("resize", () => {
            myChart3.resize();
          });
        });
      }, 1000);
    },

}
 }
 </script>

 <style lang="less" scoped>
   .public-service {
    width: 100%;
    height: 400px;
    padding-top: 5px;
    padding-left: 20px;
    // 取消表格最底下的白线

    .el-table::before {
      height: 0px;
    }
    .chart3 {
      width: 100px;
      height: 30px;
      margin-top: 10px;
    }


  }
 </style>
