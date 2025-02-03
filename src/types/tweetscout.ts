export type Tweet = {
  conversation_id_str: string
  created_at: string
  entities: [
    {
      link: string
      preview: string
      type: string
    }
  ]
  favorite_count: number
  full_text: string
  id_str: string
  in_reply_to_status_id_str: string
  is_quote_status: true
  quote_count: number
  quoted_status: {
    created_at: string
    favorite_count: number
    full_text: string
    id_str: string
    quote_count: number
    retweet_count: number
    user: {
      avatar: string
      can_dm: true
      created_at: string
      description: string
      followers_count: number
      friends_count: number
      id_str: string
      name: string
      screen_name: string
      statuses_count: number
    }
  }
  reply_count: number
  retweet_count: number
  retweeted_status: {
    created_at: string
    favorite_count: number
    full_text: string
    id_str: string
    quote_count: number
    retweet_count: number
    user: {
      avatar: string
      can_dm: true
      created_at: string
      description: string
      followers_count: number
      friends_count: number
      id_str: string
      name: string
      screen_name: string
      statuses_count: number
    }
  }
  user: {
    avatar: string
    can_dm: true
    created_at: string
    description: string
    followers_count: number
    friends_count: number
    id_str: string
    name: string
    screen_name: string
    statuses_count: number
  }
  view_count: number
}

export type TweetsList = {
  next_cursor: string
  tweets?: Tweet[]
}
