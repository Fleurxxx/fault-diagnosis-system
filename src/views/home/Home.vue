<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-01 20:28:39
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-12 16:39:13
 * @FilePath: \maintenance\src\views\home\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home-box">
    <!-- <p className="color">首页</p>
    <span id="intro_title">1</span>
    <span id="intro_mine">2</span>
    <div id="intro_save" >3</div> -->
    <div class="content">
      <!-- 第一行 -->
      <Row :gutter="14">
        <Col span="7">
            <Card >
              <p class="title">总访问量及独立访客量</p>
              <HalfDoughnut />
            </Card>
            <div style="height: 15px;" ></div>
            <Card >
              <div class="t_top_box" >
                  <!-- <img class="t_l_line" src="../../assets/image/left_line.png" alt=""> -->
                  <p class="title">故障分布</p>
                  <RadarChart />
                  <!-- <img class="t_r_line line1" src="../../assets/image/r_line1.png" alt=""> -->
              </div>
            </Card>
        </Col>
        <Col span="10">
          <Card>
            <div class="t_top_box" >
                    <ul class="t_nav">
                      <li class="auv">
                          <span>模型数</span>
                          <h1>7</h1>
                          <i></i>
                      </li>
                      <li class="auv">
                          <span>日增加数</span>
                          <h1>2</h1>
                          <i></i>
                      </li>
                      <li>
                          <span>空间用量</span>
                          <h1>75%</h1>
                      </li>
                    </ul>
                    <!-- <Icon type="md-arrow-round-up" class="t_nav_but" size="25"/> -->
                    <Button type="warning" class="t_nav_but" ghost>升级</Button>
              </div>
          </Card>
          <div style="height: 15px;" ></div>
          <Card>
            <!-- <template v-slot:title>
                <p class="title">在线状态</p>
            </template> -->
            <div class="t_top_box">
                <!-- <img class="t_l_line" src="../../assets/image/left_line.png" alt=""> -->
                <div class="left-side">
                    <Space>
                      <Space direction="vertical" class="left-content">
                        <p>test</p>
                        <h1 >未运行</h1>
                        <!-- <h1 style="color: #15cb30;">运行中</h1> -->
                      </Space>
                      <Space direction="vertical" class="left-content">
                        <p>最近7天调用</p>
                        <h1>3</h1>
                      </Space>
                      <Space direction="vertical" class="left-content">
                        <p>无调用时长</p>
                        <h1>0.18天</h1>
                      </Space>
                    </Space>
                  </div>
                <!-- <img class="t_r_line line1" src="../../assets/image/r_line1.png" alt=""> -->
            </div>
          </Card>
        </Col>
        <Col span="7">
          <Card >
            <div class="secondLeftTab">
                <div class="fig">
                    <p>当日纳税人咨询最热问题 TOP5</p>
                </div>
                <ul class="hottop">
                    <li><span>1</span><p>如何代开发票？</p><a href="">了解详情</a></li>
                    <li><span>2</span><p>如何代开发票？</p><a href="">了解详情</a></li>
                    <li><span>3</span><p>如何代开发票？</p><a href="">了解详情</a></li>
                    <li><span>4</span><p>如何代开发票？</p><a href="">了解详情</a></li>
                    <!-- <li><span>5</span><p>如何代开发票？</p><a href="">了解详情</a></li> -->
                </ul>
            </div>
          </Card>
        </Col>
    </Row>
    <div class="ball">
      <Card>
        <p class="title">近期故障分布趋势</p>
        <div class="ball_box" >
            <!-- <Bubble  style="width:700px;"/> -->
            <StackArea style="width:700px;"/>
        </div>
      </Card>
    </div>

    <div style="height: 15px;" ></div>
    <!-- 第二行 -->
    <Row :gutter="6">
        <Col span="12">
          <Card >
            <div class="t_top_box">
                <!-- <img class="t_l_line" src="../../assets/image/left_line.png" alt=""> -->
                <PieAndLine />
                <!-- <img class="t_r_line line1" src="../../assets/image/r_line1.png" alt=""> -->
            </div>
          </Card>
        </Col>
        <Col span="12">
          <Card >
            <div class="t_top_box">
                <!-- <img class="t_l_line" src="../../assets/image/left_line.png" alt=""> -->
                <MassData />
                <!-- <img class="t_r_line line1" src="../../assets/image/r_line1.png" alt=""> -->
            </div>
          </Card>
        </Col>
    </Row>
    <div style="height: 15px;" ></div>
    <!-- 第三行 -->
    <Row :gutter="6">
        <Col span="24">
          <Card >
            <div class="t_top_box">
                <!-- <img class="t_l_line" src="../../assets/image/left_line.png" alt=""> -->
                <Rate/>
                <!-- <img class="t_r_line line1" src="../../assets/image/r_line1.png" alt=""> -->
            </div>
          </Card>
        </Col>
    </Row>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import Driver from 'driver.js' // 页面引导操作
import 'driver.js/dist/driver.min.css'
import PieAndLine from '../../components/chart/PieAndLine.vue';
import Rate from '../../components/chart/rate/Rate.vue'
import MassData from '../../components/chart/MassData.vue'
import RadarChart from '../../components/chart/RadarChart.vue'
import Bubble from '../../components/chart/Bubble.vue';
import HalfDoughnut from '../../components/chart/HalfDoughnut.vue';
import StackArea from '../../components/chart/StackArea.vue';

onMounted(() => {
  // showTips()
})
function showTips() {
  const driver = new Driver({
    prevBtnText: '上一步',
    nextBtnText: '下一步',
    doneBtnText: '我知道了',
    closeBtnText: '关闭'
  })
  const steps = [
    {
      element: '#intro_title',
      popover: {
        title: '这是本站首页',
        description: '本站首页是一些展示性的信息',
        position: 'bottom'
      }
    },
    {
      element: '#intro_mine',
      popover: {
        title: '这是帮助',
        description: '点此处可获取一些本站的相关说明',
        position: 'bottom'
      }
    },
    {
      element: '#intro_save',
      popover: {
        title: '联系我们',
        description: '点击这里可获取我们的相关信息',
        position: 'bottom'
      }
    }
  ]
  driver.defineSteps(steps)
  driver.start()
}

</script>

<style lang="scss" >
li{
    list-style:none;
}
div#driver-popover-item .driver-popover-footer button {
  font: 14px;
  text-shadow: none;
  color: #fff;
  background-color: #0089ff;
  border-color: #0089ff;
  border-radius: 5px;
  line-height: 2;
}
div#driver-popover-item .driver-popover-title {
  font: 16px / normal sans-serif;
  font-weight: 600;
}
div#driver-popover-item .driver-popover-footer .driver-close-btn {
  background-color: #fff;
  border-color: #fff;
  border-radius: none;
  color: #a2a3a5;
}
div.driver-popover-footer {
  .driver-btn-group {
    display: flex;
    justify-content: center;
    button.driver-prev-btn {
      display: none !important; // 隐藏上一步按钮操作
    }
  }
}
div#driver-highlighted-element-stage {
  border-radius: 5px;
}

.home-box{
  // flex-direction: column;
  // box-sizing: border-box;
  // position: sticky;
  // top:0;
  width:100%;
  height: 220vh;
  // // height:100%;
  // box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.08);
}
// .content{
//   padding: 10px;
// }

.title{
  text-align: left;
  font-weight: bolder;
  font-size: 20;
  padding-bottom: 5px;
  padding-left: 10px;
}

.auv{
  border-right: 1px solid #2f2a2a; //实线
  // border-right:1px dashed #000 //虚线
}
.t_top_box{
  padding-top: 5px;
  padding-bottom: 5px;
}
.t_l_line{
    position: absolute;
    top: 0;
    left: 0;
}
.t_r_line{
    position: absolute;
    bottom: 0;
    right: 0;
    overflow:hidden;
}
.t_nav li {
    display: inline-block;
    width: 30%;
    height: 100%;
    text-align: center;
    position: relative;
    line-height: 2em;
    left: -10px;
    // letter-spacing: 2px;
}
.t_nav_but{
  position: absolute;
  right: 20px;
  top:25px;
  color:#4eb241;

}

.left-side {
  padding-top:10px;
  padding-left: 10%;
  text-align: left;

}
.left-content{
  // display: inline-block;
  padding-right: 40px;
  padding-left:2px;
}



.secondLeftTab{
    width: 100%;
    // border:1px solid #00b3fe;
    border:1px solid #A7C0DE;
    padding:10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 10px;
}
.secondLeftTab:nth-of-type(1){
    margin-top: 0px;
}
.fig{
    height: 30px;
    line-height: 30px;
    border-top:1px solid #00b3fe;
    border-bottom: 1px solid #00b3fe;
    margin-bottom: 10px;
    padding-left: 15px;
    padding-right:15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.fig:nth-of-type(1){
    background-color: #6c91c2;
    padding:0px;
}
.fig p{
    font-size: 14px;
    color: #fff;
    float: left;
}
.fig em{
    float: right;
    font-size: 22px;
    font-weight: 900;
}
.fig:nth-of-type(2) em{
    color: #fffe7d;
}
.fig:nth-of-type(3) em{
    color: #ff7d01;
}
.fig:nth-of-type(4) em{
    color: #00b5fe;
}
.hottop li{
    height: 35px;
    line-height: 35px;
    border-bottom: 1px dashed #fff;
}
.hottop li:nth-last-child(1){
    border-bottom: none;
}
.hottop li span{
    float: left;
    display: inline-block;
    width: 20px;
    height: 20px;
    /*margin-top: 8px;*/
    vertical-align: middle;
    text-align: center;
    margin-right: 10px;
    color: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.hottop li:nth-of-type(1) span{
    // background-color: #ff0305;
    background-color: #CF3D3E
}
.hottop li:nth-of-type(2) span{
    // background-color: #ffb20c;
    background-color: #F7C97E;
}
.hottop li:nth-of-type(3) span{
    // background-color: #18d0c6;
    background-color: #D3E2B7;
}
.hottop li:nth-of-type(4) span{
    // background-color: #00b4ff;
    background-color: #74AED4;
}
.hottop li:nth-of-type(5) span{
    // background-color: #6c3ff2;
    background-color: #CFAFD4;
}
.hottop li p{
    float: left;
    color: #000000;
    font-size: 14px;
}
.hottop li a{
    float: right;
    color: #cecdcb;
    font-size: 14px;
}
.ball{
  position: relative;
  top:-340px;
  left: 30%;
  right: 0;
  width: 70%;
}
.ball_box{
  width: 100%;
  position: relative;
  left:40px;
}

</style>
