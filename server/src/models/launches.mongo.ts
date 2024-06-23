import mongoose from 'mongoose'
const { Schema } = mongoose

const launchesSchema = new Schema({
  flightNumber: Number,
  launchDate: Date,
  mission: String,
  rocket: String,
  destination: String,
  customers: [String],
  upcoming: Boolean,
  success: { type: Boolean, default: true },
})

export const launches = mongoose.model('Launch', launchesSchema)
