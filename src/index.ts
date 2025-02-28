import './config'
process.on('uncaughtException', (err) => {
  console.error(new Date().toString(), ': uncaughtException', err)
})

process.on('unhandledRejection', (rejection) => {
  console.error(new Date().toString(), ': unhandledRejection', rejection)
})

import {runWorkflow} from './workflow'
import {LeeaAgent} from '@leealabs/agent-js-sdk'
import {AgentInputSchema, AgentOutputSchema} from './types'
import {appConfig} from './config'

const main = async () => {
  const agent = new LeeaAgent()
  await agent.initialize({
    name: 'twitter',
    fee: 10000,
    description: `I can analyze X (Twitter) in two modes:
    1. Profile Analysis - find and analyze specific Twitter profiles
    2. Topic Search - search for tweets about specific topics
    
    Example for Profile Analysis:
    {
      "mode": "profile_analysis",
      "profilesToFind": "Top 100 AI influencers",
      "summarizer": "Define what is trending and predict future. Create post for X"
    }
    
    Example for Topic Search:
    {
      "mode": "topic_search",
      "query": "artificial intelligence",
      "filters": {
        "fromDate": "2024-01-01",
        "limit": 50
      }
    }`,
    inputSchema: AgentInputSchema,
    outputSchema: AgentOutputSchema,
    secretPath: './id.json',
    apiToken: appConfig.LEEA_API_TOKEN,
    requestHandler: runWorkflow,
    displayName: 'Twitter searcher',
    avatarPath: './logo.png',
  })
}

main()

// runBuilder(console.log, {
//   profilesToFind: 'Top 100 AI influencers',
//   summarizer: 'Define what is trending and predict future. Create post for X',
//   id: 'ai_influence',
// }).then(console.log)
