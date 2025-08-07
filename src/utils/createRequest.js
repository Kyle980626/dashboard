import axios from 'axios'

function createRequest(baseURL) {
    const instance = axios.create({
        baseURL,
        timeout: 5000
    })

    instance.interceptors.request.use(
        (config) => {
            // TODO: 在请求拦截器中添加token
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    instance.interceptors.response.use(
        (response) => {
            return response.data
        },
        (error) => {
            // TODO: 对error做出处理
        }
    )

    return instance
}

export { createRequest }