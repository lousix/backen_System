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
                s.id as ID,
                s.name as NAME,
                s.picture as PATH,
                s.Email as EMAIL,
                s.education as EDUCATION,
                s.interests as INTERESTS,
                s.degree as DEGREE,
                s.is_alumni as ALUMNI
                    FROM student s WHERE s.is_delete = 0`
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
      var sql = `SELECT COUNT(*) AS total FROM student where is_delete = 0`
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
  var sqlcheck = `select s.id from student s where s.id = ?`
  conn.query(sqlcheck,[param.id], function(err,result){
    if (err){
    }
    if (result[0] != null){
    }
  })


//图片上传
  var params = req.files

if(param.picture !== 'null' && check(param,params)){

  let orignal = params.picture.path
  if(!fs.existsSync('images')){
    fs.mkdirSync('images')
  }
  if(!fs.existsSync('images\\student')){
    fs.mkdirSync('images\\student')
  }
  let pathName = params.originalFilename
  console.log(pathName)
  let target = 'images\\student\\' + param.id + path.extname(params.picture.originalFilename)
  var src = fs.createReadStream(orignal)
  var dest = fs.createWriteStream(target)
  src.pipe(dest)
  src.on('end', function() {
    var sql = `INSERT INTO student (id,name,picture,Email,education,interests,degree,is_alumni,is_delete) VALUES (?,?,?,?,?,?,?,?,0)`

    let myPath = '/www/wwwroot/www.ics2.cn/images/student/'+param.id + path.extname(params.picture.originalFilename)

    conn.query(sql, [param.id,param.name,myPath,param.Email,param.education,param.interests,param.degree,param.is_alumni], function (err, result) {
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
  src.on('error', function(err) {
    jsonWrite(res,{
      code: 402,
      message: '图片上传失败'
    })
  })
}else if(param.picture !== 'null' && !check(param,params)){
  jsonWrite(res,{
    code: 402,
    message: '图片格式为png,jpg'
  })
}else{
  jsonWrite(res,{
    code: 402,
    message: '请上传图片'
  })
}
})

// 删除用户
router.post('/deleteUserById', (req, res) => {
  var sql = `update student s set s.is_delete = 1 WHERE s.id = ?`
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
  if(param.picture !== 'null' && check(param,params)){
    let orignal = params.picture.path
    if(!fs.existsSync('images')){
      fs.mkdirSync('images')
    }
    if(!fs.existsSync('images\\student')){
      fs.mkdirSync('images\\student')
    }

    let target = 'images\\student\\' + param.id + path.extname(params.picture.originalFilename)
    var src = fs.createReadStream(orignal)
    var dest = fs.createWriteStream(target)
    src.pipe(dest)
    src.on('end', function() {
      sql = `UPDATE student s SET s.picture = ?, s.Email = ?, s.education = ?, s.interests = ?, s.degree = ?, s.is_alumni = ? WHERE s.id = ? and s.is_delete = 0`
      let myPath = '/www/wwwroot/www.ics2.cn/images/student/'+param.id + path.extname(params.picture.originalFilename)
      conn.query(sql, [myPath,param.Email,param.education,param.interests,param.degree,param.is_alumni,param.id], function (err, result) {
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
        message: '图片上传失败'
      })
    })
  }else if(param.picture !== 'null' && !check(param,params)){
    jsonWrite(res,{
      code: 402,
      message: '图片格式为png,jpg'
    })
  }
  else {
    sql = `UPDATE student s SET s.Email = ?, s.education = ?, s.interests = ?, s.degree = ?, s.is_alumni = ? WHERE s.id = ? and s.is_delete = 0`
    conn.query(sql, [param.Email,param.education,param.interests,param.degree,param.is_alumni,param.id], function (err, result) {
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
  }
})

function check(param,params){
  if(param.picture === 'null'){
    return false
  }
  let p = path.extname(params.picture.originalFilename)
  if(p === '.jpg' || p === '.png' || p === '.JPG' ||p === '.PNG'){
    return true
  }else{
    return false
  }
}

module.exports = router
