// API 统一配置和导出
import axios from 'axios'

// API 基础配置
const API_BASE_URL = 'https://nbzltgwuyqyb.sealoshzh.site'

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 在这里可以添加认证 token
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    
    console.log('API Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data)
    
    // 检查响应格式
    if (response.data && typeof response.data === 'object') {
      // 如果有统一的响应格式，在这里处理
      if (response.data.code !== undefined) {
        if (response.data.code === 200) {
          return response.data
        } else {
          throw new Error(response.data.message || '请求失败')
        }
      }
    }
    
    return response.data
  },
  (error) => {
    console.error('API Error:', error)
    
    // 处理不同类型的错误
    if (error.response) {
      // 服务器响应了错误状态码
      const { status, data } = error.response
      switch (status) {
        case 400:
          throw new Error(data?.message || '请求参数错误')
        case 401:
          throw new Error('未授权，请登录')
        case 403:
          throw new Error('权限不足')
        case 404:
          throw new Error('请求的资源不存在')
        case 500:
          throw new Error('服务器内部错误')
        default:
          throw new Error(data?.message || `请求失败 (${status})`)
      }
    } else if (error.request) {
      // 请求发出但没有收到响应
      throw new Error('网络连接失败，请检查网络')
    } else {
      // 其他错误
      throw new Error(error.message || '请求失败')
    }
  }
)

export { apiClient }
export default apiClient 