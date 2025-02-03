import {StateGraph, MemorySaver} from '@langchain/langgraph'
import {StateAnnotation} from './nodes/state'
import {getProfiles} from './nodes/get-profiles'
import {summarize} from './nodes/summarize'
import {collect} from './nodes/collect'
import {InputData} from './types/schema'
import {getDB} from './services/db'

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

export const runWorkflow = async (logger: (message: string) => void, data: InputData) => {
  const response = await app.invoke(
    {
      profilesToFind: data.profilesToFind,
      summarizer: data.summarizer,
      logger,
      store: getDB(data.id),
    },
    threadConfig
  )

  return response.result
}
