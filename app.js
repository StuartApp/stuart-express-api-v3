const express = require('express')
const { AppService } = require('./AppService')

const app = express()
const { PORT = 3000 } = process.env

app.use(express.json());

const appService = new AppService()

app.get('/v3/health', (req, res) => {
  res.json({})
})

app.post('/v3/orders/http-delay', async (req, res) => {
  const order = req.body
  const job = appService.orderToJob(order);
  const jobResponse = await appService.createJobDelay(job);
  res.json(appService.jobToOrder(jobResponse))
})

app.post('/v3/orders/http-random-delay', async (req, res) => {
  const order = req.body
  const job = appService.orderToJob(order);
  const jobResponse = await appService.createJobRandomDelay(job);
  res.json(appService.jobToOrder(jobResponse))
})

app.post('/v3/orders', async (req, res) => {
  const order = req.body
  const job = appService.orderToJob(order);
  const jobResponse = await appService.createJob(job);
  res.json(appService.jobToOrder(jobResponse))
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
