<template>
  <div>
      <div id="bar"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  props: {
      markList: {
          type: Array,
          default: () => []
      }
  },
  data() {
      return {
          NumArr: [],
          CodeArr: []
      }
  },
  created() {
      this.$nextTick(() => {
          this.barBtn()
      })
      this.getMarkList()
  },
  methods: {
      getMarkList() {
          let a = ''
          let b = ''
          this.markList.forEach(mark => {
             a += mark.FactorDivide + ','
             b += mark.FactorCode + ','
          })
          this.NumArr = a.substring(0, a.length - 1).split(',').reverse().map(Number)
          this.CodeArr = b.substring(0, b.length - 1).split(',').reverse()
      },
      barBtn() {
          let myChart = echarts.init(document.getElementById('bar'))
          let option = {
              legend: {
                  show: false
              },
              grid: {
                  top: '0',
                  left: '0%',
                  right: '4%',
                  bottom: '0%',
                  containLabel: true
              },
              xAxis: {
                  type: 'value',
                  min: 0,
                  max: 5,
                  boundaryGap: [0, 0.01],
                  // 表格里面Y轴线条
                  splitLine: {
                      show: false
                  },
                  axisTick: {
                      // y轴刻度线
                      show: false
                  }
              },
              yAxis: {
                  type: 'category',
                  data: this.CodeArr,
                  // 表格里面Y轴线条
                  splitLine: {
                      show: false
                  },
                  axisTick: {
                      // y轴刻度线
                      show: false
                  }
              },
              series: [
                  {
                      name: '2011',
                      type: 'bar',
                      barWidth: 10, // 柱图宽度
                      markLine: {
                          itemStyle: {
                              color: 'red'
                          },
                          label: {
                              formatter: '阳性线',
                              itemStyle: {
                                  color: '#053d6f'
                              }
                          },
                          data: [
                              [
                                  {
                                      name: '两点之间的线',
                                      coord: [3, 0]
                                  },
                                  {
                                      name: '两点之间的线',
                                      coord: [3, 9]
                                  }
                              ]
                          ]
                      },
                      itemStyle: {
                           color: '#053d6f'
                      },
                      label: {
                          show: true,
                          position: 'right'
                      },
                      data: this.NumArr
                  }
              ]
          }
          myChart.setOption(option)
          // 让图表跟随屏幕自动的去适应
          window.addEventListener('resize', function () {
              myChart.resize()
          })
      }
  }
}
</script>
<style lang="less" scoped>
#bar{
  width: 100mm;
  height: 110mm;
  margin: 0 auto;
}
</style>
