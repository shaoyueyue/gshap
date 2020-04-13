/*
ajax请求函数模块
返回值：promise对象（异步返回的数据是：response.data）
 */
import axios from 'axios'
export  default function ajax (url,data={},type='GET') {

  return new Promise(function (resolve, reject) {
    //执行异步ajax请求
    let promise
    if (type === 'GET') {
// 准备 url query 参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
// 发送 get 请求
      promise = axios.get(url)
    } else {
// 发送 post 请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      //成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      //失败了调用reject()
      reject(error)
    })
  })
}

/*
* 为什么要这么再套一层promise，目的是，这个事情得回想一下我们前面以前怎么用这个ajax函数。
*（假设用了async和await）
* 以前得到结果
* const response = await ajax()
* const result = response.data
*
* 现在，调用这个异步函数直接得到结果数据
* const result = await ajax()
*
*
* axios给我们的promise给我们的是response，所以我们要再包一层
* */
