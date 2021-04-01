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
                t.name as NAME,
                t.platform as PLATFORM,
                t.platform_link as LINK,
                t.pdf_path as PDF,
                t.platform_link as PATH,
                t.note as NOTE,
                t.year as YEAR,
                t.type as TYPE,
                t.is_selected as SELECTED
                    FROM publication t WHERE t.is_delete = 0`
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
      var sql = `SELECT COUNT(*) AS total FROM publication where is_delete = 0`
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
  var sqlcheck = `select t.id from publication t where t.id = ?`
  conn.query(sqlcheck,[param.id], function(err,result){
    if (err){
    }
    if (result[0] != null){
    }
  })
  var params = req.files
//图片上传
if(param.pdf !== 'null' && (path.extname(params.pdf.originalFilename) === '.pdf' || path.extname(params.pdf.originalFilename) === '.PDF')) {

  let orignal = params.pdf.path
  if (!fs.existsSync('images')) {
    fs.mkdirSync('images')
  }
  if (!fs.existsSync('images\\publication')) {
    fs.mkdirSync('images\\publication')
  }

  let target = 'images\\publication\\' + param.id + path.extname(params.pdf.originalFilename)
  var src = fs.createReadStream(orignal)
  var dest = fs.createWriteStream(target)
  src.pipe(dest)
  src.on('end', function () {
    var sql = `INSERT INTO publication (id,name,platform,platform_link,pdf_path,note,year,type,is_selected,is_delete) VALUES (?,?,?,?,?,?,?,?,?,0)`
    let myPath = '/www/wwwroot/www.ics2.cn/images/publication/' + param.id + path.extname(params.pdf.originalFilename)
    conn.query(sql, [param.id, param.name, param.platform, param.link, myPath, param.note, param.year, param.type, param.is_select], function (err, result) {
      if (err) {
        let data = {}
        data.code = 502
        data.message = '编号重复'
        jsonWrite(res, data)
        //console.log(err)
      }
      if (result) {
        let data = {}
        data.code = 200
        data.message = '操作成功'
        jsonWrite(res, data)
      }
    })
  })
  src.on('error', function (err) {
    jsonWrite(res, {
      code: 402,
      message: '文件上传失败'
    })
  })
}else if(param.pdf !== 'null' && path.extname(params.pdf.originalFilename) !== '.pdf' && path.extname(params.pdf.originalFilename) !== '.PDF'){
  jsonWrite(res,{
    code: 402,
    message: '文件类型必须为pdf'
  })
}else {
  jsonWrite(res, {
    code: 402,
    message: '请上传文件'
  })
}
})

// 删除用户
router.post('/deleteUserById', (req, res) => {

  var sqlt = `update publication_writer set is_delete = 1 where publication_id = ?`
  var sql = `update publication t set t.is_delete = 1 WHERE t.id = ?`
  var param = req.body

      conn.query(sqlt,[param.id],function (err, result) {
        if (err) {
          let errData = {
            code: 401,
            message: '删除失败'
          }
          jsonWrite(res, errData)
        }
        if (result) {
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
        }
      })

})

// 更新用户
router.post('/updateUser', (req, res) => {
  var sql = `UPDATE publication t SET  platform = ?,platform_link = ?, note = ?,year = ?,type = ?,is_selected = ? WHERE t.id = ? and t.is_delete = 0`
  var param = req.body

  //图片上传
  var params = req.files
  if(param.pdf !== 'null' && (path.extname(params.pdf.originalFilename) === '.pdf'||path.extname(params.pdf.originalFilename) === '.PDF')){
    let orignal = params.pdf.path
    if(!fs.existsSync('images')){
      fs.mkdirSync('images')
    }
    if(!fs.existsSync('images\\publication')){
      fs.mkdirSync('images\\publication')
    }

    let target = 'images\\publication\\' + param.id + path.extname(params.pdf.originalFilename)
    var src = fs.createReadStream(orignal)
    var dest = fs.createWriteStream(target)
    src.pipe(dest)
    src.on('end', function() {
      sql = `UPDATE publication t SET pdf_path = ?, platform = ?,platform_link = ?, note = ?,year = ?,type = ?,is_selected = ? WHERE t.id = ? and t.is_delete = 0`
      let myPath = '/www/wwwroot/www.ics2.cn/images/publication/' + param.id + path.extname(params.pdf.originalFilename)
      conn.query(sql, [myPath,param.platform,param.link,param.note,param.year,param.type,param.is_select,param.id], function (err, result) {
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
        message: '图片上传失败'
      })
    })
  }else if(param.pdf !== 'null' && path.extname(params.pdf.originalFilename) !== '.pdf' && path.extname(params.pdf.originalFilename) !== '.PDF'){
    jsonWrite(res,{
      code: 402,
      message: '文件类型必须为pdf'
    })
  } else {
    var sql = `UPDATE publication t SET  platform = ?,platform_link = ?, note = ?,year = ?,type = ?,is_selected = ? WHERE t.id = ? and t.is_delete = 0`
    conn.query(sql, [param.platform,param.link,param.note,param.year,param.type,param.is_select,param.id], function (err, result) {
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

module.exports = router
