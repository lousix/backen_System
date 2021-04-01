/**
 * @description: 通用配置
 * @author: xx
 * @date: 2018-08-07 14:46:36
 */
const windowTitle = '网站后台管理平台'
const logoName = '后台管理平台'

// 开发环境配置
const devIp = 'localhost'//47.110.75.177
const devInterfacePORT = '27017'

// 生产环境配置
const prodIp = 'localhost'//47.110.75.177
const prodInterfacePORT = '27017'

// 判断环境
const serverIP = process.env.NODE_ENV === 'production'?prodIp:devIp;
const interfacePORT =  process.env.NODE_ENV === 'production'?prodInterfacePORT:devInterfacePORT;

module.exports = {
  windowTitle,
  logoName,
  serverUrl: 'http://'+serverIP, // 服务器IP地址
  interfaceUrl: 'http://'+serverIP+':'+interfacePORT+'/api/', // 服务器端接口访问地址
}
