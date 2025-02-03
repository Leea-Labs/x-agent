import type {Axios, InternalAxiosRequestConfig} from 'axios'
import {ValueContainer} from '../../services/value-container'

class AuthRequestInterceptor {
  activate(instance: Axios, tokenStorage: ValueContainer<string>) {
    instance.interceptors.request.use(this.onFulfilled.bind(null, tokenStorage), this.onRejected)
  }

  private onFulfilled(tokenStorage: ValueContainer<string>, config: InternalAxiosRequestConfig) {
    const token = tokenStorage.get()
    if (token) {
      config.headers['ApiKey'] = `${token}`
    }

    return config
  }

  private onRejected(error: any) {
    return Promise.reject(error)
  }
}

export const authRequestInterceptor = new AuthRequestInterceptor()
