import config from "./config"

export const ERROR = {
  SERVER: 1, // 服务错误
  REQUEST: 2, // 请求错误
  LOGOUT: 3, // 登录错误
  LOGINERROR: 4, // 登录超时
  AUTH: 5, // 权限错误
  FORMAT: 6, // 格式错误
  LOGINFAIL: 7, // 用户名密码错误
  AUTHCODE: 8 // 验证码错误
}

export const CODE = {
  SUCCESS: 200, // 成功
  SUCMIN: 210,
  SUCMAX: 220,
  UPDATE: 201, // 系统升级
  LOGINFAIL: 202, // 用户名密码错误
  AUTHCODE: 203, // 验证码错误
  LOCK: 204, // 账号锁定
  FORBIDDEN: 205, // 账号禁用
  LOGOUT: 303, // 未登录
  LOGINTIMEOUT: 304, // 登录超时
  EXPIRED: 400, // 密码过期
  AUTH: 403, // 权限限制
  AUTHSERVER: 302, // 权限限制
  ERROR: 500, // 服务器内部错误
  ESERROR: 501 // ES初始化失败
}

export const GLOBAL_HEADER = {
  "Content-Type": "application/x-www-form-urlencoded"
}

export const SUCCESS_RESPONSE_COCE = CODE.SUCCESS //成功code码

export const API_PREFIX = config.apiPrefix.api
export const API_TIMEOUT = config.timeout