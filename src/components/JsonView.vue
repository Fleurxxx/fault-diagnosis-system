<template>
  <div style="width: 300px;">
    <div v-show="showJson">
      <vue-json-viewer :value="jsonData" :expand-depth="expand"></vue-json-viewer>
    </div>
    <div v-show="!showJson">
      {{data}}
    </div>
  </div>
</template>

<script>
import vueJsonViewer from  'vue-json-viewer'

export default {
  name: '',
  data () {
    return {
      jsonData: this.data
    }
  },

  components: {
    vueJsonViewer
  },
  props: {
    showJson: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 展开层数
    expand: {
      type: Number,
      default: 2
    }
  },
  watch: {
    data () {
      this.jsonData = this.data
    }
  },
  computed: {

  },
  created () {
  },
  methods: {

  }
}
</script>

<style lang='less' module>
</style>
