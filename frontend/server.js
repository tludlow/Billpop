const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const express = require('express')
var http = require('http')

console.log('test: ' + fs.existsSync('/ssl/'))
console.log('key: ' + fs.existsSync('/ssl/privkey.pem'))
console.log('cert: ' + fs.existsSync('/ssl/cert.pem'))
const dev = fs.existsSync('./ssl')
console.log('dev mode: ' + dev)

const port = 3000
const app = next({ dev })
const handle = app.getRequestHandler()

const httpsOptions = dev
    ? {
          key: fs.readFileSync('./ssl/key.pem'),
          cert: fs.readFileSync('./ssl/cert.pem'),
      }
    : {
          key: fs.readFileSync('/ssl/privkey.pem'),
          cert: fs.readFileSync('/ssl/cert.pem'),
      }

app.prepare().then(() => {
    //http redirection will only work on prod
    http.createServer(function (req, res) {
        res.writeHead(301, { Location: 'https://' + req.headers['host'] + req.url })
        res.end()
    }).listen(8080)
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    }).listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on https://localhost:3000')
    })
})

// app.use(function (req, res, next) {
//     if (req.secure) {
//         // request was via https, so do no special handling
//         next()
//     } else {
//         // request was via http, so redirect to https
//         res.redirect('https://' + req.headers.host + req.url)
//     }
// })
