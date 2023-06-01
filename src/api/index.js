/*
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-03-24 15:06:44
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-03-24 15:06:49
 * @FilePath: \oss-backstage\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function localGet (key) {
    const value = window.localStorage.getItem(key)
    try {
      return JSON.parse(window.localStorage.getItem(key))
    } catch (error) {
      return value
    }
  }
  
  export function localSet (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  
  export function localRemove (key) {
    window.localStorage.removeItem(key)
  }
  
  // 单张图片上传
  export const uploadImgServer = "http://localhost:8080/users/uploadImg"
  
  //多张图片上传
  export const uploadImgsServer = "http://localhost:8080/users/uploadImgs"
  
  