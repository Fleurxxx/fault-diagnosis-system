<template>
    <div class="wrap-container">
        <!-- 雷达图 -->
      <div id="radar-pie" ref="radar" class="chartsdom"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts'
  export default {
    // props: {
    //   loopData: {
    //     typeof: Array,
    //     default: () => []
    //   }
    // },
    data() {
      return {
      }
    },
    computed() {
      this.nextIndex()
    },
    methods: {
      draw() {
        const maxIndicator = 180 // 雷达图的最大值
        const myChart = echarts.init(this.$refs.radar)
        const itemArr = [105, 76, 116, 88, 137] //  数据数组
        // const thisData = [
        //   { value: 60, name: '吃饭' },
        //   { value: 156, name: '睡觉' },
        //   { value: 86, name: '广场舞' },
        //   { value: 30, name: '唱歌' }
        // ]
        const colorList = ['#647798', '#6395F9', '#64DAAB', '#F6C02E']
        // 这里可以自己手动设置或者写个函数
        const n1 = [105, '', '', '','']
        const n2 = ['', 76, '', '','']
        const n3 = ['', '', 116, '','']
        const n4 = ['', '', '', 88,'']
        const n7 = ['', '', '', '',137]
        const labelArr = ['华中', '华西', '西南', '东北','华南'] // 显示图例用
        const Option = {
          legend: {
            left: '0',
            icon: 'circle',
            data: labelArr,
            textStyle: {
              color: '#000'
            }
          },
          radar: [
            {
              splitLine: {
                lineStyle: {
                  color: '#000'
                }
              }
            },
            {
              indicator: [
                { name: '华中71万', max: maxIndicator },
                { name: '华西46万', max: maxIndicator },
                { name: '西南78万', max: maxIndicator },
                { name: '东北58万', max: maxIndicator },
                { name: '华南84万', max: maxIndicator }
              ],
              nameGap: 6,
              center: ['50%', '50%'],
              radius: '65%',
              name: {
                textStyle: {
                  color: '#000',
                  fontSize: 12,
                  fontWeight: 400
                }
              },
              splitArea: {
                areaStyle: {
                  color: ['none',
                    'none', 'none',
                    'none', 'none']
                }
              },
              axisLine: {
                lineStyle: {
                  color: 'rgba(137, 137, 137, 0)'
                }
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(137, 137, 137, 0.6)' // 网格的颜色
                }
              }
            }
          ],
          series: [
            {
              type: 'radar', // 绘制总的图形不设置拐点
              radarIndex: 1,
              data: [
                {
                  value: itemArr,
                  symbolSize: 7,
                  lineStyle: {
                    width: 2,
                    color: '#29B8FF'
                  },
                  areaStyle: {
                    normal: {
                      opacity: 0.2,
                      color: 'rgb(22, 255, 239)'
                    }
                  }
                }
              ],
              itemStyle: {
                normal: {
                  borderWidth: 0,
                  color: '#000' //   show:false
                }
              },
              silent: true,
              z: 1 // 图层是一层一层叠加，所以这个也是一级一级递增
            },
            {
              type: 'radar', // 绘制第一个点
              radarIndex: 1,
              name: labelArr[0],
              silent: true,
              z: 2, // 图层是一层一层叠加，所以这个也是一级一级递增
              data: [
                {
                  value: n1,
                  symbolSize: 7
                }
              ],
              itemStyle: {
                normal: {
                  borderWidth: 2,
                  color: colorList[0]
                }
              },
              lineStyle: {
                width: 0,
                labelLine: {
                  show: false //  隐藏标示线
                }
              }
            },
            {
              type: 'radar',
              radarIndex: 1, // 绘制第二个点
              name: labelArr[1],
              silent: true,
              z: 3, // 图层是一层一层叠加，所以这个也是一级一级递增
              data: [
                {
                  value: n2,
                  symbolSize: 7
                }
              ],
              itemStyle: {
                normal: {
                  borderWidth: 2,
                  color: colorList[1]
                }
              },
              lineStyle: {
                width: 0,
                labelLine: {
                  show: false //  隐藏标示线
                }
              }
            },
            {
              type: 'radar', // 绘制第三个点
              radarIndex: 1,
              name: labelArr[2],
              silent: true,
              z: 4, // 图层是一层一层叠加，所以这个也是一级一级递增
              data: [
                {
                  value: n3,
                  symbolSize: 7
                }
              ],
              itemStyle: {
                normal: {
                  borderWidth: 2,
                  color: colorList[2]
                }
              },
              lineStyle: {
                width: 0,
                labelLine: {
                  show: false //  隐藏标示线
                }
              }
            },
            {
              type: 'radar', // 绘制第四个点
              radarIndex: 1,
              name: labelArr[3],
              silent: true,
              z: 5, // 图层是一层一层叠加，所以这个也是一级一级递增
              data: [
                {
                  value: n4,
                  symbolSize: 7
                }
              ],
              itemStyle: {
                normal: {
                  borderWidth: 2,
                  color: colorList[3]
                }
              },
              lineStyle: {
                width: 0,
                labelLine: {
                  show: false //  隐藏标示线
                }
              }
            },
            {
              type: 'radar', // 这个图层是为了盖住圆心，如果去掉，圆心的颜色为最后一个图层的颜色（不信就自己试试）
              radarIndex: 1,
              name: '',
              silent: true,
              z: 8, // 图层是一层一层叠加，所以这个也是一级一级递增
              data: [
                {
                  value: n7,
                  symbolSize: 7
                }
              ],
              itemStyle: {
                normal: {
                  borderWidth: 2,
                  color: '#f8f7f7'
                }
              },
              lineStyle: {
                width: 0,
                labelLine: {
                  show: false //  隐藏标示线
                }
              }
            }
          ]
        }
        console.log('图', Option)
        myChart.setOption(Option)
        // window.onresize = myChart.resize
        window.addEventListener('resize', function () { myChart.resize() })
      },
      getData() {
        this.draw()
      },
      setCurrentIndex(index) {
        this.currentIndex = index
      },
      nextIndex() {
        console.log('currentIndex:' + this.currentIndex)
        if (this.currentIndex === this.imgList.length - 1) {
          return 0
        } else {
          return this.currentIndex + 1
        }
      }
    },
    mounted() {
      this.draw()
    }
  }
  </script>
  
  <style lang="less" scoped>
  #radar-pie {
    margin-top: 27px;
    margin-left: 15px;
  }
  .wrap-container {
		width: 300px;
		height: 260px;
 
		.chartsdom {
			width: 100%;
			height: 100%;
		}
	}
  </style>
  
  