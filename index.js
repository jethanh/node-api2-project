const express = require('express')
const postRouter = require('./routers/postRouter.js');

const server = express()
server.use(express.json())

server.use('/api/posts', postRouter)
server.listen(4000, () => console.log('API up on port 4000'))