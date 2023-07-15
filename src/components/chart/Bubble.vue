<template>
  <div id='popChart' style="width:100%;height:300px"></div>
</template>

<script setup>
import { reactive,getCurrentInstance, onMounted } from 'vue';
import { Chart } from '@antv/g2';



const state = reactive({
  chart:null,//图表对象
  showData:[
    {
      "统计时间": '2022-01',
      "指标系数x": 1.78,
      "指标系数y": 1.69,
      "气泡大小展示的指标": 81,
      "气泡主标签指标": "语义错误",
    },
    {
      "统计时间": '2022-01',
      "指标系数x": 2.04,
      "指标系数y": 2.09,
      "气泡大小展示的指标": 121,
      "气泡主标签指标": "没有引入",
    },
    {
      "统计时间": '2022-01',
      "指标系数x": 2.58,
      "指标系数y": 1.63,
      "气泡大小展示的指标": 93,
      "气泡主标签指标": "不显示",
    },
    {
      "统计时间": '2022-01',
      "指标系数x": 2.98,
      "指标系数y": 2.52,
      "气泡大小展示的指标": 146,
      "气泡主标签指标": "节点出错",
    },
    {
      "统计时间": '2022-01',
      "指标系数x": 3.78,
      "指标系数y": 3.1,
      "气泡大小展示的指标": 79,
      "气泡主标签指标": "语法错误",
    },
    {
      "统计时间": '2022-01',
      "指标系数x": 1,
      "指标系数y": 1,
      "气泡大小展示的指标": 60,
      "气泡主标签指标": "",
    },
  ]//图表中将要显示的数据
})
// 创建chart
const popChart = (data) => {
  state.chart = new Chart({
    container: 'popChart',//chart容器id
    autoFit: true,//图表是否自适应容器宽高，默认为 false
    padding: [30, 0, 80, 30],//图表内边距,依次为:上，右，下，左
    // defaultInteractions:"ellipsis-text",//配置图表默认交互，仅支持字符串形式。G2 默认支持的交互有 'tooltip', 'legend-filter', 'legend-active', 'continuous-filter', 'ellipsis-text'
    pixelRatio: window.devicePixelRatio,//设置设备像素比，默认取浏览器的值 window.devicePixelRatio
    renderer: "canvas",//指定渲染引擎，默认使用 canvas。可选：'canvas' | 'svg'
    theme: "",//配置主题，目前 g2 默认有 dark 主题模式，如需要自定义配置，可以先通过 registerTheme 注册主题，再设置主题 key。
    visible: true,//chart 是否可见，默认为 true，设置为 false 则会隐藏。
  });
}
//设置轴
const popChartAxis = () => {
  var scale = {};
  scale["指标系数x"] = {
      type: 'pow',
      nice: true,
  }
  scale["指标系数y"] = {
      type: 'pow',
      nice: true,
  }
  state.chart.scale(scale, {//Y轴 字段是 度量
      nice: false,//是否自动调整 min、max 。默认为false
      min: 0.8,//度量最小值，
      max: 2,//度量最大值，如果不需要指定最大值可以设置max=null，或者不要填该参数
  });
  //设置Y轴
  //state.chart.axis("指标系数y",false);//不需要Y轴，可以设置false
  state.chart.axis("指标系数y", {//Y轴样式
    grid: {
      line: {
        type: "line",
        style: {
          // fill:'#fff',
          stroke: "#ccc",//网格线颜色
          opacity: 1,//网格线透明度
          lineDash: [1,3],//虚线
        }
      },
    },
    label: {
      style: {
        fill:"#fff",///Y轴文字颜色(y轴下标)
        fontFamily: "Microsoft YaHei",///Y轴文字字体
        fontWeight: 400,///Y轴文字粗细
        fontsize: 12,///Y轴文字大小
      }
    },
    line: {
      style: {
        stroke:"#fff",//坐标轴颜色
      }
    },
    tickLine: {
      style: {
        stroke:"#fff",//刻度线颜色
      }
    },
    subTickLine: {
      style: {
        stroke:"#fff",//小刻度颜色
      }
    }
  });
  //设置X轴
  // state.chart.axis("指标系数x",false);//不需要轴，可以设置false
  state.chart.axis("指标系数x", {//X轴样式
    label: {
      formatter: (val) => {
        return val;
        // return +val * 100 + '%';
      },
      style: {
        fill:"#fff",//文字颜色(x轴下标)
        fontFamily: "Microsoft YaHei",//文字字体
        fontWeight: 400,//文字粗细
        fontsize: 12,//文字大小
      }
    },
    line: {
      style: {
        stroke:"#fff",//坐标轴颜色
      }
    },
    tickLine: {
      style: {
        stroke:"#fff",//刻度线颜色
      }
    },
    subTickLine: {
      style: {
        stroke:"#fff",//小刻度颜色
      }
    }
  });
  state.chart.annotation().line({ //y辅助线
    top: true,
    start: [1, 'min'], //star\end 数字表示轴向原点偏移
    end: [1, 'max'],
    text: {
      content: '', //辅助线轴标签
      position: 'end',
      autoRotate: false,
      style: {
        textAlign: 'start' //标签显示位置
      }
    }
  });
  state.chart.annotation().line({ //x辅助线
    top: true,
    start: ['min', 1],
    end: ['max', 1],
    text: {
      content: '',
      position: 'end',
      style: {
        textAlign: 'end'
      }
    }
  })
}
//设置chart数据
const popChartData = () =>{
  state.chart.data(state.showData);
}
//设置气泡样式
const popChartStyle = () => {
  var line = state.chart.point();
  line.size(6)//圆点大小
  .style({
    // strokeOpacity:1,
    // fill: attrs.style.pointColor,
    stroke:"#000",//圆点边框颜色

  })
  .state({
    // selected: {
    //   style: {
    //     stroke:'red',
    //   }
    // }
    active: {
      style: {
      stroke:"#2681ff",//鼠标经过 边框颜色
      }
    }
  })
  .position("指标系数x"+"*"+"指标系数y")//X轴 * Y轴
  .size("气泡大小展示的指标"+"",[1,50])//气泡半径范围 1-30
  .color("气泡主标签指标", ["rgba(211, 202, 139, 0.3)", "rgba(211, 229, 252, 0.3)", "rgba(63, 110, 78, 0.3)", "rgba(164, 192, 77, 0.3)", "rgba(110, 152, 146, 0.3)"])//参数1：气泡主标签指标字段为分组字段，参数2：颜色数组，散点的颜色会循环的从颜色数组中取出来，这里我采用的都是带透明度的颜色
  .tooltip("指标系数x"+"*"+"指标系数y"+"*"+"气泡大小展示的指标"+"*"+"气泡主标签指标")
  .shape('circle');
  //柱子上是否显示值标签
  //line.label(false);//入组病例数
  line.label("气泡主标签指标", {//标签值
    content: (originData) => {
      return originData["气泡主标签指标"];//设置值标签最终显示的内容
    },
    style: {
      fill: "#000",
      fontFamily: "Microsoft YaHei",
      fontWeight: 400,
      fontsize: 16,
      // fill: "#000000",
    },
    position:"top",//显示位置
  })
}
//提示框样式
const popChartTooltip = () => {
  state.chart.tooltip({
    showMarkers: false,
    showCrosshairs: false,
    domStyles: {
      'g2-tooltip': {
        background:"rgba(00, 00, 00,0.5)",//背景RGBA形式的值
        color:"#fff",//文字颜色
        boxShadow:"0px 0px 5px #fff",//阴影大小 阴影颜色
      },
    },
    customItems: (items) => {//自定义显示的内容格式
      // console.log("items")
      // console.log(items)
      // items[0].name="xx";
      return items;
    },
  });
}
//设置图例
const popChartLegend = () => {
  // state.chart.legend(false);//设置为false，表示不显示图例
  state.chart.legend("气泡主标签指标", {
    position: "bottom",//图例位置："top" | "top-left" | "top-right" | "right" | "right-top" | "right-bottom" | "left" | "left-top" | "left-bottom" | "bottom" | "bottom-left" | "bottom-right"
    itemName: {
      style: {
        fill: "#000",
        fontFamily: "Microsoft YaHei",
        fontWeight: 400,
        fontsize: 16,
      }
    },
    pageNavigator: {
      marker: {//分页器指示箭头配置项
        style: {
          // 非激活，不可点击态时的填充色设置
          inactiveFill: "#000",//分页器：箭头颜色
          inactiveOpacity: 1,//分页器：箭头透明度
          // 默认填充色设置
          fill: "#000",//分页器：颜色
          opacity: 1,//分页器：透明度
          size: 12,//分页器：大小
        },
      },
      text: {//分页器指示文本配置项
        style: {
          fill: "#000",//分页器：文本颜色
          fontsize: 12,//分页器：文本大小
        },
      },
    },
  });
}
//设置动画
const popChartAnimate = () => {
  // state.chart.animate(false);//设置为false，表示不使用动画效果
  state.chart.animate({
    // 初始化时的入场动画
    appear: {
      animation: 'fade-in', // 动画名称:'fade-in'|'fan-in'|'scale-inx'|'scale-iny'|'path-in'|'zoom-in'|'clip-in'
      easing: 'easeQuadIn', // 动画缓动效果
      delay: 100, // 动画延迟执行时间
      duration: 600 // 动画执行时间
    },
    // 更新时的出现动画
    enter: {
      animation: 'fade-in', //动画名称:'fade-in'|'fan-in'|'scale-inx'|'scale-iny'|'path-in'|'zoom-in'|'clip-in'
      easing: 'easeQuadIn', // 动画缓动效果
      delay: 100, // 动画延迟执行时间
      duration: 600 // 动画执行时间
    },
    // 更新时的动画
    leave: {
      animation: 'path-out', //动画名称:'fade-out'|'path-out'|'zoom-out'|'lineWidth-out'
      easing: 'easeQuadIn', // 动画缓动效果
      delay: 100, // 动画延迟执行时间
      duration: 600 // 动画执行时间
    },
    // 更新时的变化动画
    update: {
      animation: 'fade-in', //动画名称:'fade-in'|'fan-in'
      easing: 'easeQuadIn', // 动画缓动效果
      delay: 100, // 动画延迟执行时间
      duration: 600 // 动画执行时间
    },
  })
}
//添加点击事件
const popChartClickEvent = () => {
  state.chart.on('element:click', (ev) => {
    var data = ev.data.data;
    console.log(data);
    alert(JSON.stringify(data)); //点击事件：单击弹出提示框显示单个气泡的数组数据
  });
}
//初始化图表方法
const init = () => {
  popChart();//创建chart
  popChartData();//设置字段和数据
  popChartAxis();//设置坐标轴和度量
  popChartTooltip();//设置提示信息
  state.chart.interaction('element-active');//设置图表样式
  popChartStyle();//设置图表气泡相关属性
  // chart.legend(false);//设置为false，表示不显示图例
  popChartLegend();//设置图例
  popChartAnimate();//设置动画
  //渲染图表
  state.chart.render();
  //添加点击事件
  popChartClickEvent();
}
defineExpose({ // 向父组件暴露调用方法
})
onMounted(() => { //挂载初始化方法
  init()
})
</script>

