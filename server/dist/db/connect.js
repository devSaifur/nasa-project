"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongodb_1 = require("mongodb");
require("dotenv/config");
const MONGO_URI = process.env.MONGO_URI;
const client = new mongodb_1.MongoClient(MONGO_URI, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
async function connectDB() {
    try {
        const db = client.db('nasa-mission-control');
        const launchesCollection = db.collection('launches');
        const launches = await launchesCollection.find().toArray();
        console.log('You successfully connected to MongoDB!');
    }
    catch (error) {
        if (error instanceof Error)
            console.log(error.message);
    }
    finally {
        await client.close();
    }
}
exports.connectDB = connectDB;
