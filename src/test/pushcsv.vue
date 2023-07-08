<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-07-01 19:34:17
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-01 22:01:32
 * @FilePath: \maintenance\src\test\pushcsv.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="preview-csv">
    <input type="file" ref="upload-csv" accept=".csv" />
    <el-button type="primary" @click="handleClick">Read CSV</el-button>
    <el-button @click="exportCsv">导出</el-button>
  </div>
</template>
<script>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import Papa from "papaparse";
import jschardet from 'jschardet';

// const res = await previewMarkingFile(filePath)
// if (res) {
//   this.parseCsvFile(res)
// } else {
//   throw new Error('未找到相关文件')
// }
export default {
  data() {
    return {
      csv: [
        ["a", "b", "c"],
        [1, 2, 3],
        [4, 5, 6]
      ],
      data: [
        // { name: '张三', age: 32 },
        // { name: '李四', age: 24 },
        {
              "id": "1",
              "name": "Roberta",
              "age": "39",
              "gender": "M"
          },
          {
              "id": "2",
              "name": "Oliver",
              "age": "25",
              "gender": "M"
          },
          {
              "id": "3",
              "name": "Shayna",
              "age": "18",
              "gender": "F"
          },
          {
              "id": "4",
              "name": "Fechin",
              "age": "18",
              "gender": "M"
          }
      ],
      encoding: ""
    };
  },
  mounted() {
    // Heiho(this.csv);
    // Heiho(this.data);
  },
  methods: {
    handleClick() {
      Heiho(this.data,{ max: 100, title: '在线浏览.csv' });
      // // 若文件要从后台获取，将事件监听换成 调用后台接口的操作即可；
      // const that = this;
      // const file = that.$refs["upload-csv"].files[0];
      // console.log(file)
      // const fReader = new FileReader();
      // fReader.readAsDataURL(file);
      // fReader.onload = function(evt) {
      //   const data = evt.target.result;
      //   that.encoding = that.checkEncoding(data);
      //   that.parseCsvFile(file);
      // };
    },
    parseCsvFile(file) {
      //引入Papaparse.js，将数据转换成二维数组
      Papa.parse(file, {
        encoding: this.encoding,
        complete: function(results) {
          const arrs = results.data;
          // 去除最后的空行
          const lastItem = arrs[arrs.length - 1].every(val => val === "");
          lastItem && arrs.pop();
          // 通过heiho.js预览csv:https://github.com/kktsvetkov/heiho
          Heiho(arrs);
        }
      });
    },
    checkEncoding(base64Str) {
      // 要用二进制格式
      const str = atob(base64Str.split(";base64,")[1]);
      let encoding = jschardet.detect(str).encoding;
      encoding === "windows-1252" && (encoding = "ANSI"); // 有时会识别错误（如UTF8的中文二字）若这里中文还是出现了乱码问题，可将encoding设置为gb18030（全称： 信息技术 中文编码字符集）
      return encoding;
    },
    //导出
    exportCsv() {
        let keys = Object.keys(this.data[0]);
        console.log(keys)
        const header = {}
        let j=0;
        keys.forEach(item => {
          header[item]= item
        })
        console.log(header)
        // const header = { 'name': '姓名', 'age': '年龄' };

        export_csv(header, this.data);

        function export_csv(header, data) {
          let list = [];
          for (let i in data) {
              let item = data[i];
              let obj = {};
              for (let key in header) {
                  let title = header[key];
                  let value = item[key];
                  obj[title] = value;
              }
              list.push(obj);
          }

          var csv = Papa.unparse(list);
          //定义文件内容，类型必须为Blob 否则createObjectURL会报错
          let content = new Blob(['\uFEFF' + csv]);
          //生成url对象
          let urlObject = window.URL || window.webkitURL || window;
          let url = urlObject.createObjectURL(content);
          //生成<a></a>DOM元素
          let el = document.createElement("a");
          //链接赋值
          el.href = url;
          el.download = "文件导出.csv";
          //必须点击否则不会下载
          el.click();
          //移除链接释放资源
          urlObject.revokeObjectURL(url);
        }
    },
  }
};
</script>

