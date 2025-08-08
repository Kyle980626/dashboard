import axios from 'axios'

// 模拟token
const TOKEN = 'YOUR TOKEN'

function createRequest(baseURL) {
    const instance = axios.create({
        baseURL,
        timeout: 5000
    })

    instance.interceptors.request.use(
        // 请求头中添加token
        (config) => {
            config.headers.Authorization = `Bearer ${TOKEN}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    instance.interceptors.response.use(
        // 解析返回的数据
        (response) => {
            return response.data
        },
        (error) => {
            // 错误处理逻辑
        }
    )

    return instance
}

export { createRequest }