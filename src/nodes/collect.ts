import {Document} from '@langchain/core/documents'
import {BuilderState} from './state'
import {chunkArray} from '../services/chunk'
import {api} from '../api'

export const collect = async (state: BuilderState) => {
  const chunks = chunkArray(state.usernames, 5)
  for (const chunk of chunks) {
    state.logger(`Collecting tweets for: ${chunk.join(', ')}`)
    let tweetsCollectedQty = 0
    const chunkPromises = chunk.map(async (user) => {
      try {
        const result = await api.userTweets({
          payload: {
            link: `https://x.com/${user}`,
          },
        })

        if (!result?.tweets) {
          return
        }

        tweetsCollectedQty += result.tweets.length

        const docs = result.tweets.map(
          (tweet) =>
            new Document({
              pageContent: `Collected Tweet By Leea Agent: ${JSON.stringify(tweet)}`,
            })
        )
        state.store.addDocuments(docs)
      } catch (error) {
        console.log(error?.message)
      }
    })
    state.logger(`Collected and saved ${tweetsCollectedQty} tweets`)
    await Promise.all(chunkPromises)
  }
}
