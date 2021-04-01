var models = require('../../db/index.js')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var token = require('../../token')
var UUID = require('uuid')
var multiparty = require('multiparty')
var multer  = require('multer')
var fs = require('fs')

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

// 条件获取用户列表
router.get('/queryUserByPagination', (req, res) => {
  var param = req.query || req.params
  var pageNum = parseInt(param.page || 1) // 页码
  var end = pageNum * 8  // 默认页数
  var start = (pageNum - 1) * 8
  var sql = `SELECT
                t.id as ID,
                t.name as NAME,
                t.type as TYPE,
                t.description as DESCRIPTION
                    FROM project t WHERE t.is_delete = 0`
  var paramList = []


  sql += ' LIMIT ?, ?'
  paramList.push(start, end)
  //var userToken = req.headers.authorization
  //userToken = userToken.substring(userToken.indexOf(' '))
  // console.log(token.decodeToken(userToken))
  conn.query(sql, paramList,function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result.length > 0) {
      let data = {}

      data.data = result
      data.pageNum = parseInt(req.query.page || 1)
      data.pageSize = parseInt(req.query.rows || 10)
      var sql = `SELECT COUNT(*) AS total FROM project where is_delete = 0`
      conn.query(sql, function (err, result) {
        if (err) {
          console.log(err)
        }
        if (result) {
          data.total = result[0].total
          jsonWrite(res, data)
        }
      })
    } else {

    }
  })
})

// 新增用户
router.post('/userAdd', (req, res) => {
  var param = req.body
  var sqlcheck = `select t.id from project t where t.id = ?`
  conn.query(sqlcheck,[param.id], function(err,result){
    if (err){
    }
    if (result[0] != null){
    }
  })
  var sql = `INSERT INTO project (id,name,type,description,is_delete) VALUES (?,?,?,?,0)`

  conn.query(sql, [param.id,param.name,param.type,param.description], function (err, result) {
    if (err) {
      let data = {}
      data.code = 502
      data.message = '编号重复'
      jsonWrite(res, data)
    }
    if (result) {
      let data = {}
      data.code = 200
      data.message = '操作成功'
      jsonWrite(res, data)
    }
  })
})

// 删除用户
router.post('/deleteUserById', (req, res) => {
  var sql = `update project t set t.is_delete = 1 WHERE t.id = ?`
  var param = req.body
  conn.query(sql,[param.id],function (err, result) {
    if (err) {
      let errData = {
        code: 401,
        message: '删除失败'
      }
      jsonWrite(res, errData)
    }
    if (result) {
      let data = {}
      data.code = 200
      data.message = '删除成功'
      jsonWrite(res, data)
    }
  })
})

// 更新用户
router.post('/updateUser', (req, res) => {
  var sql = `UPDATE project t SET t.type = ? , t.description = ? WHERE t.id = ? and t.is_delete = 0`
  var param = req.body
  conn.query(sql, [param.type,param.description,param.id], function (err, result) {
    if (err) {
      jsonWrite(res , {
        code: 401,
        message: '更新失败'
      })
    }
    if (result) {
      jsonWrite(res , {
        code: 200,
        message: '更新成功'
      })
    }
  })
})

module.exports = router
