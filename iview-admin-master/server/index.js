// node 后端服务器
const api = require('./api')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// 跨域设置
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Expose-Headers", "*");
  next()
})

app.post('*',multipartMiddleware,function(req, res, next){
  next()
})

// 后端api路由
app.use('/api/auth', api.auth)
app.use('/api/user', api.user)
app.use('/api/student', api.student)
app.use('/api/project', api.project)
app.use('/api/research', api.research)
app.use('/api/security', api.security)
app.use('/api/news', api.news)
app.use('/api/publication', api.publication)
app.use('/api/home', api.home)
app.use('/api/writer', api.writer)

// 监听端口
app.listen(27017)
console.log('success listen at port:3000......')
