/* eslint-disable prefer-promise-reject-errors */
import type { AxiosResponse } from 'axios'
import axios from 'axios'

const instance = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  baseURL: 'http://127.0.0.1:8011/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  // timeout: 5000,
})
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          console.log('401')
          sessionStorage.removeItem('xtoken')
          break
        case 403:
          console.log('403')
          break
        case 404:
          console.log('404')
          break
        case 500:
          console.log('500')
      }
    }
    return await Promise.reject()
  },
)

export default instance
