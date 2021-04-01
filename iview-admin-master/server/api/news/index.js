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
                t.date as DATE,
                t.title as TITLE,
                t.description as DESCRIPTION
                    FROM news t WHERE t.is_delete = 0 order by t.date desc `
  var paramList = []


  sql += ' LIMIT ?, ?'
  paramList.push(start, end)
  //var userToken = req.headers.authorization
  //userToken = userToken.substring(userToken.indexOf(' '))
  // console.log(token.decodeToken(userToken))
  conn.query(sql, paramList,function (err, result) {
    if (err) {
      //console.log(err)
    }
    if (result.length > 0) {
      let data = {}
      data.data = result
      data.pageNum = parseInt(req.query.page || 1)
      data.pageSize = parseInt(req.query.rows || 10)
      var sql = `SELECT COUNT(*) AS total FROM news where is_delete = 0`
      conn.query(sql, function (err, result) {
        if (err) {
          //console.log(err)
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
  var sqlcheck = `select t.id from news t where t.id = ?`
  conn.query(sqlcheck,[param.id], function(err,result){
    if (err){
    }

  })



      // var sql = `INSERT INTO news (id,date,publication_id,description,is_delete) VALUES (?,?,?,0)`
      var sql = `INSERT INTO news SET ?`
      var time1 = param.date
      const obj = {
        id: param.id,
        date: param.date,
        title: param.title,
        description: param.description,
        is_delete: 0
      }
      //[param.id,time1,param.publication_id,param.description]
      conn.query(sql, obj, function (err, result) {
        if (err) {
          let data = {}
          data.code = 502
          data.message = '添加失败'
          jsonWrite(res, data)
          console.log(err)
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
  var sql = `update news t set t.is_delete = 1 WHERE t.id = ?`
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
  var sql = `UPDATE news t SET t.date = ?, t.title = ? , t.description = ? WHERE t.id = ? and t.is_delete = 0`
  var param = req.body
  conn.query(sql, [param.date,param.title,param.description,param.id], function (err, result) {
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

function formatDate (date, fmt) {
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
module.exports = router
