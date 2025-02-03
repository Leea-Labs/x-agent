import {Document} from '@langchain/core/documents'
import {BuilderState} from './state'
import {chunkArray} from '../services/chunk'
import {api} from '../api'

export const collect = async (state: BuilderState) => {
  const chunks = chunkArray(state.usernames, 5)
  for (const chunk of chunks) {
    const chunkPromises = chunk.map(async (user) => {
      state.logger(`Collecting tweets for ${user}`)
      try {
        const result = await api.userTweets({
          payload: {
            link: `https://x.com/${user}`,
          },
        })

        if (!result?.tweets) {
          return
        }

        state.logger(`Got ${result.tweets.length} tweets. Saving`)
        const docs = result.tweets.map(
          (tweet) =>
            new Document({
              pageContent: `Collected Tweet By Leea Agent: ${JSON.stringify(tweet)}`,
            })
        )
        state.store.addDocuments(docs)
      } catch (error) {
        state.logger(`Got no tweets`)
        console.log(error?.message)
      }
    })

    await Promise.all(chunkPromises)
  }
}
