import express from "express";
import { mapOrder } from "./utilities/sort.js"

const app = express();

const hostName = 'localhost';

const port = 8080;

app.get('/', (req, res) => {
  res.end('<h1>Hello world!!!</h1><hr/>')
})

app.listen(port, hostName, (req, res) => {
  console.log(`Hello ADSTAR, Running at ${hostName}:${port}`)
})