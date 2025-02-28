import { SearchTweetsOptions } from '../api/search-tweets';
import { api } from '../api';

export const searchTweets = async (
  query: string,
  options?: SearchTweetsOptions
) => {
  const response = await api.searchTweets({
    payload: {
      query,
      from_date: options?.fromDate,
      to_date: options?.toDate,
      limit: options?.limit
    }
  });
  
  return response.tweets;
};
