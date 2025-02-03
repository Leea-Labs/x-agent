import {BaseLanguageModelInput} from '@langchain/core/language_models/base'
import {ChatOpenAI} from '@langchain/openai'

const model = new ChatOpenAI({model: 'gpt-4o'})

export const invokeLLM = async (input: BaseLanguageModelInput, structure?: Zod.ZodType) => {
  if (structure) {
    return await model.withStructuredOutput(structure).invoke(input)
  }
  return await model.invoke(input)
}
