/**
 * 添加拦截器:
 *   拦截 request 请求
 *   拦截 uploadFile 文件上传
 *
 * TODO:
 *   1. 非 http 开头需拼接地址
 *   2. 请求超时
 *   3. 添加小程序端请求头标识
 *   4. 添加 token 请求头标识
 */

import { useMemberStore } from '@/stores'

const baseUrl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

const httpInterceptors = {
  // 请求拦截
  invoke(options: UniApp.RequestOptions) {
    // 1. 非 http 开头需拼接地址
    if (!options.url?.startsWith('http')) {
      options.url = `${baseUrl}${options.url}`
    }
    // 2.请求超时， 默认60s
    options.timeout = 10000

    // 3. 添加小程序端请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }

    // 4. 添加 token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }

    console.log(options)
  },
}

uni.addInterceptor('request', httpInterceptors)
uni.addInterceptor('uploadFile', httpInterceptors)

interface Data<T> {
  code: string
  msg: string
  result: T
}
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        // 提取核心数据
        resolve(res.data as Data<T>)
      },
    })
  })
}
