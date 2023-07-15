<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-11 21:04:16
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-15 20:32:53
 * @FilePath: \maintenance\src\test\txt1.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div id="main2" class="main2"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data(){
    return{
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        legend: {
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '磁盘使用量',
            min: 0,
            max: 1000,
            position: 'right',
            axisLabel: {
              formatter: '{value} GB'
            }
          },
          {
            type: 'value',
            name: '占用百分比',
            min: 0,
            max: 100,
            position: 'left',
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '内存占用率',
            yAxisIndex: 1,
            type: 'bar',
            data: [],
            itemStyle: {
              barBorderRadius: 5,
              borderWidth: 1,
              borderType: 'solid',
              borderColor: '#73c0de',
              shadowColor: '#5470c6',
              shadowBlur: 1
            }
          },
          {
            name: 'CPU占用率',
            yAxisIndex: 1,
            type: 'bar',
            data: [],
            itemStyle: {
              barBorderRadius: 5,
              borderWidth: 1,
              borderType: 'solid',
              borderColor: '#73c0de',
              shadowColor: '#5470c6',
              shadowBlur: 1
            }
          },
          {
            name: '磁盘写入量',
            yAxisIndex: 0,
            type: 'line',
            data: []
          },
          {
            name: '磁盘读取量',
            yAxisIndex: 0,
            type: 'line',
            data: []
          }
        ]
      }
    }
  },
  methods: {
    // 异步获取当前时间前20个数据的伪造方法
    async get20PreviousData() {
      // 生成指定范围内的随机值
      function getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      // 模拟异步请求延迟
      await new Promise(resolve => setTimeout(resolve, 100));

      const data = {
        数据: []
      };

      for (let i = 0; i < 20; i++) {
        data.数据.push({
          时间: `数据${i}`, // 假设有一个时间属性，这里用字符串表示
          CPU占用率: [getRandomValue(0, 100)],
          内存占用率: [getRandomValue(0, 100)],
          硬盘写入量: [getRandomValue(0, 1000)],
          硬盘读取量: [getRandomValue(0, 1000)]
        });
      }
      console.log(data)
      return data;
    },
    // 获取前20个数据
    async getbefortime() {
      // const { data: res } = await this.get20PreviousData()
      this.beforinfo = await this.get20PreviousData()
      console.log('******', this.beforinfo)
    },
    serverCpubefor() {
      // 这里假设使用axios或其他方式从服务器获取数据
      // 假设服务器端接口返回的数据格式如：{ data: [{ id: 1, value: 'Data 1' }, ...] }
      return new Promise((resolve) => {
        setTimeout(() => {
          const data = Array.from({ length: 20 }, (_, index) => ({
            id: index + 1,
            value: `Data ${index + 1}`,

          }));
          resolve({ data });
        }, 1000);
      });
    },
    //获取前20个时间，并把前20个时间，和前20个数据存入对应的xAxis和series的data中，这样图表生成就有数据
    addbeforData() {
      var hh = new Date().getHours();
      var mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      var ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      for(var i=0;i<=19;i++){
        if(ss>12){
          ss=ss-3
        }else if(12<=ss>=3){
          ss='0'+(ss-3)
        }else{
          if(mf>=11){
            mf=mf-1
            ss=60-3
          }else{
            mf='0'+(mf-1)
            ss=60-3
          }
        }
        var befortime = [hh, mf, ss].join(":");
        console.log('---***---',befortime )
        console.log('---***---',this.beforinfo.数据[i].CPU占用率[0] )
        this.option.xAxis[0].data.unshift(befortime);
        // 添加初始cpu占用率数据
        this.option.series[1].data.unshift(this.beforinfo.数据[i].CPU占用率[0]);
        // 添加初始内存占用率数据
        this.option.series[0].data.unshift(this.beforinfo.数据[i].内存占用率[0]);
        // 添加初始磁盘写入量数据
        this.option.series[2].data.unshift(this.beforinfo.数据[i].硬盘写入量[0]);
        // 添加初始磁盘读取量数据
        this.option.series[3].data.unshift(this.beforinfo.数据[i].硬盘读取量[0]);
        //console.log(befortime)
      }

    },
    initchart(){
      let myChart = echarts.getInstanceByDom(document.getElementById("main2"));
      myChart.hideLoading();
      myChart.setOption(this.option);
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    gettime(){
      var hh = new Date().getHours();
      var mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      var ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      var nowtime = [hh, mf, ss].join(":");
      return nowtime
    },
    //在watch中监听msg数据
    msg(val) {
      this.serverInfo = val
      if(this.option.series[1].data.length == '20' ) {
        // 删除头部数据
        this.option.xAxis[0].data.shift();
        this.option.series[1].data.shift();
        this.option.series[0].data.shift();
        this.option.series[2].data.shift();
        this.option.series[3].data.shift();

        // 队尾添加数据
        this.option.xAxis[0].data.push(this.gettime());
        this.option.series[1].data.push(this.serverInfo.数据.CPU占用率[0]);
        this.option.series[0].data.push(this.serverInfo.数据.内存占用率[0]);
        this.option.series[2].data.push(this.serverInfo.数据.硬盘写入量[0]);
        this.option.series[3].data.push(this.serverInfo.数据.硬盘读取量[0]);
      }
      this.initchart()
    },


  },
  created () {
      this.getbefortime()
  },
  mounted(){
    this.get20PreviousData()
  },
  //监听beforinfo值的变化
  watch: {
      beforinfo(newVal,oldVal){
        this.addbeforData()
        this.initchart()
      }
  },


};
</script>
<style scoped lang='less'>
.main{
  height: 100%;
  width:100%;
}
</style>
