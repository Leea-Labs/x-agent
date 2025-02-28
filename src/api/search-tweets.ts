import {HttpMethod} from './types'
import {Performer} from './core/performer'

export interface SearchTweetsOptions {
  fromDate?: string
  toDate?: string
  limit?: number
}

export class SearchTweets extends Performer<
  {
    payload: {
      query: string
      from_date?: string
      to_date?: string
      limit?: number
    }
  },
  { tweets: any[] }
> {
  protected method = HttpMethod.POST
  protected url = '/search-tweets'
} 
