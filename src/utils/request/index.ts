/**
 *  初始化网络请求配置选项（如：url前缀、headers配置）
 *  网络拦截器（请求与响应）
 */
import { message } from 'antd'

import DPRequest from './DPRequest'

const request = new DPRequest({
  baseURL: '/weather',
  /** 请求拦截器 */
  requestIntercept(config) {
    return config
  },
  /** 响应拦截器 */
  responseIntercept(response) {
    const code = Number(response?.data?.code)
    switch (code) {
      case 200:
        return response.data
      default:
        const msg = response.data?.message
        if (msg) {
          message.destroy()
          message.error(msg)
        }
        return response.data || {}
    }
  },
  /** 响应异常拦截器 */
  errorIntercept(error: Error) {
    if (error) {
      message.destroy()
      message.error(onErrorReason(error.message))
    }
    return {}
  },
})

/** 解析http层面请求异常原因 */
function onErrorReason(message: string): string {
  if (message.includes('timeout')) {
    return '请求超时，请重试!'
  }
  switch (message) {
    case 'Request failed with status code 401':
    case 'Forbidden':
      return '登录过期，请重新登录!'
    case 'Network Error':
      return '网络异常，请检查网络情况!'
    default:
      return message || '服务异常,请重试!'
  }
}

export default request
