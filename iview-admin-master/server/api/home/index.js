var models = require('../../db/index.js')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var token = require('../../token')
var UUID = require('uuid')
var multiparty = require('multiparty')
var multer  = require('multer')
var fs = require('fs')
var path = require('path')

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
                t.TYPE as TYPE,
                t.content as CONTENT
                    FROM home t WHERE t.is_delete = 0 order by t.type`
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
      var sql = `SELECT COUNT(*) AS total FROM home where is_delete = 0`
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
  var sqlcheck = `select t.id from home t where t.id = ?`
  conn.query(sqlcheck,[param.id], function(err,result){
    if (err){
    }
    if (result[0] != null){
    }
  })

  //图片上传
  var params = req.files
  if(check(param,params) === 1){
    let orignal = params.picture.path
    if(!fs.existsSync('images')){
      fs.mkdirSync('images')
    }
    if(!fs.existsSync('images\\home')){
      fs.mkdirSync('images\\home')
    }

    let target = 'images\\home\\' + param.id + path.extname(params.picture.originalFilename)
    var src = fs.createReadStream(orignal)
    var dest = fs.createWriteStream(target)
    src.pipe(dest)
    src.on('end', function() {
      var sqlt = `SELECT COUNT(*) AS total FROM home`
      conn.query(sqlt, function (err, result) {
        if (err) {
          //console.log(err)
        }
        if (result) {
          let total = result[0].total + 1
          var sql = `INSERT INTO home (id,type,content,is_delete) VALUES (?,?,?,0)`
          let myPath = '/www/wwwroot/www.ics2.cn/images/home/' + total + path.extname(params.picture.originalFilename)
          conn.query(sql, [total,param.type,myPath], function (err, result) {
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
        }
      })
    })
    src.on('error', function(err) {
      jsonWrite(res,{
        code: 402,
        file: req.file,
        message: '文件上传失败'
      })
    })
  }else if(check(param,params) === 2){
    jsonWrite(res,{
      code: 402,
      message: '文件未上传'
    })
  }else if(check(param,params) === 5){
    jsonWrite(res,{
      code: 402,
      message: '文件格式不正确(视频:mp3,图片:jpg,png)'
    })
  }
  else if(check(param,params) === 3){
    jsonWrite(res,{
      code: 402,
      message: '内容不可为空'
    })
  }else {
    var sqlt = `SELECT COUNT(*) AS total FROM home`
    conn.query(sqlt, function (err, result) {
      if (err) {
        console.log(err)
      }
      if (result) {
        let total = result[0].total + 1
        var sql = `INSERT INTO home (id,type,content,is_delete) VALUES (?,?,?,0)`
        conn.query(sql, [total,param.type,param.content], function (err, result) {
          if (err) {
            let data = {}
            data.code = 502
            data.message = '编号重复'
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
      }
    })
  }
})

// 删除用户
router.post('/deleteUserById', (req, res) => {
  var sql = `update home t set t.is_delete = 1 WHERE t.id = ?`
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
  var sql = ``
  var param = req.body
  //图片上传
  var params = req.files
  if(check(param,params) === 4){
    sql = `UPDATE home t SET  t.content = ? WHERE t.id = ? and t.is_delete = 0`
    conn.query(sql, [param.content,param.id], function (err, result) {
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
  }else if(check(param,params) === 5){
    jsonWrite(res,{
      code: 402,
      message: '文件格式不正确(视频:mp3,图片:jpg,png)'
    })
  }else if( check(param,params) === 3){
    jsonWrite(res,{
      code: 402,
      message: '内容不能为空'
    })
  }
  else if( check(param,params) === 2){
    jsonWrite(res,{
      code: 402,
      message: '文件未上传'
    })
  }
  else {
    let orignal = params.picture.path
    if(!fs.existsSync('images')){
      fs.mkdirSync('images')
    }
    if(!fs.existsSync('images\\home')){
      fs.mkdirSync('images\\home')
    }

    let target = 'images\\home\\' + param.id + path.extname(params.picture.originalFilename)
    var src = fs.createReadStream(orignal)
    var dest = fs.createWriteStream(target)
    src.pipe(dest)
    src.on('end', function() {
      sql = `UPDATE home t SET  t.content = ? WHERE t.id = ? and t.is_delete = 0`
      let myPath = '/www/wwwroot/www.ics2.cn/images/home/' + param.id + path.extname(params.picture.originalFilename)
      conn.query(sql, [myPath,param.id], function (err, result) {
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
    src.on('error', function(err) {
      jsonWrite(res,{
        code: 402,
        file: req.file,
        message: '文件上传失败'
      })
    })
  }
})

function check(param,params){
  let status = 0
  let s = 0
  if(param.type === "picture") {
    if(param.picture === 'null'){
      return 2
    }
    let p = path.extname(params.picture.originalFilename)
    status = 0
    if(p === '.jpg' || p === '.JPG' || p === '.PNG' || p === '.png'){
      s = 1
    }
  } else if(param.type === "video"){
    if(param.picture === 'null'){
      return 2
    }
    status = 0
    let p = path.extname(params.picture.originalFilename)
    if(p === '.mp4' || p === '.MP4'){
      s = 1
    }
  } else {
    status = 1
  }
  //文件上传
  if(status===0 && param.picture !== 'null'){
    if(s){
      return 1
    }
    return 5
  }
  //文件未发
  if(status===0 && param.picture === 'null'){
    return 2
  }
  //content为空
  if(status===1 && param.content === 'undefined'){
    return 3
  }
  //content可插入
  if(status===1 && param.content !== 'undefined'){
    return 4
  }

}

module.exports = router
