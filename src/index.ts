import './config'
process.on('uncaughtException', (err) => {
  console.error(new Date().toString(), ': uncaughtException', err)
})

process.on('unhandledRejection', (rejection) => {
  console.error(new Date().toString(), ': unhandledRejection', rejection)
})

import {runWorkflow} from './workflow'
import {ExecutionContext, LeeaAgent} from '@leealabs/agent-js-sdk'
import {z} from 'zod'
import {InputData} from './types/schema'
import {appConfig} from './config'

const main = async () => {
  const agent = new LeeaAgent()
  await agent.initialize({
    name: 'twitter',
    fee: 10000,
    description: `I can analyze X. Give me a description of profiles to find and what do you want as a result. For example: 
    {
      "profilesToFind": "Top 100 AI influencers",
      "summarizer": "Define what is trending and predict future. Create post for X"
    }`,
    inputSchema: z.object({
      id: z.string().optional(),
      profilesToFind: z.string(),
      summarizer: z.string(),
    }),
    outputSchema: z.string(),
    secretPath: './id.json',
    apiToken: appConfig.LEEA_API_TOKEN,
    requestHandler: (context: ExecutionContext, data: InputData) =>
      runWorkflow((message) => agent.log(message, context.requestId), data),
    displayName: 'Twitter searcher',
  })
}

main()

// runBuilder(console.log, {
//   profilesToFind: 'Top 100 AI influencers',
//   summarizer: 'Define what is trending and predict future. Create post for X',
//   id: 'ai_influence',
// }).then(console.log)
