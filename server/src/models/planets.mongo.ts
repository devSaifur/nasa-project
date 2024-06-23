import mongoose from 'mongoose'
const { Schema } = mongoose

const planetsSchema = new Schema({
  kepler_name: String,
})

export const planets = mongoose.model('Planet', planetsSchema)
