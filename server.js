const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.resolve(__dirname, '/public')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use((req, res) => {
  res.send('404 Not Found')
})

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'localhost'

app.listen(PORT, HOST, () => console.log(`listening on http://${HOST}:${PORT}`))
