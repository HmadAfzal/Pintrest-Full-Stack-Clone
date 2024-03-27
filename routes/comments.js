const express = require('express')
const commentRoutes = new express.Router()
const { isAuthenticated } = require('../utils/middlewares')
const { postComments, deleteComments }=require('../controllers/comment')


commentRoutes.post("/posts/:id/comment", isAuthenticated, postComments)

commentRoutes.delete("/posts/:id/comment/:commentid", isAuthenticated, deleteComments)


module.exports = commentRoutes;