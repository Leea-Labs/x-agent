import {Chroma} from '@langchain/community/vectorstores/chroma'
import {Annotation} from '@langchain/langgraph'

export const StateAnnotation = Annotation.Root({
  usernames: Annotation<string[]>(),
  profilesToFind: Annotation<string>(),
  summarizer: Annotation<string>(),
  store: Annotation<Chroma>(),
  result: Annotation<string>(),
  logger: Annotation<(message: string) => void>(),
})

export type BuilderState = typeof StateAnnotation.State
