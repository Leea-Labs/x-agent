import {z} from 'zod'
import {invokeLLM} from './llm'
import {BuilderState} from './state'

export const getProfiles = async (state: BuilderState): Promise<Partial<BuilderState>> => {
  state.logger('Finding X usernames')
  const response = await invokeLLM(
    `
    Return a list of real X (ex Twitter) usernames. It should be a screen_name only, no spaces and full names. Just an identifier which starts with @ and could be find in link like https://x.com/username. Do not return link or anything except @username

    ${state.profilesToFind}
    `,
    z.object({
      profiles: z.array(
        z.string({description: `Twitter screen_name with no spaces, braces etc. e.g: '@elonmusk' or '@finkd'`})
      ),
    })
  )

  state.logger(`Found: ${response.profiles.toString()}`)
  return {
    usernames: response.profiles,
  }
}
