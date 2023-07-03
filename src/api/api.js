import http from './axios.js'

let apiFun = {
  //自定义对象，命名隔离，消除重名影响
  user:{},
  train:{},
  verify:{},
  repair:{},
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


// //删除一个授权策略
// apiFun.bucket.authorize.delete =(bucketName,authorizeId) =>{
//   return http.delete('/authorize/deleteAuthorize?bucketName='+bucketName+'&authorizeId='+authorizeId)
// }


// //删除文件
// apiFun.object.deleteObject = (objectIdList) => {
//   return http.delete('/manageObject/deleteObject',objectIdList)
// }

export default apiFun;
