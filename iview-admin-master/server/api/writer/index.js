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
                t.type as TYPE,
                t.publication_id as PUBID,
                t.serial_number as NUM
                    FROM publication_writer t WHERE t.is_delete = 0 order by t.publication_id ,t.serial_number `
  var paramList = []


  sql += ' LIMIT ?, ?'
  paramList.push(start, end)
  //var userToken = req.headers.authorization
  //userToken = userToken.substring(userToken.indexOf(' '))
  //console.log(token.decodeToken(userToken))
  conn.query(sql, paramList,function (err, result) {
    if (err) {
      //console.log(err)
    }
    if (result.length > 0) {
      let data = {}

      data.data = result
      data.pageNum = parseInt(req.query.page || 1)
      data.pageSize = parseInt(req.query.rows || 10)
      var sql = `SELECT COUNT(*) AS total FROM publication_writer where is_delete = 0`
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
  var sql = `INSERT INTO publication_writer (pid,id,type,serial_number,publication_id,is_delete) VALUES (?,?,?,?,?,0)`

  let pid = 0
  var sqlpid = `select count(*) as total from publication_writer t `
  conn.query(sqlpid,[],function(err,result){
    if(err){

    }else{
      pid = result[0].total + 1
    }
  })

  var sqlcheck = `select count(*) as total from publication t where t.id = ?`
  conn.query(sqlcheck,[param.publication_id], function(err,result){
    if (result[0].total == 0){
      let data = {}
      data.code = 502
      data.message = '无该论文'
      jsonWrite(res, data)
      }else {
      if(param.type === "教师"){
        sqlcheck = `select count(*) as total from teacher t where t.id = ?`
        conn.query(sqlcheck,[param.id],function(err,result){
          if(result[0].total == 0){
            let data = {}
            data.code = 502
            data.message = '无该教师'
            jsonWrite(res, data)
          }else{
            conn.query(sql, [pid,param.id,param.type,param.serial_number,param.publication_id], function (err, result) {
              if (err) {
                let data = {}
                data.code = 502
                data.message = '添加失败'
                jsonWrite(res, data)
              }
              if (result) {
                let data = {}
                data.code = 200
                data.message = '添加成功'
                jsonWrite(res, data)
              }
            })
          }
        })
      }else if(param.type === "学生"){
        sqlcheck = `select count(*) as total from student t where t.id = ?`
        conn.query(sqlcheck,[param.id],function(err,result){
          if(result[0].total == 0){
            let data = {}
            data.code = 502
            data.message = '无该学生'
            jsonWrite(res, data)
          }else{
            conn.query(sql, [pid,param.id,param.type,param.serial_number,param.publication_id], function (err, result) {
              if (err) {
                let data = {}
                data.code = 502
                data.message = '添加失败'
                jsonWrite(res, data)
              }
              if (result) {
                let data = {}
                data.code = 200
                data.message = '添加成功'
                jsonWrite(res, data)
              }
            })
          }
        })
      }

    }
  })


})

// 删除用户
router.post('/deleteUserById', (req, res) => {
  var sql = `update publication_writer t set t.is_delete = 1 WHERE t.id = ? and t.publication_id = ? and t.type = ? and t.serial_number = ?`
  var param = req.body
  conn.query(sql,[param.id,param.publication_id,param.type,param.serial_number],function (err, result) {
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
  var sql = `UPDATE publication_writer t SET  t.type = ?, t.id = ? WHERE  t.publication_id = ? and  t.serial_number = ? and t.is_delete = 0`
  var param = req.body
  var sqlcheck = ""
  if(param.type === "教师"){
    sqlcheck = `select count(*) as total from teacher t where t.id = ?`
    conn.query(sqlcheck,[param.id],function(err,result){
      if(result[0].total == 0){
        let data = {}
        data.code = 502
        data.message = '无该教师'
        jsonWrite(res, data)
      }else{
        conn.query(sql, [param.type,param.id,param.publication_id,param.serial_number], function (err, result) {
          if (err) {
            let data = {}
            data.code = 502
            data.message = '更新失败'
            jsonWrite(res, data)
          }
          if (result) {
            let data = {}
            data.code = 200
            console.log(sql)
            data.message = '更新成功'
            jsonWrite(res, data)

          }
        })
      }
    })
  }else if(param.type === "学生"){
    sqlcheck = `select count(*) as total from student t where t.id = ?`
    conn.query(sqlcheck,[param.id],function(err,result){
      if(result[0].total == 0){
        let data = {}
        data.code = 502
        data.message = '无该学生'
        jsonWrite(res, data)
      }else{
        conn.query(sql, [param.type,param.id,param.publication_id,param.serial_number], function (err, result) {
          if (err) {
            let data = {}
            data.code = 502
            data.message = '更新失败'
            jsonWrite(res, data)
          }
          if (result) {
            let data = {}
            data.code = 200
            data.message = '更新成功'
            jsonWrite(res, data)
          }
        })
      }
    })
  }
})

module.exports = router
