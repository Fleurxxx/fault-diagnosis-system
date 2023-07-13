/*
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-01 20:28:39
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-07-05 22:54:47
 * @FilePath: \maintenance\src\api\api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from './axios.js'

let apiFun = {
  //自定义对象，命名隔离，消除重名影响
  user:{},
  model:{}, //模型
  train:{}, //训练
  diagnose:{}, //诊断
  repair:{}, //维修
  test:{},
};

/**
 * 测试接口（按需添加，可删）
 * */

//前后端链接测试
apiFun.test.test = () =>{
  return http.get('/test/demo')
}

//测试文件预览
apiFun.test.fileView =() =>{
  return http.get('test/downLoad')
}

//测试文件MD5
apiFun.test.getMd5 =() =>{
  return http.get('test/getMd5')
}

//获取数据大屏初始化数据接口
apiFun.getScreenData = () => {
  return http.get('/allBucketMessage/getMessage')
}

/**
 * 用户接口
 * */

//登录
apiFun.user.login = params => {
  return http.post('/user/login',params)
}

//注册
apiFun.user.enroll = params => {
  return http.post('/user/register',params)
}

/**
 * 模型接口
 * */
//获取模型列表
apiFun.model.getModels = (params) =>{
  return http.get('/model/getModels?key='+params.key+'&current='+params.current+'&size='+params.size)
}

//获取模型详情
apiFun.model.getModel = (id) =>{
  return http.get('/model/getModel?id='+id)
}

//获取模型所有版本
apiFun.model.getVersions = (id) =>{
  return http.get('/model/getVersions?modelId='+id)
}

//修改模型信息
apiFun.model.submitInfo = (params) =>{
  return http.get('/model/upload',params)
}

//上传模型
apiFun.train.submitForm = (params) =>{
  return http.post('/model/addModel',params)
}

//下载文件
apiFun.train.download = (fileUrl,fileName) =>{
  return http.get('/file/download?fileUrl='+fileUrl+'&fileName='+fileName)
}

//上传模型
apiFun.train.submitForm = (params) =>{
  return http.post('/model/addModel',params)
}

// //删除一个授权策略
// apiFun.bucket.authorize.delete =(bucketName,authorizeId) =>{
//   return http.delete('/authorize/deleteAuthorize?bucketName='+bucketName+'&authorizeId='+authorizeId)
// }


// //删除文件
// apiFun.object.deleteObject = (objectIdList) => {
//   return http.delete('/manageObject/deleteObject',objectIdList)
// }

//获取所有故障记录
apiFun.repair.getRepairRecord = (key, current, size) => {
  return http.get('/failure/getFailures?key=' + key + '&current=' + current + '&size=' + size);
}

//获取单个故障记录的详情
apiFun.repair.getRecordDetail = (recordId) => {
  return http.get('/failure/getFailure?id=' + recordId);
}

//修改单个故障详情
apiFun.repair.changeMaintain = (params) => {
  return http.put('/failure/set', params);
}

//获取单个故障所有维修记录
apiFun.repair.getMaintains = (failureId) => {
  return http.get('/failure/getCourses?failureId=' + failureId);
}

//获取单个故障的单个维修的维修记录详情
apiFun.repair.getMaintainDetail = (failureId, courseId) => {
  return http.get('/failure/getCourse?failureId=' + failureId + '&courseId=' + courseId);
}

//重新上传分析
apiFun.repair.reanalysis = (params) => {
  return http.post('/failure/continuing', params);
}

//人员分析 填写故障的解决方案
apiFun.repair.humanAnalysis = (failureId, courseId, analysis) => {
  return http.put('/failure?failureId='+ failureId + '&courseId=' + courseId + '&analysis=' + analysis);
}

//上传故障集文件
apiFun.repair.upload = (file) => {
  return http.post('/file/upload', file);
}


export default apiFun;
