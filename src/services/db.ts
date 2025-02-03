import {OpenAIEmbeddings} from '@langchain/openai'
import {Chroma} from '@langchain/community/vectorstores/chroma'
import {v4 as uuid} from 'uuid'
import {appConfig} from '../config'

export const getDB = (id?: string) => {
  return new Chroma(new OpenAIEmbeddings(), {
    collectionName: id || uuid(),
    url: appConfig.CHROMA_URL,
  })
}
