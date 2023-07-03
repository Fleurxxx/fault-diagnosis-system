<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-03-23 23:37:17
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-03-24 05:00:15
 * @FilePath: \oss-backstage\src\components\Chart\PieChart.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="chart-wrap">
      <div id="chart20" class="chart" />
    </div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsDrilldown from 'highcharts/modules/drilldown'
import Highcharts3D from 'highcharts/highcharts-3d'
import Highmaps from 'highcharts/modules/map'
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts)
Highcharts3D(Highcharts)
Highmaps(Highcharts)

export default {
name: 'Index',
data () {
    return {
    chart: null,
    data: [
        { name: '归档存储', value: 26},
        // { name: '冷归档存储', value: 150 },
        { name: '标准存储', value: 150 },
        // { name: '低频访问存储', value: 150 }
    ]
    }
},
mounted() {
    this.createChartHandler()
},
methods: {
    // 创建图表
    createChartHandler () {
    const options = this.getChartOption(this.data)
    this.chart && this.chart.destroy()
    this.chart = new Highcharts.Chart('chart20', options)
    },
    // 获取图表配置项
    getChartOption (pieData) {
    const data = [
        {
            name: '归档存储',
            y: 13,
            color: '#00D7E9',
            sliced: true,
            selected: true
        },
        // {
        //     name: '冷归档存储',
        //     y: 8,
        //     color: '#1FB5FF'
        // },
        {
            name: '标准存储',
            y: 8,
            color: '#2e317c'
        },
        // {
        //     name: '低频访问存储',
        //     y: 8,
        //     color: '#2b73af'
        // }
    ]
    data.forEach(item => {
        const temp = pieData.filter(elm => elm.name === item.name)
        item.y = temp[0].value
    })
    return {
        chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        options3d: {
            enabled: true,
            alpha: 65,
            beta: 0
        }
        },
        title: {
        text: null
        },
        credits: {
        enabled: false
        },
        tooltip: {
        pointFormat: '<b>{point.y}</b>'
        },
        plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 20,
            size: 140,
            distance: 1,
            zIndex: 1
        }
        },
        series: [{
        type: 'pie',
        name: '企业占比',
        data: data,
        dataLabels: {
            style: {
                'color': '#131824',
                'fontSize': '12px',
                'fontWeight': 'normal',
                'textOutline': 'none'
            },
            useHTML: true
        }
        }]
    }
    }
}
}
</script>

<style lang="less" scoped>
 .chart-wrap{
    width: 400px;
	height: 200px;
    .chart{
        width: 100%;
		height: 100%;
    }
 }
</style>