import { test } from './merge'
import { post } from './axios'

export function getTest() {
  return post(test)
}