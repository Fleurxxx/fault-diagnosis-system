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
};
