import {HttpMethod} from './types'
import {Performer} from './core/performer'
import {TweetsList} from '../types/tweetscout'

export class UserTweets extends Performer<
  {
    payload: {
      link: string
      cursor?: string
    }
  },
  TweetsList
> {
  protected method = HttpMethod.POST
  protected url = '/user-tweets'
}
