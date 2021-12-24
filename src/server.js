import express from 'express'
import cors from 'cors'
import { corsOptions } from '*/config/mongodb'
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environment'
import { apiV1 } from '*/routes/v1'

// const hostName = 'localhost'

// const port = 8080

connectDB()
  .then(() => console.log('Connected Successfully to database server'))
  .then(() => bootServer())
  .catch(error => {
    console.log(error)
    // stop app
    process.exit(1)
  })


const bootServer = () => {
  const app = express()

  app.use(cors(corsOptions))

  // Enable req.body data
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // Use APIs v1
  app.use('/v1', apiV1)

  app.listen(env.APP_PORT, env.APP_HOST, (req, res) => {
    console.log(`Hello ADSTAR, Running at ${env.APP_HOST}:${env.APP_PORT}/`)
  })
}
