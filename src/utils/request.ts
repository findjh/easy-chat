import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // url = base url + request url
  //超时时间
  timeout: 5000
})

//添加请求连拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //在发送请求之前做些什么
    const token: string | null = sessionStorage.getItem('token') || null
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error: AxiosError) => {
    //对请求错误做些什么
    console.log(error, 'request-error')
    return Promise.reject(error)
  }
)

//添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    //2xx 范围内的状态码都会触发该函数。
    //对响应数据做点什么

    return response
  },
  (error: AxiosError) => {
    //超出 2xx 范围的状态码都会触发该函数
    //对响应错误做点什么
    console.log(error, 'response-error')

    const { response } = error
    // 处理 HTTP 网络错误
    let message = ''

    // HTTP 状态码
    const status = response?.status

    switch (status) {
      case 401:
        message = 'token 失效，请重新登录'
        // 这里可以触发退出的 action
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器故障'
        break
      default:
        message = '网络连接故障'
    }

    console.log(message, 'response-error-msg')
    return Promise.reject(error)
  }
)

export const http = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },
  post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  }
  //...
}

export default service
