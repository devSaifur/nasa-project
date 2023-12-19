import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { api } from './routes/api'

const app = express()

app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

app.use('/v1', api)

// const publicPath = path.join(__dirname, '..', 'public')
// app.use(express.static(publicPath))

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index.html'))
// })

export default app
