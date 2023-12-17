import { MongoClient, ServerApiVersion } from 'mongodb'
import 'dotenv/config'

const MONGO_URI = process.env.MONGO_URI as string

const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function connectDB() {
  try {
    const db = client.db('nasa-mission-control')
    const launchesCollection = db.collection('launches')
    const launches = await launchesCollection.find().toArray()

    console.log('You successfully connected to MongoDB!')
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
  } finally {
    await client.close()
  }
}

export { connectDB }
