<template>
  <div class="box">
    <div class="box-title">
      <p class="title">维修中心</p>
    </div>
    <div class="content_2">
      <div class="correct">
        <el-image style="width: 60px" :src="url" :fit="fit" />
      </div>
      <div class="step-content">
          <div class="step-title">{{ steps[status].title }}</div>
          <div class="step-description">{{ steps[status].description }}</div>
        </div>
      <div>
        <el-button class="next" @click="backToList">返回列表</el-button>
      </div>
    </div>
    <div class="middle">
      <Steps v-bind:steps="steps"></Steps>
    </div>
    <div class="middle">
      <div class="chat-container">
        <div class="chat-header">解决方案智能推荐</div>
        <div class="chat-content">
          <div class="message-list">
            <div v-for="message in messages" :key="message.id" class="message-item 'received-div'">
              <div class="avatar">
                <img :src="gpt" :alt="message.sender">
              </div>
              <div class="message-content received-message">{{ message.content }}</div>
            </div>
          </div>
          <div class="fixed-bottom">
            <el-button type="primary" @click="forMore">重新获取</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <Tabs v-model="activeTab" class="custom-tabs">
        <TabPane label="相似故障" name="name1" >
          <div class="left">
            <div class="small-div-body fault" v-if="wayData.length === 0">
              <el-empty description="未找到历史解决办法" image-size="130">
              </el-empty>
            </div>
            <div class="small-div-body fault" v-else>
              <div>
                <div class="blog" v-for="(way, index) in wayData" :key="way.id" @click="handleCheck(index)">
                  <div class="blog-right">
                      <div class="blog-text">
                          <div class="blog-title">
                              <p>{{ way.way }}</p>
                          </div>
                      </div>
                      <div class="blog-bottom">
                          <span>
                            <el-icon size="16" style="position:relative;top:3.5px;margin: 0 5px 0 10px"><View /></el-icon>
                            {{ way.view }}
                          </span>
                          <span>
                            <i class='fa fa-thumbs-o-up'></i>
                            {{ way.like }}
                          </span>
                          <span>{{ way.author }}</span>
                          <span>{{ way.date }}</span>
                      </div>
                  </div>
              </div>
              </div>
              <div class="pager">
                <el-pagination
                  :current-page="currentPage"
                  :page-size="pageSize"
                  layout="total, prev, pager, next"
                  :total="totalNum"
                  @current-change="handleCurrentChange"/>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane label="修复中心" name="name2">
          <div class="right">
            <div class="info">
              <Alert show-icon class="alert">
                提示
                <template #icon>
                    <Icon type="ios-bulb-outline"></Icon>
                </template>
                <template #desc>为了帮助我们共同改进和学习，需要您提供一些关于您解决故障的详细信息，填写以下内容时尽可能提供清晰准确的描述。</template>
              </Alert>
              <div class="info-content">
                <Toolbar
                  style="border-bottom: 1px solid #ccc"
                  :editor="editorRef"
                  :defaultConfig="toolbarConfig"
                  :mode="mode"/>
                <Editor
                  style="height: 500px; width: 100%; overflow-x: hidden;"
                  v-model="valueHtml"
                  :defaultConfig="editorConfig"
                  :mode="mode"
                  @onCreated="handleCreated"/>
              </div>
              <el-button class="next" @click="next">提交</el-button>
            </div>
          </div>
        </TabPane>
      </Tabs>
      <div>
        <!-- <el-button class="lef_btn" @click="">上一步</el-button> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElMessage, ElNotification } from 'element-plus';
import { ref, reactive, onBeforeUnmount, shallowRef, onMounted, computed } from 'vue';
import MyTimeLine from '../../components/MyTimeLine.vue';
import Steps from '../../components/Steps.vue';
import gpt from '../../assets/image/gpt.jpg';
import avatar from '../../assets/icon/head/羊1.png'
import { useRouter, useRoute } from "vue-router";
import apiFun from '../../api/api';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
const router = useRouter();
const route = useRoute();
const status = ref(1);
const url = ref('src/assets/image/correct.svg');
const pageSize = ref(5);
let totalNum = ref(5);
let currentPage = ref(1);
const steps = reactive([
  {
    title: '上传故障集',
    description: '进行重新分析',
    status: 'completed',
  },
  {
    title: '人员分析中',
    description: '请耐心等待哦',
    status: 'in-progress',
  },
  {
    title: '完成',
    description: '重新分析完成',
    status: 'uncompleted',
  },
]);
const messages = reactive([
  { id: 1, content: '如果在执行 sh ./startup.sh 时出现错误，可能是由于以下几种情况导致的：\n' + 
'权限问题：确保你有执行该脚本的权限。可以使用 chmod +x startup.sh 命令修改脚本文件的权限。\n' +
'脚本文件路径问题：确认当前路径是否正确。你可以使用 ls 命令检查当前目录下是否存在名为 startup.sh 的文件。\n' +
'脚本文件格式问题：如果脚本文件在其他平台或编辑器上创建，可能会导致格式不兼容。请确保文件格式为 UNIX 或 Linux 格式，可以使用 dos2unix 命令进行格式转换，如 dos2unix startup.sh（需提前安装 dos2unix 工具）。\n' +
'脚本语法错误：启动脚本本身可能存在语法错误，导致执行失败。你可以使用文本编辑器打开 startup.sh 文件，检查脚本语法是否正确。\n' +
'缺少依赖项：某些情况下，启动脚本需要依赖一些软件包或库文件。请确保所需的依赖项已经安装，并且路径设置正确。\n' +
'如果你能提供更具体的错误信息，我可以为你提供更详细的帮助和解决方案。'},
]);
const way = reactive({
  author: '最强运维',
  avatar: 'src/assets/icon/head/羊1.png',
  date: new Date(),
  view: 0,
  like: 0,
  flag: false,
  way: null,
  detail: null,
})
const wayData = reactive([
  {
    author: '小质',
    avatar: 'src/assets/icon/head/a1.png',
    date: '2023-01-02',
    view: 3200,
    like: 1042,
    flag: false,
    way: 'startup.sh不能正常启动',
    detail: `<h2 style="text-align: start;">可能原因及解决方案</h2><h3 style="text-align: start;">错误信息</h3><pre><code >You can see more details in logs/config-center.log</code></pre><h3 style="text-align: start;">可能原因</h3><p style="text-align: start;">为减少轻量级配置中心的标准输出日志，在<span style="background-color: rgba(0, 0, 0, 0.04); font-size: 14px;"><code>startup.sh</code></span>轻量级配置中心的启动脚本里关闭了输出，如下所示：</p><pre><code >nohup $JAVA -Daddress.server.ip=$SERVER_IP -Dderby.system.home=../ -jar -Dderby.stream.error.file=logs/derby.log ../lib/edas-config-center.jar --logging.config=../conf/logback.xml &gt;/dev/null 2&gt;&1 &</code></pre><p style="text-align: start;"><span style="color: rgb(24, 24, 24); background-color: rgb(220, 238, 255); font-size: 16px;"><strong>说明</strong></span><span style="color: rgb(24, 24, 24); background-color: rgb(220, 238, 255); font-size: 16px;"> </span>startup.bat<span style="color: rgb(24, 24, 24); background-color: rgb(220, 238, 255); font-size: 16px;">不存在此问题。</span></p><h3 style="text-align: start;">解决方案</h3><p style="text-align: start;"><span style="font-size: 16px;">确保已安装并正在使用JDK 1.8或以上版本。</span></p><ul><li style="text-align: start;"><span style="color: rgb(24, 24, 24); background-color: rgb(255, 255, 255); font-size: 16px;">需要临时去掉</span>&gt;/dev/null<span style="color: rgb(24, 24, 24); background-color: rgb(255, 255, 255); font-size: 16px;">。</span></li></ul><pre><code >#nohup $JAVA -Daddress.server.ip=$SERVER_IP -Dderby.system.home=../ -jar -Dderby.stream.error.file=logs/derby.log ../lib/edas-config-center.jar --logging.config=../conf/logback.xml &gt;/dev/null 2&gt;&1 &</code></pre><p style="text-align: start;"><span style="color: rgb(24, 24, 24); background-color: rgb(255, 255, 255); font-size: 16px;">即将如上代码改成如下：</span></p><pre><code >#nohup $JAVA -Daddress.server.ip=$SERVER_IP -Dderby.system.home=../ -jar -Dderby.stream.error.file=logs/derby.log ../lib/edas-config-center.jar --logging.config=../conf/logback.xml  2&gt;&1 &           </code></pre><ul><li style="text-align: start;"><span style="font-size: 16px;">再次执行 /startup.sh 即可在当前目录下有一个nohup.out文件，查看该文件，日志输出如下：</span></li></ul><p style="text-align: start;"><span style="color: rgb(24, 24, 24); background-color: rgb(255, 255, 255); font-size: 16px;">即可在当前目录下有一个nohup.out文件，查看该文件，日志输出如下：</span></p><pre><code >Exception in thread "main" java.lang.UnsupportedClassVersionError: com/alibaba/configcenter/ConfigCenterMain : Unsupported major.minor version 52.0</code></pre><p><br></p>`
  },
  {
    author: '叮叮叮',
    avatar: 'src/assets/icon/head/a2.png',
    date: '2023-01-02',
    view: 1128,
    like: 360,
    flag: false,
    way: 'Nacos执行startup.bat和startup.sh不能正常启动',
    detail: `<h2 style="text-align: start;">可能原因及解决方案</h2><h3 style="text-align: start;">错误信息</h3><pre><code class="language-hljs language-sql">Unable to start embedded Tomcat servlet container</code></pre><pre><code class="language-hljs language-undefined">Tomcat connector in failed state</code></pre><h3 style="text-align: start;">解决方案</h3><p style="text-align: start;">检查8080端口是否被占用，如果端口已经被其他程序占用，请先停止该占用端口的程序，再执行启动脚本。</p><ul><li style="text-align: start;">Windows系统</li><ol><li style="text-align: left;">进入cmd，执行<span style="background-color: rgba(0, 0, 0, 0.04); font-size: 14px;"><code>netstat -aon|findstr "8080"</code></span>，记录查询到数据的最后一列数字，即<span style="background-color: rgba(0, 0, 0, 0.04); font-size: 14px;"><code>PID (Process ID)</code></span>，例如。</li><li style="text-align: left;">执行<span style="background-color: rgba(0, 0, 0, 0.04); font-size: 14px;"><code>tasklist|findstr "2720"</code></span>，会显示当前PID对应的程序，例如javaw.exe。</li><li style="text-align: left;">执行<span style="background-color: rgba(0, 0, 0, 0.04); font-size: 14px;"><code>taskkill /PID 2720 /T /F</code></span>。</li><li style="text-align: left;">再次启动轻量配置中心。</li></ol><li style="text-align: start;">Linux系统</li><ol><li style="text-align: left;">执行netstat -antp|grep 8080，会显示占用8080端口的进程号及程序，例如。</li><li style="text-align: left;">执行kill -9 2720。</li><li style="text-align: left;">再次启动轻量配置中心。</li></ol></ul>`,
  },
  {
    author: '小维',
    avatar: 'src/assets/icon/head/a3.png',
    date: '2023-01-02',
    view: 1003,
    like: 18,
    flag: false,
    way: 'Nacos不能启动',
    detail: `<h2 style="text-align: start;">可能原因及解决方案</h2><h3 style="text-align: start;">错误信息</h3><pre><code class="language-hljs language-yaml">Caused by: java.net.UnknownHostException：iZ25ax7xuf5Z</code></pre><h3 style="text-align: start;">解决方案</h3><p style="text-align: start;"><span style="font-size: 16px;"><strong>iZ25ax7xuf5Z</strong></span>是当前实例名，确定<span style="font-size: 16px;"><strong>/etc/hosts</strong></span>存在本机IP及当前实例名的配置。如果没有请添加，例如：192.168.1.10 iZ25ax7xuf5Z。</p><p><br></p>`,
  },
  {
    author: 'console',
    avatar: 'src/assets/icon/head/a4.png',
    date: '2023-01-02',
    view: 872,
    like: 23,
    flag: false,
    way: 'startup.sh: command not found',
    detail: `<p style="text-align: start;">命令前加上bash 或 sh 或 ./</p><p style="text-align: start;">.代表当前目录，如果执行程序或脚本没有加入环境变量PATH，在当前目录时前面要加"./"</p>`,
  },
  {
    author: '可微可导',
    avatar: 'src/assets/icon/head/a5.png',
    date: '2023-01-02',
    view: 326,
    like: 2,
    flag: false,
    way: 'nacos启动遇到的问题及解决',
    detail: `<p style="text-align: start;"><strong>一般会遇到数据库连接不通和nacos.core.auth.plugin.nacos.token.secret.key缺失的报错.</strong></p><p style="text-align: start;"><strong>解决方法如下:</strong></p><h2 style="text-align: start; line-height: 1.5;">1 确保数据库里要有数据库 nacos_config,并有nacos那几张表.</h2><h2 style="text-align: start; line-height: 1.5;">2 conf目录下application.properties文件里改如下几个地方(类似这样改)</h2><pre><code class="language-properties">### If use MySQL as datasource:
spring.datasource.platform=mysql

### Count of DB:
db.num=1

### Connect URL of DB:
db.url.0=jdbc:mysql://127.0.0.1:3306/nacos_config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
db.user.0=root
db.password.0=root


### The default token (Base64 String):
nacos.core.auth.plugin.nacos.token.secret.key=SecretKey012345678901234567890123456789012345678901234567890123456789</code></pre><h2 style="text-align: start; line-height: 1.5;">3 bin目录下startup.cmd或startup.sh文件里mode从cluster(集群)改成standalone(单机)</h2><pre><code class="language-text">set MODE="standalone"</code></pre><h2 style="text-align: start; line-height: 1.5;">4 启动nacos应用并登陆console控制台页面</h2><p style="text-align: start;">执行startup.cmd或startup.sh文件,等应用启动成功后,去<a href="https://link.zhihu.com/?target=http%3A//127.0.0.1%3A8848/nacos/index.html" target="_blank"><span style="color: transparent; background-color: transparent;">http://</span>127.0.0.1:8848/nacos/in<span style="color: transparent; background-color: transparent;">dex.html</span></a>,用户名和密码都是nacos</p><p style="text-align: start;">成功登录后如图所示</p><p style="text-align: start;"><img src="https://pic2.zhimg.com/80/v2-013470aa7bdbda0d218dc60832ad3719_720w.webp" alt="" data-href="" style="height: auto;"></p><h2 style="text-align: start; line-height: 1.5;">备注:</h2><p style="text-align: start;">log目录下的nacos.log文件是nacos的日志文件,应用启动出现错误可以去这里看错误原因</p>`
  },
]);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}


onMounted(() => {
  // setTimeout(() => {
    // valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  // }, 1500);
  getDetail();
});

const getDetail = () => {
  
};

const handleCheck = (index) => {
  router.push({
    path:'/finish', 
    query:{ value: JSON.stringify(wayData[index]), status: 3}
  })
};

const next = () => {
  console.log(valueHtml.value);
  if(valueHtml.value === '' || valueHtml.value === null || valueHtml.value === undefined || valueHtml.value === '<p><br></p>'){
    ElNotification({
      title: '警告',
      message: '填写完毕后提交',
      type: 'warning',
    });
  }else{
    ElMessage.success("人员分析提交成功");
    way.detail = valueHtml.value;
    // 创建一个 Date 对象
    var currentDate = new Date();
    // 获取当前年份
    var year = currentDate.getFullYear();
    // 获取当前月份（注意月份从 0 开始，因此需要加 1）
    var month = currentDate.getMonth() + 1;
    // 获取当前日期
    var day = currentDate.getDate();
    way.date = year + "-" + month + "-" + day;
    router.push({
      path:'/finish', 
      query:{
        id: route.query.id,
        value: JSON.stringify(way),
      }
    });
  }
  
  // apiFun.repair.humanAnalysis(data.failureId, data.courseId, data.analysis).then((res) => {
  //   if(res.code === 200){
  //     router.push({
  //     path:'/finish', 
  //     query:{id: route.query.id}
  //   })
  //   }else{
  //     ElMessage.error("人员分析提交失败");
  //   }
  // });
}
const backToList = () => {
  router.push({
    path:'/detail', 
    query:{id: route.query.id}
  })
};
</script>
<style lang="less" scoped>
.box{
  flex-direction: column;
  box-sizing: border-box;
  position: sticky;
  top:0;
  width:100%;
  // height: 190vh;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.08);
  .box-title{
    text-align: left;
    padding-top: 22px;
    padding-left: 50px;
  }
  .title{
    font-size:18px;
    font-weight:bold;
  }
}

.middle{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
}
.bottom {
  display: flex;
  gap: 25px;
  padding: 0 180px 0 180px;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 40px;

  .left {
    display: flex;
    flex: 1;
    gap: 25px;
    flex-direction: column;
    height: 100%;
  }

  .right {
    display: flex;
    flex: 1;
    gap: 25px;
    flex-direction: column;
    height: 100%;
  }

  .card {
    margin: 20px 0 20px 0;
    display: flex;
    flex-direction: column;

    .card-header-2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 10px;
    }

    .small-div-body {
      padding: 20px;
      padding-top: 0;
      font-size: 15px;
      font-weight: 400;
      color: #666666;
      line-height: 30px;
    }

    .fault {
      max-height: 300px;
      text-align: left;
      overflow: auto;
      padding: 20px 100px 20px 100px;
    }
  }
}
.pager {
  float: right;
  margin-top: 40px;
}
.content_2{
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 70px;
  .correct{
    margin-bottom: 10px;
  }
  .step-content {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .step-title {
    font-size: 16px;
    margin-bottom: 5px;
    color: #000;
    font-weight: bold;
  }
  .step-description {
    font-size: 14px;
    color: #888;
  }
  .lef_btn{
    background-color: rgb(247,248,250);
    border: rgb(247,248,250);
    color: rgb(96, 98, 102);
  }
}
.form{
  flex: 1;
  gap: 10px;
}
.card{
  flex: 1;
  display: flex;
  padding: 0;
  .box-card{
    display: flex;
    gap: 50px;
    width: 100%;
  }
}

.info{
  // padding: 4% 14% 0 4%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .alert {
    margin-bottom: 20px;
    width: 100%;
  }
  .info-title1{
    margin-bottom: 20px;
  }
  .info-title2{
    margin-bottom: 5px;
  }
  .info-content{
    // margin-left: -30px;
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.06);
    border: 1px solid #ccc;
    width: 100%;
    .editor {
      width: 100%;
      height: 500px;
      box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.06)
    }
  }
  .form-button{
    margin-left: 420px;
  }
}
.next {
  margin-top: 20px;
  background-color: rgb(34,101,255);
  color: #fff;
}

.chat-container {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 70%;
}

.chat-header {
  padding: 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
  color: rgb(0,0,71),
}

.chat-content {
  min-height: 200px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  position: relative;
}

.fixed-bottom {
  padding: 20px 20px 5px 0;
  position: absolute; /* 添加绝对定位 */
  bottom: 20px;
  right: 20px;
}

.message-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.message-item {
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: flex-start;
}

.received-div {
  flex-direction: row;
}

.sent-div {
  flex-direction: row-reverse;
}

.received-message {
  align-self: flex-start;
  background-color: #f2f2f2;
}

.sent-message {
  align-self: flex-end;
  background-color: #e6f7ff;
}

.avatar {
  width: 32px;
  height: 32px;
  overflow: hidden;
  border-radius: 50%;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  width: 70%;
  word-break: break-word;
  padding: 8px;
  border-radius: 4px;
  margin-left: 8px;
  margin-right: 8px;
  text-align: left;
  white-space: pre-wrap;
}

.blog {
    padding: 20px 10px 20px 10px;
    display: flex;
    gap: 10px;
    cursor: pointer;
    text-align: left;
}
.blog:hover{
    background-color: whitesmoke;
}
.blog-header {
    display: flex;
    flex-direction: row;
    gap: 10px;
}
.blog-right {
    flex: 6;
}
.blog-text {
    display: flex;
    flex-direction: column;
    flex: 6;
}
.blog-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
}
.blog-content {
    font-size: 14px;
    color: #555666;
    margin-bottom: 10px;
}
.blog-bottom {
  display: flex;
  align-items: center;
}
.blog-bottom span {
  margin-right: 20px;
  font-size: 13px;
  color: #555666;
  min-width: 65px;
  word-break: break-word;
}
.blog-bottom a {
    cursor: pointer;
    font-size: 13px;
    color: #555666;
    margin-right: 10px;
}

// 美化滚动条
::-webkit-scrollbar {
  width: 3px;
  height: 10px;
}

::-webkit-scrollbar-track {
  width: 2px;
  background: rgba(#101F1C, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(144,147,153,.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color .3s;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144,147,153,.3);
}

</style>
<style src="src/assets/style/base.scss"></style>
