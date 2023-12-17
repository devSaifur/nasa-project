import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { planetsRouter } from './routes/planets/planets.router'
import { launchesRouter } from './routes/launches/launches.router'

const app = express()

app.use(cors())
app.use(morgan('combined'))

app.use(express.json())

// const publicPath = path.join(__dirname, '..', 'public')
// app.use(express.static(publicPath))

app.use('/planets', planetsRouter)
app.use('/launches', launchesRouter)

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index.html'))
// })

export default app
