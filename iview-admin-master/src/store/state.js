/**
 * @description: 全局状态
 * @author: xx
 * @date: 2018-08-07 16:31:18
 */
let defaultRouterMap = [{
  path: '/',
  name: 'home-index',
  title: '主页'
}]
let token = ''
try {
  if (sessionStorage.routerMap) {
    defaultRouterMap = JSON.parse(sessionStorage.routerMap)
  }
  if (sessionStorage.token) {
    token = sessionStorage.token
  }
} catch (e) {}
export default {
  routerMap: defaultRouterMap, // 路由记录
  isCollapsed: false, // 边栏收缩状态
  token: token // 用户登录token
}
