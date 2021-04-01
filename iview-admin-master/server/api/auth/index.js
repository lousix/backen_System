var models = require('../../db/index.js')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var token = require('../../token')

// 连接数据库
var conn = mysql.createConnection(models.mysql)
conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}
// 用户登录
router.post('/login', (req, res) => {
    if(req.body.username !== "ics2" || req.body.password !== "ics2"){
      let data = {}
      data.code = 501
      data.message = '账号或密码错误'
      jsonWrite(res, data)
    }else{
      let data = {}
      data.token = token.createToken()
      data.code = 200
      data.message = '登录成功'
      data.data = req.body.username
      jsonWrite(res, data)
    }

})
module.exports = router
