<template>
  <div >
    <el-table :data="projectList" id="proFunction" style="width: 100%;" max-height="670">
	    <el-table-column v-for="(value,index) in functionList" :key="index" align='center' min-width="230">
        <template v-slot="scope">
          <!-- 柱状图放置区域 -->
          <div :id="scope.row.projectName+'_'+value.name" style="width:100%;height:200px;border:1px solid skyblue;margin: 0 auto;"></div>
        </template>
      </el-table-column>
</el-table>

  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      projectList:[]
    }
  },
  mounted() {
  },
  methods: {
    //柱状图数据处理和渲染
    zhu () {
      let that = this
      let option = {}
      console.time('柱状图绘制')
      console.log(this.projectList)
      console.log(this.functionList)
      const chartDom = document.getElementById(props.ids)
      const chart = echarts.init(chartDom)
      //数据处理部分
      //柱状图渲染部分
      option = {
              xAxis: {
                type: 'category',
                data: deptName,//横坐标名称集合
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  data: deptUserNum,//纵坐标数据集
                  type: 'bar',
                  barWidth: 15,//柱子宽度
                  itemStyle: {
                    normal: {
                      label: {
                        show: true,		//开启数值显示
                        position: 'top',	//在上方显示
                        textStyle: {	    //数值样式
                          color: 'black',
                          fontSize: 16
                        }
                      },
                      color: function (params) {
                        // 定义颜色集合
                        var colorList = [
                          '#C6E579', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                          '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                          '#D7504B', '#C1232B', '#F4E001', '#F0805A', '#26C0C0'
                        ];
                        //根据数据量返回颜色列表
                        if (params) {
                          if ($.inArray(params.name, that.Bgs) == -1) {
                            return colorList[params.dataIndex]
                          } else {
                          //特殊情况，如果横坐标数据名在特殊集合中，统一使用黑色渲染
                            return 'black'
                          }
                        }
                      },
                    }
                  },
                  markLine: { // 设置平均线
                    data: [
                      {
                        type: "average",
                        name: "我是平均值",
                        color: "#baf"
                      }
                    ]
                  },
                }
              ]
            };
            //渲染
            myChart.setOption(option)
      }
  }
}
</script>
<style scoped lang='less'>
</style>
