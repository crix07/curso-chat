'use strict'
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const bodyParser = require('body-parser')
const config = require('./config')
const path = require('path')
var io = require('socket.io').listen(server)


// routing 
app.use(express.static(path.join(__dirname, 'public')))

app.get('*', (req, res)=>{
	res.sendFile(path.join(__dirname, 'index.html'))
})

// settings middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// server port 
server.listen(config.port, (req, res)=> {
	console.log(`server listening on port ${config.port}`)
})


var conexion = []

io.sockets.on('connection', (socket)=>{
	conexion.push(socket)
	console.log(conexion.length)
	socket.on('disconnect', function(){
		conexion.splice(conexion.indexOf(socket), 1)
		console.log(conexion.length)
	})


	socket.on('mensaje', (mensaje)=>{
		io.sockets.emit('publicar mensaje', {mensaje:mensaje})
	})
})

