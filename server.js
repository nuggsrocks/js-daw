const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config')
const compiler = webpack(webpackConfig)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const NODE_ENV = process.env.NODE_ENV

if (typeof NODE_ENV === 'undefined' || NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  }))
} else {
  app.use(express.static(path.resolve(__dirname, '/public')))


  app.get('/', (req, res) => {
    res.send('Hello world!')
  })

  app.use((req, res) => {
    res.send('404 Not Found')
  })
}


const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'localhost'

app.listen(PORT, HOST, () => console.log(`listening on http://${HOST}:${PORT}`))
