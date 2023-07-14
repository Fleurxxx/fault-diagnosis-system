<template>
  <div id="rate_main" class="pic"></div>
</template>

<script>
import * as echarts from 'echarts';
import dataJson from './rate.json';

export default {
  mounted() {
    const ROOT_PATH = 'https://echarts.apache.org/examples';

    const chartDom = document.getElementById('rate_main');
    const myChart = echarts.init(chartDom);
    let option;
    myChart.showLoading();
    myChart.hideLoading();
    const data = dataJson;
    console.log(data)
    var base = -data.reduce(function (min, val) {
      return Math.floor(Math.min(min, val.l));
    }, Infinity);

    myChart.setOption(
      (option = {
        title: {
          text: '模型泛型与精确度',
          subtext: '历史记录',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#ccc',
              borderColor: '#aaa',
              borderWidth: 1,
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              color: '#222'
            }
          },
          formatter: function (params) {
            return (
              params[2].name +
              '<br />' +
              ((params[2].value - base) * 100).toFixed(1) +
              '%'
            );
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: data.map(function (item) {
            return item.date;
          }),
          axisLabel: {
            formatter: function (value, idx) {
              var date = new Date(value);
              return idx === 0
                ? value
                : [date.getMonth() + 1, date.getDate()].join('-');
            }
          },
          boundaryGap: false
        },
        yAxis: {
          axisLabel: {
            formatter: function (val) {
              return (val - base) * 100 + '%';
            }
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return ((params.value - base) * 100).toFixed(1) + '%';
              }
            }
          },
          splitNumber: 3
        },
        series: [
          {
            name: 'L',
            type: 'line',
            data: data.map(function (item) {
              return item.l + base;
            }),
            lineStyle: {
              opacity: 0
            },
            stack: 'confidence-band',
            symbol: 'none'
          },
          {
            name: 'U',
            type: 'line',
            data: data.map(function (item) {
              return item.u - item.l;
            }),
            lineStyle: {
              opacity: 0
            },
            areaStyle: {
              color: '#ccc'
            },
            stack: 'confidence-band',
            symbol: 'none'
          },
          {
            type: 'line',
            data: data.map(function (item) {
              return item.value + base;
            }),
            itemStyle: {
              color: '#333'
            },
            showSymbol: false
          }
        ]
      })
    );

    option && myChart.setOption(option);
  }
};
</script>
<style scoped lang='less'>
  .pic{
    width: 100%;
    height: 480px;
  }

</style>
