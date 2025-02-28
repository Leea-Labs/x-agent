import {appConfig} from '../config'
import {ValueContainer} from '../services/value-container'
import {getHttpClient} from './core/http-client'
import {UserTweets} from './user-tweets'
import {SearchTweets} from './search-tweets'

export const getApi = (tokenStorage: ValueContainer) => {
  const httpClient = getHttpClient(tokenStorage)
  return {
    userTweets: new UserTweets(httpClient).perform,
    searchTweets: new SearchTweets(httpClient).perform,
  }
}

const apiStorage = new ValueContainer(appConfig.TWITTERSCOUT_API_KEY)
export const api = getApi(apiStorage)
