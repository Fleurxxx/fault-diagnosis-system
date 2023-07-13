<template>
  <div>
    <button @click="downloadZip">下载ZIP文件</button>
  </div>
</template>

<script>
export default {
  methods: {
    downloadZip() {
      const zipUrl = 'src/assets/korean_PP-OCRv3_rec_infer.zip';

      // 创建下载链接
      const downloadLink = document.createElement('a');
      downloadLink.href = zipUrl;
      downloadLink.download = 'file.zip';

      // 触发下载
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    },
  },
};
</script>
