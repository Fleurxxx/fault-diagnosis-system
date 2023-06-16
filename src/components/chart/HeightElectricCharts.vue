<template>
  <div class="user_protocal_box">
    <!-- 仪表盘 -->
    <HeightElectricCharts :echartsData="heightElectric" />
  </div>
</template>
<script>
import HeightElectricCharts from "./Echart.vue";

export default {
components: {
    HeightElectricCharts 
  },
  data () {
    return {
      heightElectric:{//电力高压负荷监控仪表盘
        option:{
          series: [
            {//外圈的仪表盘
              type: 'gauge',
              startAngle: 180,
              endAngle: 0,
              min: 0,
              max: 6000,
              radius:'140%',
              center:['50%','85%'],
              splitNumber: 10,
              progress: {
                show: true,
                roundCap: false,
                width:30,
                itemStyle: {
                color:'rgba(255,255,255,0.25)',
                  shadowColor: 'rgba(255,255,255,0.5)',//rgba(0,255,255,0.8)
                  shadowBlur: 10,
                  shadowOffsetX: 2,
                  shadowOffsetY: 2,
                },
              },
              pointer: {//指针
                icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
                length: '28%',
                width: 3,
                offsetCenter: [0, '-72%'],
                itemStyle: {
                color:'rgba(255,255,255,1)',
                  shadowColor: 'rgba(255,255,255,0.5)',//rgba(0,255,255,0.8)
                  shadowBlur: 10,
                  shadowOffsetX: 2,
                  shadowOffsetY: 2,
                },
              },
              axisLine: {//槽内颜色
                roundCap: false,
                lineStyle: {
                  width: 30,
                  color: [
                        [1, new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                          {
                            offset: 0,
                            color: "#30C9C9"
                          },
                          {
                            offset: 0.15,
                            color: "#30C9C9"
                          },
                          {
                            offset: 0.2,
                            color: "#46A0FA"
                          },
                          {
                            offset: 0.4,
                            color: "#46A0FA"
                          },
                          {
                            offset: 0.55,
                            color: "#FCE26C"
                          },
                          {
                            offset: 0.75,
                            color: "#FCE26C"
                          },
                          {
                            offset: 1,
                            color: "#FB6C78"
                          }
                        ])
                      ]
                    ]
                }
              },
              axisTick: {//小刻度个数
                splitNumber: 10,//小刻度个数
                lineStyle: {
                  width:1,
                  color:'#5DD9FB'
                }
              },
              splitLine: {//大刻度线
                length: 10,
                lineStyle: {
                  width:1.5,
                  color:'#5DD9FB'
                }
              },
              axisLabel: {//刻度值
                show:true,
                distance: -55,
                color: '#9FD8FD',
                fontSize: 14,
                offsetCenter: [-10, '0%'],
                // formatter: function (value) {
                //   callback(value)
                // },
              },
              title: {
                show: true,
                offsetCenter: [0, '0%'],
                fontSize: 16,
                color:'rgba(159,216,253,0.4)'
              },
              detail: {
                width: '60%',
                lineHeight: 40,
                height: 40,
                borderRadius: 8,
                offsetCenter: [0, '-20%'],
                valueAnimation: true,
                formatter: function (value) {
                  return '{value|' + value.toFixed(0) + '}{unit|kw}';
                },
                rich: {
                  value: {
                    fontSize: 36,
                    fontWeight: 'bolder',
                    color: '#5DD9FB'
                  },
                  unit: {
                    fontSize: 35,
                    color: '#5DD9FB',
                    padding: [0, 0, 0, 0]
                  },
                  name: {
                    fontSize: 35,
                    color: '#5DD9FB',
                    padding: [0, 0, 0, 0]
                  },
                }
              },
              data: [
                {
                  value: 4900,
                  name: '当前负荷'
                }
              ]
            },
            {//内圈的仪表盘刻度
              type: 'gauge',
              startAngle: 180,
              endAngle: 0,
              radius:'140%',
              center:['50%','85%'],
              min: 0,
              max: 6000,
              progress: {
                show: false,
                width: 30
              },
              axisLine: {
                show: false,
                lineStyle: {
                  width: 30
                }
              },
              pointer:{
                show:false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false,
                length: 10,
                lineStyle: {
                  width: 2,
                  color: '#999'
                }
              },
              axisLabel: {
                show: true,
                distance:32,
                color: '#5DD9FB',
                fontSize: 12,
              },
              anchor: {
                show: false,
                showAbove: true,
                size: 10,
                itemStyle: {
                  borderWidth: 5
                },
                formatter:'',
              },
              title: {
                show: false
              },
              detail: {
                show: false,
                valueAnimation: true,
                fontSize: 80,
                offsetCenter: [0, '50%']
              },
              data: [
                {
                  value: 4900
                }
              ]
            }
          ]
        }
      }
    }
  },
  mounted () {
  //  this.info()
  },
  methods: {
    info(){
      //仪表盘刻度值显示--该方法要放在接口返回去计算并渲染，因为刻度值转换为文字显示的是一个范围
      this.heightElectric.option.series[0].axisLabel.formatter=function(value){  
          let oneItem=this.heightElectric.option.series[0].max/10
          if (value == oneItem) {
            return '轻载';
          } else if (value == oneItem*3) {
            return '正常';
          } else if (value == oneItem*7) {
            return '重载';
          } else if (value == oneItem*9) {
            return '过载';
          }
          return '';
      }
    }
  }
}
</script>
 
<style lang="scss" scoped>
 
</style>