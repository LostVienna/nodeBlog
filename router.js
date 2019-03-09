var express = require('express')
var user = require('./user.js')
var md5 = require('blueimp-md5')
var router = express.Router()

router.get('/', function(req,res) {
	// console.log(req.session.user)
	res.render('index.html', {
		user: req.session.user //存储用户
	})
})

router.post('/login', function(req,res) {
	var body = req.body

	body.password = md5(body.password)

	user.findOne({
		userName: body.userName,
		password: body.password
	}, function (err,user) {
		if (err) {
			return res.status(500).json({
				err_code: 500,
				message: 'Server Error'
			})
		}
		if (!user) {
			return res.status(200).json({
				err_code: 0,
				message: 'userName or email is invalid'
			})
		}
		req.session.user = user
		return res.status(200).json({
			err_code: 1,
			message: 'OK'
		})
	})
})

router.post('/register', function(req,res) {
	var body = req.body
	body.password = md5(body.password)

	user.findOne({
		$or: [
			{
				userName: body.userName
			},
			{
				email: body.email
			}		
		]
	}, function (err,data) {
		if (err) {
			return res.status(500).json({
				err_code: 500,
				message: 'Server Error'
			})
		}
		if (data) {
			return res.status(200).json({
				err_code: 0,
				message: 'userName or email aleady exists'
			})
		}
		new user(body).save(function (err,user) {
			if (err) {
				return res.status(500).json({
					err_code: 500,
					message: 'Server Error'
				})
			}
			//成功注册后用 session 储存用户数据 然后渲染页面--第六行代码
			req.session.user = user
			res.status(200).json({
				err_code: 1,
				message: 'OK'
			})
		})
	})

})

router.get('/logout', function (req,res) {
	//将 session 设置为空 退出
	//req.session.user = null
	delete req.session.user //严谨方式 退出
	res.redirect('/')
})

module.exports = router