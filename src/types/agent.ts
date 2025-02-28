import {z} from 'zod'

export const AgentMode = {
  PROFILE_ANALYSIS: 'profile_analysis',
  TOPIC_SEARCH: 'topic_search'
} as const

export type AgentMode = typeof AgentMode[keyof typeof AgentMode]

const ProfileAnalysisSchema = z.object({
  mode: z.literal(AgentMode.PROFILE_ANALYSIS),
  profilesToFind: z.string({
    description: 'Description of Twitter profiles to analyze'
  }),
  summarizer: z.string({
    description: 'Instructions for summarizing the posts'
  })
})

const TopicSearchSchema = z.object({
  mode: z.literal(AgentMode.TOPIC_SEARCH),
  query: z.string({
    description: 'Search query or topic to find tweets about'
  }),
  filters: z.object({
    fromDate: z.string({
      description: 'Start date for search (YYYY-MM-DD)',
    }).optional(),
    toDate: z.string({
      description: 'End date for search (YYYY-MM-DD)',
    }).optional(),
    limit: z.number({
      description: 'Maximum number of tweets to return'
    }).min(1).max(100).default(10)
  }).optional()
})

export const AgentInputSchema = z.discriminatedUnion('mode', [
  ProfileAnalysisSchema,
  TopicSearchSchema
])

export const AgentOutputSchema = z.string()
