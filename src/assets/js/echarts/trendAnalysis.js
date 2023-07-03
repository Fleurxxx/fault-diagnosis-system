// 趋势分析echarts图配置项、
var yData = function (trendData) {
  var data = [];
  for (var i = 0; i < trendData.length; i++) {
    data.push(trendData[i]);
  }
  return data;
};
export const trendAnalysisOption = (dateData, riskData) => {
  return {
    xAxis: {
      type: 'category',
      data: dateData,
    },
    yAxis: {
      type: 'value',
    },
    tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
       trigger: 'axis',
       backgroundColor: 'rgba(32, 33, 36,.7)',
       borderColor: 'rgba(32, 33, 36,0.20)',
       borderWidth: 1,
       textStyle: { // 文字提示样式
         color: '#fff',
         fontSize: '12'
       },
       axisPointer: { // 坐标轴虚线
         type: 'cross',
         label: {
             backgroundColor: '#6a7985'
         }
       },
     },
    series: [
      {
        name: '故障次数',
        type: 'line',
        data: riskData,
      },
    ],
  }
}