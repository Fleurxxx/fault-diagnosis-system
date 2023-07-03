/*
 * @Author: Fleurxxx 984209872@qq.com
 * @Date: 2023-06-12 22:59:09
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2023-06-12 22:59:55
 * @FilePath: \maintenance\src\utils\debounce.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    const later = function() {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp;

      // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };
}
