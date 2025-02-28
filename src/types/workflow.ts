import { AgentMode } from './agent'

export type WorkflowInputData = {
  id: string
  mode: AgentMode
  profilesToFind?: string
  summarizer?: string
  query?: string
  filters?: {
    fromDate?: string
    toDate?: string
    limit?: number
  }
}
