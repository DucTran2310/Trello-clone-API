import express from "express"
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environment'

const app = express()

// const hostName = 'localhost'

// const port = 8080

connectDB().catch(console.log)

app.get('/', (req, res) => {
  res.end('<h1>Hello world ADSTAR!!!</h1><hr/>')
})

app.listen(env.PORT, env.HOST, (req, res) => {
  console.log(`Hello ADSTAR, Running at ${env.HOST}:${env.PORT}`)
})
