<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-02 08:15:01
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-06-05 06:04:02
 * @FilePath: \maintenance\src\components\Hand.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-02 08:15:01
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-06-02 16:46:05
 * @FilePath: \maintenance\src\components\Hand.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <Row :gutter="10">
      <i-col span="12">
        <Card>
          <div class="update-paste-con">
            <paste-editor v-model="pasteDataArr" @on-success="handleSuccess" @on-error="handleError"/>
          </div>
          <div class="update-paste-btn-con">
            <span class="paste-tip">使用Tab键换列，使用回车键换行</span>
            <Button type="primary" style="float: right;" @click="handleShow">显示表格数据</Button>
          </div>
        </Card>
      </i-col>
      <i-col span="12">
        <Card>
          <Table :height="400" :columns="columns" :data="tableData"/>
        </Card>
      </i-col>
    </Row>
  </template>

  <script>
  import PasteEditor from '../paste-editor'
  import { getTableDataFromArray } from '../../utils/util'
  export default {
    name: 'update_paste_page',
    components: {
      PasteEditor
    },
    data () {
      return {
        pasteDataArr: [],
        columns: [],
        tableData: [],
        validated: true,
        errorIndex: 0
      }
    },
    methods: {
      handleSuccess () {
        this.validated = true
      },
      handleError (index) {
        this.validated = false
        this.errorIndex = index
      },
      handleShow () {
        if (!this.validated) {
          this.$Notice.error({
            title: '您的内容不规范',
            desc: `您的第${this.errorIndex + 1}行数据不规范，请修改`
          })
        } else {
          let { columns, tableData } = getTableDataFromArray(this.pasteDataArr)
          this.columns = columns
          this.tableData = tableData
          // console.log(tableData)
        }
      }
    }
  }
  </script>

  <style lang="less">
  .update-paste{
    &-con{
      height: 350px;
    }
    &-btn-con{
      box-sizing: content-box;
      height: 30px;
      padding: 15px 0 5px;
    }
  }
  // .update-paste-con{
  //   height: 350px;
  // }
  // .update-paste-btn-con{
  //   box-sizing: content-box;
  //     height: 30px;
  //     padding: 15px 0 5px;
  // }
  .paste-tip{
    color: #19be6b;
  }
  </style>
