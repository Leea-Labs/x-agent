import {BuilderState} from './state'
import {invokeLLM} from './llm'

export const summarize = async (state: BuilderState): Promise<Partial<BuilderState>> => {
  state.logger(`Summarizing`)
  const query = `Based on collected Tweets By Leea Agent do the following: ${state.summarizer}`
  const relevantDocs = await state.store.similaritySearch(query, 3)
  const context = relevantDocs.map((doc) => doc.pageContent).join('\n')

  return {
    result: (await invokeLLM(`${context}\n\n${query}`)).content,
  }
}
