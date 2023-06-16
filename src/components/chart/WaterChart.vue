
  <template>
	<div class="wrap-container">
		<div class="wp-content">
			<!-- <div class="wp-title">水球图</div> -->
			<div class="wp-body">
				<div class="wrap-container">
					<div class="chartsdom" id='chart-polo'></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	// 注意 echartsLiquidfill ver3对应echarts 版本 5；（echartsLiquidfill ver2对应echarts 版本 4）
	// eslint-disable-next-line
	import 'echarts-liquidfill'
	export default {
		name: 'water-polo',
		data() {
			return {
				option: null
			}
		},
		mounted() {
			this.getEchart()
		},
		methods: {
			getEchart() {
				// 获取渲染元素，创建 chart
				let myChart = this.$echarts.init(document.getElementById('chart-polo'))
				this.option = {
					series: [{
						// 水球图类型
						type: 'liquidFill',
						// 名称
						name: "容量",
						// 水波值，可多个
						data: [0.62],
						// 球相对渲染元素的宽高的半径比
						radius: '62%',
						// 水波颜色
						color: ['#00B9F5'],
						// 水波背景的样式
						backgroundStyle: {
							// 背景颜色
							color: 'rgba(0,0,0,0.5)',
							// 边框颜色
							borderColor: '#007bff',
							// 边框宽度
							borderWidth: 3,
							shadowColor: 'rgba(0,123,225,.4)',
							shadowBlur: 20
						},
						// 是否显示外轮廓
						outline: {
							show: true
						},
						
					}],
					// 鼠标进入是否显示提示
					tooltip:{
						show: true
					}
				}
 
				myChart.setOption(this.option, true)
				window.addEventListener('resize', () => {
					myChart.resize()
				})
				// 第二种 水球图
				const dataOption = {
					value: 0.40,
					itemStyle: { //渐变水球颜色
					color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
								offset: 0,
								color: "pink",
							},
							{
								offset: 1,
								color: "skyblue",
							},
						]),
					},
				};
				this.option = {
					series: [{
						type: "liquidFill",
 
						// 这三个属性值设置为false静止的波浪
						// waveAnimation: false, //静止的波浪效果
						animationDuration: 1000, // 波浪初始上涨时间
						// eslint-disable-next-line
				 	    // animationDurationUpdate: 0,//静止的波浪效果
						// 这三个属性值设置为false静止的波浪
 
						amplitude: "5%", //振幅波浪大小
						name: "已用空间",
						data: [dataOption],
						waveLength: "60%", //波浪长度
						// eslint-disable-next-line
						outline: {
								//隐藏轮廓
								show: false,
							},
						label: {
							//字体内容、字体颜色、字体大小属性
							formatter: "总空间",
							color: "#fff",
							fontSize: 30,
						},
						backgroundStyle: {
							//水球图背景
							color: "#619ac3",
						},
 
						// color: ["#F87900"],
					}, ],
					tooltip: {
						//鼠标滑过展示数据
						show: true,
					},
				};
				
				myChart.setOption(this.option);
			}
		}
	}
</script>
 
<style lang="less" scoped>
	.wp-title{
		text-align: center;
		color: white;
	}
	.wrap-container {
		width: 240px;
		height: 240px;
 
		.chartsdom {
			width: 100%;
			height: 100%;
		}
	}
</style>