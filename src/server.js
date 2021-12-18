import express from 'express'
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environment'
import { BoardModel } from '*/models/board.model'

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

  app.get('/test', async (req, res) => {
    res.end('<h1>Hello world ADSTAR!!!</h1><hr/>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, (req, res) => {
    console.log(`Hello ADSTAR, Running at ${env.APP_HOST}:${env.APP_PORT}/`)
  })
}
