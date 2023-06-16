/*
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-03-09 21:54:17
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-04-01 16:16:58
 * @FilePath: \oss-backstage\mock\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入 mockjs ($ npm install mockjs)
import Mock from 'mockjs'

/**
 * 用户管理
 */
let data1 = Mock.mock({
  "data|10": [ //生成10条数据 数组
    {
      "userId|+1": 1,//生成用户id，自增1
      "image": "@image('200x200','red','#fff','avatar')",
      "phone": /^1(5|3|7|8)[0-9]{9}$/,
      "email": "@email()",
      "username": "@cname()",
      "date": "@date()",
      "state":"普通用户"
    }
  ]
})

//user数据
Mock.mock('/api/getUserList', (req) => {
  // 输出请求参数
  console.log(req)
  // let json = JM.getJsonFile('./user.json5')
  // 返回数据
  return {
    data1
  }
})

/**
 * 子用户管理
 */
let data2 = Mock.mock({
  "data|10": [ //生成10条数据 数组
    {
      "id|+1": 1,//生成用户id，自增1
      "image": "@image('200x200','red','#fff','avatar')",
      "phone": /^1(5|3|7|8)[0-9]{9}$/,
      "email": "@email()",
      "username": "@cname()",
      "createTime": "@date()",
      "updateTime": "@date()"
    }
  ]
})

//subuser数据
Mock.mock('/api/getSubUserList', (req) => {
  // 输出请求参数
  console.log(req)
  // let json = JM.getJsonFile('./user.json5')
  // 返回数据
  return {
    data2
  }
})




let data3 = Mock.mock({
  "data|10": [ //生成10条数据 数组
    {
      "id|+1": 1,//生成用户id，自增1
      "book1|1-3":true,//1/4是true，3/4是false
      "image": "无", //图片水印
      "versionControl": "已开启", //版本控制
      "storageLevel": "标准存储",  //存储类型
      "number|1-100.3":1, //随机生成1-100的整数，3位小数
      'capacity|1-999999999':0,
      'standardCapacity|1-999999999':0,
      'pigeonholeCapacity|1-999999999':0,
      "name":"@ctitle",
      "createTime": "@date()",
      "updateTime": "@date()"
    }
  ]
})

//subuser数据
Mock.mock('/api/getBucket', (req) => {
  // 输出请求参数
  console.log(req)
  // let json = JM.getJsonFile('./user.json5')
  // 返回数据
  return {
    data3
  }
})






// 不限制请求方式(测试)
Mock.mock('/api/login', (req) => {
  // 输出请求参数
  console.log(req)
  // 返回数据
  return {
    // 输出数据(随机生成姓名)
    'name': '@name',
    // 还可以自定义其他数据
  }
})

// 限制 post
Mock.mock('/api/post', 'post', (req) => {
  // 输出请求参数
  console.log(req)
  // 返回数据
  return {
    // 输出数据(随机生成姓名)
    'name': '@name',
    // 还可以自定义其他数据
  }
})

// 限制 get
Mock.mock('/api/get', 'get', (req) => {
  // 输出请求参数
  console.log(req)
  // 返回数据
  return {
    // 输出数据
    'age|10-20': 10
    // 还可以自定义其他数据
  }
})

// 返回数据方式，所有请求方式都支持
Mock.mock('/api/login2', {
  "code": 200,
  "data": {},
  "msg": "请求成功"
})
// Mock.mock('/api/login1', require('./test.json'))
// Mock.mock('/api/login3', (req) => {
//   return require('./test.json')
// })

