// common http server library
const express = require('express')

// change to whatever you want
const port = 3010

const app = express()

// match root route
app.get( '/', ( req, res, next )=>{
  res.end('Hello StarterKit!')
} )

// start server
app.listen( port )
console.log( 'server listening on port: ' + port )

// go to http://localhost:3010/ in a browser (change port if you changed above)
