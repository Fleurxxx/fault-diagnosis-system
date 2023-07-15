// 故障风险评估的 ECharts 配置项
const getday2 = () => {
  let days = [];
  for(let i=0; i<=24*6;i+=24){		//今天加上前6天
    let dateItem=new Date(Date.getTime() - i * 60 * 60 * 1000);	//使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
    let y = dateItem.getFullYear();	//获取年份
    let m = dateItem.getMonth() + 1;	//获取月份js月份从0开始，需要+1
    let d= dateItem.getDate();	//获取日期
    m = this.addDate0(m);	//给为单数的月份补零
    d = this.addDate0(d);	//给为单数的日期补零
    let valueItem= y + '-' + m + '-' + d;	//组合
    days.push(valueItem);	//添加至数组
  }
  console.log('最近七天日期：',days);

  return days;		
}

//给日期加0
const addDate0 = (time) => {
  if (time.toString().length == 1) {
    time = '0' + time.toString();
  }
  return time;
}
export const riskAssessmentOption = (data) => {
  const today = new Date(); // 获取当前日期
  const sourceYear = ['year']; // 在 source 数组中添加 "year" 列

  // 根据需要设置日期的范围和格式
  for (let i = 6; i > 0; i--) { // 获取最近7天的日期
    let date = new Date(today);
    date.setDate(today.getDate() - i); // 减去 i 天
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); // 补零
    let day = String(date.getDate()).padStart(2, '0'); // 补零
    let label = `${year}-${month}-${day}`; // 设置日期的显示格式
    sourceYear.push(label); // 将日期添加到 sourceYear 数组中
  }
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
        sourceYear,
        // ['year', '2012', '2013', '2014', '2015', '2016', '2017'],
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