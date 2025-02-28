import {StateGraph, MemorySaver} from '@langchain/langgraph'
import {StateAnnotation} from './nodes/state'
import {getProfiles} from './nodes/get-profiles'
import {summarize} from './nodes/summarize'
import {collect} from './nodes/collect'
import {getDB} from './services/db'
import {RequestHandler} from '@leealabs/agent-js-sdk'
import {AgentMode, WorkflowInputData} from './types'
import {searchTweets} from './nodes/search-tweets'

const workflow = new StateGraph(StateAnnotation)
  .addNode('getProfiles', getProfiles)
  .addEdge('__start__', 'getProfiles')
  .addNode('collect', collect)
  .addEdge('getProfiles', 'collect')
  .addNode('summarize', summarize)
  .addEdge('collect', 'summarize')

const checkpointer = new MemorySaver()
const threadConfig = {configurable: {thread_id: '42'}}

const app = workflow.compile({checkpointer})

export const runWorkflow: RequestHandler = async (data: WorkflowInputData, ctx) => {
  if (data.mode === AgentMode.PROFILE_ANALYSIS) {
    const response = await app.invoke(
      {
        profilesToFind: data.profilesToFind,
        summarizer: data.summarizer,
        logger: ctx.log,
        store: getDB(data.id),
      },
      {
        configurable: {
          thread_id: data.id
        }
      }
    )

    return response.result
  }
  
  if (data.mode === AgentMode.TOPIC_SEARCH) {
    // TODO: Refactor into separate workflow graph for topic search.
    if (!data.query?.trim()) {
      throw new Error('Query parameter cannot be empty')
    }
    const tweets = await searchTweets(data.query, data.filters)
    // TODO: ask why sdk has a string return type. Do I need to summarize the response?
    return JSON.stringify(tweets)
  }
  
  throw new Error(`Unsupported mode: ${data.mode}`)
}
