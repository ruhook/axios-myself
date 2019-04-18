import Ajv from 'ajv'
import { GLOBAL_HEADER } from './const'
import { ERROR, CODE } from './const'
import responseSchema from './schema'

/**
 * 处理请求头
 * @returns {header}
 */
export function getHeader() {
  const header = Object.assign({}, GLOBAL_HEADER)

  const userInfo = {} // 根据自己的需求配置
  if (userInfo) {
    headers.token = userInfo.token
  }

  return header
}

/**
 * 反序列化
 * @param {*} response
 * @returns {stringify}
 */
export function stringify(response) {
  return JSON.stringify(response)
}

/**
 * 数据格式检验
 * @param {*} response
 * @param {*} next
 */
const ajv = new Ajv()
export function validationData(response, next) {
  const valid = ajv.validate(responseSchema, response)
  if (!valid) {
    return ERROR.FORMAT
  }
  return next()
}

/**
 * 业务状态码校验
 * @param {*} response
 * @param {*} next
 */
const loginErrorCode = [CODE.LOCK, CODE.FORBIDDEN, CODE.LOGINTIMEOUT, CODE.EXPIRED] // 需要重新登录
export function codeIntercepter(response, next) {
  const code = response.data.code
  if (code !== CODE.SUCCESS) {
    if (code === CODE.LOGOUT) {
      return error.LOGOUT // 未登录
    }
    if (loginErrorCode.includes(code)) {
      return error.LOGINERROR // 登录失败
    }
  }
  return next()
}