<template>
  <div id="main" style="width: 100%; height: 350px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      myChart: null,
      categories: [],
      memoryData: [],
      cpuData: [],
      appCount: 11,
    };
  },
  mounted() {
    this.initChart();
    this.updateData();
    setInterval(this.updateData, 2100);
  },
  methods: {
    initChart() {
      this.categories = this.generateCategories();
      this.myChart = echarts.init(document.getElementById('main'));
      this.myChart.setOption(this.getOption());
    },
    generateCategories() {
      let now = new Date();
      let res = [];
      let len = 10;
      while (len--) {
        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
        now = new Date(+now - 2000);
      }
      return res;
    },
    generateRandomData(prevValue, minLimit, maxLimit) {
      const diff = (maxLimit - minLimit) * 0.15; // 10% of the range
      let newValue = parseFloat((Math.random() * (2 * diff) + prevValue - diff).toFixed(2));
      newValue = Math.min(maxLimit, Math.max(minLimit, newValue));
      return newValue;
    },
    getOption() {
      return {
        title: {
          text: '',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56',
            },
          },
        },
        legend: {
          data: ['内存使用情况', 'CPU使用情况'],
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100,
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: this.categories,
        },
        yAxis: {
          type: 'value',
          scale: true,
          name: '百分比 (%)',
          max: 80,
          min: 0,
          axisLabel: {
            formatter: '{value} %',
          },
        },
        series: [
          {
            name: '内存使用情况',
            type: 'bar',
            data: this.memoryData,
            itemStyle: {
              normal: {
                color: '#2d8cf0', // 蓝的
              },
            },
          },
          {
            name: 'CPU使用情况',
            type: 'line',
            data: this.cpuData,
          },
        ],
      };
    },
    updateData() {
      const axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
      const lastMemoryValue = this.memoryData[this.memoryData.length - 1] || 0;
      const lastCpuValue = this.cpuData[this.cpuData.length - 1] || 0;

      // Generate random data for memory with 10% difference from the previous value
      const randomMemoryData = this.generateRandomData(lastMemoryValue, 17, 70);

      // Generate random data for CPU with 10% difference from the previous value
      const randomCpuData = this.generateRandomData(lastCpuValue, 20, 70);

      this.memoryData.push(randomMemoryData);
      this.cpuData.push(randomCpuData);

      if (this.memoryData.length > 10) {
        this.memoryData.shift();
      }

      if (this.cpuData.length > 10) {
        this.cpuData.shift();
      }

      this.categories.push(axisData);
      if (this.categories.length > 10) {
        this.categories.shift();
      }

      this.myChart.setOption({
        xAxis: {
          data: this.categories,
        },
        series: [
          {
            data: this.memoryData,
          },
          {
            data: this.cpuData,
          },
        ],
      });
    },
  },
};
</script>
