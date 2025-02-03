// import {authService} from '@/services/auth.service'
import type {Axios, AxiosError, AxiosResponse} from 'axios'
// import axios from 'axios'

class AuthResponseInterceptor {
  activate(instance: Axios) {
    instance.interceptors.response.use(this.onFulfilled, this.onRejected)
  }

  private onFulfilled = async (config: AxiosResponse) => {
    return config
  }

  private onRejected = async (error: AxiosError) => {
    console.log('HTTP Error:', error.response?.status, error.response?.data, error.config?.data)
    if (error.response?.status === 404) {
      return Promise.resolve(error)
    }
    return Promise.reject(error)
  }
}

export const authResponseInterceptor = new AuthResponseInterceptor()
