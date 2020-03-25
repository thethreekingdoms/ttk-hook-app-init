/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */

import { fetch } from 'edf-utils'
const mockproxy = '/v1/testTools/ttk-hook-app-init'
export default {
    thead: (option) => fetch.post(`${mockproxy}/thead`, option, null, { mock: true }),
    tableBody: (option) => fetch.post(`${mockproxy}/tableBody`, option, null, { mock: true }),
    attributeForm: (option) => fetch.post(`${mockproxy}/attributeForm`, option),
}