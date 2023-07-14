// 故障风险评估的 ECharts 配置项
export const riskAssessmentOption = (data) => {
  return {
    title: [
      {
        left: 'center',
        text: '风险评估 & 趋势分析'
      },
    ],
    legend: {
      orient: 'vertical',
        x:'right',      //可设定图例在左、右、居中
        y:'top',     //可设定图例在上、下、居中
        padding:[0,50,150,0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
    },
    tooltip: {
      trigger: 'axis',
      showContent: false
    },
    dataset: {
      source: [
        ['year', '2012', '2013', '2014', '2015', '2016', '2017'],
        ['高风险', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
        ['中风险', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
        ['低风险', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
      ]
    },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    grid: { top: '55%' },
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' },
        color: '#0F6BAE', // 设置第一个系列的颜色为红色
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' },
        color: '#248BD6', // 设置第二个系列的颜色为绿色
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' },
        color: '#83B8FF', // 设置第三个系列的颜色为蓝色
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
        emphasis: {
          focus: 'self'
        },
        label: {
          formatter: '{b}: {@2012} ({d}%)'
        },
        encode: {
          itemName: 'year',
          value: '2012',
          tooltip: '2012'
        },
        color: ['#0F6BAE', '#248BD6', '#83B8FF'], // 设置饼状图扇区的颜色
      }
    ]
  }
}