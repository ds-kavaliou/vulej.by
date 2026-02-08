import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { schema } from './schema'

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

const client = postgres(DATABASE_URL, {
  max: 1,
})

export const db = drizzle({ client, schema })
