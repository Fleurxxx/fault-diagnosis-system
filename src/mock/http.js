/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-06-14 16:13:21
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-07-25 20:14:48
 * @FilePath: \maintenance\src\mock\http.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Mock from 'mockjs'

const Random = Mock.Random

let testData = [] // 用于接受生成数据的数组
let size = [
  '300x250', '250x250', '240x400', '336x280',
  '180x150', '720x300', '468x60', '234x60',
  '88x31', '120x90', '120x60', '120x240',
  '125x125', '728x90', '160x600', '120x600',
  '300x600'
] // 定义随机值
for(let i = 0; i < 10; i ++) { // 可自定义生成的个数
  let template = {
    'Boolean': Random.boolean, // 可以生成基本数据类型
    'Natural': Random.natural(1, 10), // 生成1到100之间自然数
    'Integer': Random.integer(1, 100), // 生成1到100之间的整数
    'Float': Random.float(0, 100, 0, 5), // 生成0到100之间的浮点数,小数点后尾数为0到5位
    'Character': Random.character(), // 生成随机字符串,可加参数定义规则
    'String': Random.string(2, 10), // 生成2到10个字符之间的字符串
    'Range': Random.range(0, 10, 2), // 生成一个随机数组
    'Date': Random.date(), // 生成一个随机日期,可加参数定义日期格式
    'Image': Random.image(Random.size, '#02adea', 'Hello'), // Random.size表示将从size数据中任选一个数据
    'Color': Random.color(), // 生成一个颜色随机值
    'Paragraph':Random.paragraph(2, 5), //生成2至5个句子的文本
    'Name': Random.name(), // 生成姓名
    'Url': Random.url(), // 生成web地址
    'Address': Random.province() // 生成地址
  }
  testData.push(template)
}
function generateRandomKey() {
  const characters = 'abcdef0123456789';
  const sections = [8, 4, 4, 4, 12]; // 每个部分的长度
  let uuid = '';
  for (let i = 0; i < sections.length; i++) {
    for (let j = 0; j < sections[i]; j++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uuid += characters.charAt(randomIndex);
    }
    if (i < sections.length - 1) {
      uuid += '-';
    }
  }
  return uuid;
}

function generateRandomId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  return id;
}


//模拟的请求数据
export default {
  testData,
  getData: () => {
    return {
      code: 200,
      message: "success",
      data : Mock.mock({"data|1-20": [{
        'date': "@date",
        'name': "@string(5)",
        'age': "@integer(1, 100)",
        'sex|1': ['男', '女', '未知'],
        }]
      })
    }
  },
  postData: () => {
    return {
      code : 200,
      data :Mock.mock({
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
    };
  },
  getBar: () => {
    return {
      code : 200,
      data :Mock.mock({
        "list|108": [ //生成10条数据 数组
          {
            "cnt|+1":0,
            "data":Random.integer(50, 700),
            "titlex":"feature"+"@cnt"
          }
        ]
      })
    };
  },
  //获取接口列表
  getlist: () => {
    return {
      code : 200,
      data :Mock.mock({
        "list|8": [ //生成10条数据 数组
          {
            "dd|1":[Random.string('lower',4),Random.string('lower',4),Random.string('lower',4),Random.string('lower',4),Random.string('lower',4),Random.string('lower',4),Random.string('lower',4)],
            "pp|1":[Random.string('lower',5),Random.string('lower',5),Random.string('lower',5),Random.string('lower',5),Random.string('lower',5),Random.string('lower',5),Random.string('lower',5)],
            "id": "@dd" + "@integer(1000, 9999)",
            "secret": "@guid",
            "data":Random.integer(50, 700),
            "url":'http://clouddoctor/' + "@pp",
            "endtime":"@time('HH:mm:ss')",
            "status|1":[1,0],
            // "status":"@boolean",
          }
        ]
      })
    };
  },
 //获取接口列表
 getbrowsing: () => {
    return {
      code : 200,
      data :Mock.mock({
        "list|8": [ //生成10条数据 数组
          {
            "dd|1":[Random.string('lower',4),Random.string('lower',4),Random.string('lower',4),Random.string('lower',4),Random.string('lower',4),Random.string('lower',4),Random.string('lower',4)],
            "pp|1":[Random.string('lower',5),Random.string('lower',5),Random.string('lower',5),Random.string('lower',5),Random.string('lower',5),Random.string('lower',5),Random.string('lower',5)],
            "id": "@dd" + "@integer(1000, 9999)",
            "title":"系统测试测试签名请求",
            "secret":Random.ip(),
            "data":Random.integer(50, 700),
            "url":'http://clouddoctor/' + "@pp",
            "day":"@date('yyyy-MM-dd')",
		        "time":"@time('HH:mm:ss')",
            "endtime":"@day"+ " " +"@time",
            "duration":"@integer(10, 130)",
            "status|1":[1,0],
            // "status":"@boolean",
          }
        ]
      })
    };
  },

};
