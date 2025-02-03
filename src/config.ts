import path from 'path'

type Config = {
  [K in (typeof AppConfig.fields)[number]]: string
}

class AppConfig {
  static readonly fields = [
    'OPENAI_API_KEY',
    'LEEA_API_TOKEN',
    'TWITTERSCOUT_API_KEY',
    'CHROMA_URL',
    'NODE_ENV',
  ] as const

  private readonly requiredFiedls: Partial<typeof AppConfig.fields> = [
    'OPENAI_API_KEY',
    'LEEA_API_TOKEN',
    'TWITTERSCOUT_API_KEY',
    'CHROMA_URL',
  ]
  private readonly envPath = path.resolve(__dirname, '../.env')

  private container: Config

  constructor() {
    this.init()
    this.validate()
  }

  private init(): void {
    require('dotenv').config({path: this.envPath})
    this.container = AppConfig.fields.reduce((acc, field) => {
      acc[field] = process.env[field]!
      return acc
    }, {} as Config)
  }

  private validate(): void {
    for (const field of this.requiredFiedls) {
      if (!this.container[field!]) {
        throw new Error(`${field} must be set as env variable`)
      }
    }
  }

  get value(): Config {
    return this.container
  }
}

const configInstance = new AppConfig()

export const appConfig = configInstance.value
