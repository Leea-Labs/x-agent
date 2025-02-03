import Axios from 'axios'
import {authRequestInterceptor} from '../interceptors/auth.request'
import {authResponseInterceptor} from '../interceptors/auth.response'
import {ValueContainer} from '../../services/value-container'

export const getHttpClient = (tokenStorage: ValueContainer) => {
  const httpClient = Axios.create({
    baseURL: 'https://api.tweetscout.io/v2/',
    timeout: 20000,
  })

  authRequestInterceptor.activate(httpClient, tokenStorage)
  authResponseInterceptor.activate(httpClient)
  return httpClient
}
