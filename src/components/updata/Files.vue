<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-02 08:14:33
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-06-05 22:45:16
 * @FilePath: \maintenance\src\components\Files.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
        <div>
            <Card>
                <Upload
                    multiple
                    type="drag"
                    action=""
                   :before-upload="beforeUpload">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                    </div>
                </Upload>
                <!-- <Upload action="" :before-upload="beforeUpload">
                    <Button icon="ios-cloud-upload-outline">上传Csv文件</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;点击上传Csv文件
                </Upload> -->
                <!-- <p>util.js提供两个方法用来实现这个功能：</p>
                <p class="update-table-intro"><Icon style="margin-right: 10px;" :size="10" type="md-heart"/><span class="code-high-line">getArrayFromFile</span>：将Csv文件解析为二维数组</p>
                <p class="update-table-intro"><Icon style="margin-right: 10px;" :size="10" type="md-heart"/><span class="code-high-line">getTableDataFromArray</span>：将二维数组转为表格数据，具体请看文档</p> -->
            </Card>
        </div>
    </div>
    <div class="table">
        <Table :height="500" :columns="columns" :data="tableData"/>
    </div>
  </template>

  <script>
  import { getArrayFromFile, getTableDataFromArray } from '../../utils/util'
  export default {
    name: 'update_table_page',
    data () {
      return {
        columns: [],
        tableData: []
      }
    },
    methods: {
      beforeUpload (file) {
        getArrayFromFile(file).then(data => {
          let { columns, tableData } = getTableDataFromArray(data)
          this.columns = columns
          this.tableData = tableData
        }).catch(() => {
          this.$Notice.warning({
            title: '只能上传Csv文件',
            desc: '只能上传Csv文件，请重新上传'
          })
        })
        return false
      }
    }
  }
  </script>

  <style>
  .update-table-intro{
    margin-top: 10px;
  }
  .code-high-line{
    color: #2d8cf0;
  }
  .table{
    border: 1px solid rgba(227, 220, 220, 0.6);
    margin-top: 25px;
  }
  </style>
