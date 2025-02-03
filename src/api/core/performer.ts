import {AxiosInstance} from 'axios'
import {HttpMethod} from '../types'

export type XRequestConfig<Payload extends Object = any> = {
  payload?: Payload
  urlParams?: Record<string, string | number>
}

export abstract class Performer<T extends XRequestConfig | void, Response = void> {
  constructor(private readonly httpClient: AxiosInstance) {}

  protected abstract method: HttpMethod
  protected abstract url: string
  protected requestTransformer?: (p?: any) => any = (x) => x
  protected responseTransformer?: (p?: any) => any = (x) => x

  protected call = async (payload?: any, url = this.url) => {
    const config = {
      url,
      method: this.method,
      params: undefined,
      data: undefined,
    }
    if (this.method === HttpMethod.GET) {
      config.params = payload
    } else {
      config.data = payload
    }

    const response = await this.httpClient.request<Response>(config)
    return response?.data
  }

  private setUrlParams(urlParams?: Record<string, string | number>) {
    if (!urlParams) {
      return this.url
    }

    return Object.entries(urlParams).reduce((acc, [key, value]) => acc.replace(`{${key}}`, `${value}`), this.url)
  }

  private buildUrl(urlParams?: Record<string, string | number>) {
    const filledUrl = this.setUrlParams(urlParams)
    return this.cleanOptionalUrlParams(filledUrl)
  }

  private cleanOptionalUrlParams(url: string) {
    return url.replace(/\{.+\}/, '')
  }

  perform = async (config: T): Promise<Response> => {
    const url = this.buildUrl(config?.urlParams)
    return this.responseTransformer!(await this.call(this.requestTransformer!(config?.payload), url))
  }
}
