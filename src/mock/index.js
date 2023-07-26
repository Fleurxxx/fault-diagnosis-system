/*
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-14 16:10:27
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-07-25 20:01:37
 * @FilePath: \maintenance\src\mock\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//引入mock进行请求/拦截请求接口
import Mock from "mockjs";
//导入模拟的数据
import httpdata from "./http.js";


//拦截请求返回模拟的数据（当访问这个接口时，返回响应的数据）
//第一个参数是请求的接口api,第二个参数是请求方式get/post,第三个参数是一个函数(数据)
Mock.mock('/home/test', 'post', httpdata.testData)
Mock.mock("/home/getdata", "get", httpdata.getData);
Mock.mock("/home/postdata", "post", httpdata.postData);

Mock.mock("/echarts/bar", "post", httpdata.getBar);
//获取接口列表详情
Mock.mock("/interface/getlist", "get", httpdata.getlist);
//获取浏览记录列表
Mock.mock("/interface/getbrowsing", "get", httpdata.getbrowsing);




