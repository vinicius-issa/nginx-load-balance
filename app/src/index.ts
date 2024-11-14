import express, { json, urlencoded, Response, Request } from "express"

const PORT = process.env.PORT || 3000
const POD_NUMBER = process.env.POD_NUMBER
const app = express()

let total = 0

app.get("/", (_req: Request, res: Response) => {
  console.log(`Pod #${POD_NUMBER} total of ${total} requests`)
  total++
  res.send("Hello World")
})

app.get("/health", (_req: Request, res: Response) => {
  res.send()
})

app.use(json())
app.use(urlencoded({ extended: true }))

app.listen(PORT, () => {
  console.log(`Application #${POD_NUMBER} running on port ${PORT}`)
})
