var fs = require('fs')
var express = require('express')
var path = require('path')
var router = require('./router.js')
var bodyParser = require('body-parser')
var session = require('express-session')

var app = express()

//express-art-template 配置
app.engine('html', require('express-art-template'))

app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
app.use('/public/', express.static(path.join(__dirname, './public/')))

// post请求的配置 get请求方式不用配置
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//express-session 配置
//添加 session 数据 req.session.foo = 'bar'
//访问 session 数据 req.session.foo
//session 数据为内存储存，服务器重启会清除数据，所以开发时会做session持久化，储存到数据库中
app.use(session({
	secret: 'Fiona', //配置加密字符串，它在在原有的基础上和这个字符串拼接一起加密，目的增加安全性
	resave: false,
	saveUninitialized: true //无论是否使用session，都会默认给你一把钥匙
}))

app.use(router)

app.listen(3000, function () {
	console.log('服务器已启动......')
})