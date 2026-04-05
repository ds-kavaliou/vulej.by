import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { schema } from './schema'

let _client: ReturnType<typeof postgres> | null = null
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null

function getDb() {
  if (!_db) {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set')
    }
    _client = postgres(connectionString, {
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
    })
    _db = drizzle(_client, { schema })
  }
  return _db
}

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop, _receiver) {
    const realDb = getDb()
    const value = Reflect.get(realDb, prop, realDb)
    if (typeof value === 'function') {
      return value.bind(realDb)
    }
    return value
  },
})

export { schema }
