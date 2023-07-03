// 故障风险评估的 ECharts 配置项
export const riskAssessmentOption = (data) => {
  return {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      data: ['高风险', '中风险', '低风险'],
    },
    series: [
      {
        name: '风险评估',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
}