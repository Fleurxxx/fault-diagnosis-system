<template>
  <div class="min-box">
    <json-viewer
              :value="jsonData"
              :expand-depth="5"
              class="viewer"
              copyable
              boxed
              sort
              :expanded="expanded"
              :key="expanded">
              </json-viewer>
              <a-button type="primary" @click="toggleExpanded" >{{expanded ? '收起' : '展开'}}</a-button>

  </div>
</template>

<script>
import jsonView from '../components/JsonView.vue'
export default {
  name: '',
  components: {
    jsonView
  },
  data () {
    return {
      visible: false,
      expanded: false,
      jsonStr:"{\r\n    \"success\": true,\r\n    \"code\": 200,\r\n    \"msg\": \"操作成功\",\r\n    \"data\": \"\"\r\n}",
      jsonData: {
        "name": "小明",
        "age": 24,
        "gender": true,
        "height": 1.85,
        "weight": null,
        "skills": [
          {
            "PHP": [
              "Laravel",
              "Composer"
            ]
          },
          {
            "JavaScript": [
              "jQuery",
              "Vue",
              "React"
            ]
          },
          "Golang",
          "Python",
          "Lua"
        ]
      }
    }
  },
  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style lang='less'>
.min-box{
  height: 400px;
  width: 700px;
}
.viewer{
  width: 60%;
  min-width: 3.125rem;
  text-align: left;
  padding-left: 50px;
  padding-bottom: 30px;
}
</style>
