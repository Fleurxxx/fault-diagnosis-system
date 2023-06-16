import * as echarts from 'echarts'

/*3D柱形图*/
const get3DOptions = (op = {}) => {
  var options = {
    grid: {
      left: 60,
      right: 20,
      top: 50,
      bottom: 40
    },
    legend: {
      show: true,
      icon: 'circle',
      orient: 'horizontal',
      top: '90.5%',
      right: 'center',
      itemWidth: 16.5,
      itemHeight: 6,
      textStyle: {
        color: '#C9C8CD',
        fontSize: 14
      }
    },
    xAxis: [{
      data: op.xData || [],
      axisLabel: {
        show: true,
        textStyle: {
          color: '#aaaaaa',
          fontSize: 12
        },
        margin: 30, //刻度标签与轴线之间的距离。
      },
      axisLine: {
        show: false //不显示x轴
      },
      axisTick: {
        show: false //不显示刻度
      },
      boundaryGap: true,
      splitLine: {
        show: false,
        width: 1,
        lineStyle: {
          type: "solid",
          color: "#03202E"
        }
      }
    }],
    yAxis: [{
      show: true,
      axisLabel: {
        interval: 'auto',
        show: true,
        textStyle: {
          fontSize: 14,
          color: '#fff',
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: 'rgba(49,176,255,0.05)',
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(49,176,255,0.5)',
        },
      },
    }],
    series: [
      {//柱底圆片
        name: "",
        type: "pictorialBar",
        symbolSize: [20, 8],//调整截面形状
        symbolOffset: [0, 4],
        z: 12,
        itemStyle: {
          normal: {
            color: '#183E96',
          }
        },
        data: op.data || []
      },
      //柱体
      {
        name: '',
        type: 'bar',
        barWidth: 20,
        barGap: '0%',
        itemStyle: {
          color: () => {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#01AEF6'},
              { offset: 1, color: 'rgba(16,36,95,0.6)' },
            ])
          },
          opacity:1
        },
        data: op.data || []
      },
      //柱顶圆片
      {
        name: "",
        type: "pictorialBar",
        symbolSize: [20, 8],//调整截面形状
        symbolOffset: [0, -5],
        z: 12,
        symbolPosition: "end",
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#fff'
          }
        },
        itemStyle: {
          normal: {
            color: '#17E1FF',
          }
        },
        data: op.data || []
      }
    ]
  }
  return options;
};

export { get3DOptions }
