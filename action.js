import webapi from './webapi'
import { validator } from 'edf-utils'
export {
  updateFormObj,
  dialogSave,
} from './dialog/action'

/************************** 搜索表单 start **************************/

// 定义需要校验的字段和校验规则, 支持同一个字段多条规则和异步校验，详情可参考
// https://github.com/yiminghe/async-validator
const rules = {
  code: [{ type: 'string', required: true, message: '请输入编码' }, {
    asyncValidator: async (rule, value, callback) => {
      const res = await webapi.person.validateFunctionCode(value)
      if (res.errorCode !== '0') {
        callback(res.errorMsg)
      } else {
        callback()
      }
    }
  }],
  userName: { type: 'string', max: 12, min: 1, required: true, message: '请输入名称' },
  phone: [{ pattern: /^\d{11}$/, required: true, message: '请输入11位手机号码' }],
  email: { type: 'email', required: true, message: '请检查邮箱地址格式' },
  createData: { type: 'object', required: true, message: '日期格式错误' }
}
// 更新表单
export function updateSearchFormObj(reduce, gf, fields) {
  return async (dispatch, getState) => {
    if (!fields)
      fields = gf(['searchParam', 'entity'])
    // 字段校验。返回一个长度为2的数组，第一个是boolean值，代表是否校验成功，第二个是错误消息状态
    const [result, resultObj] = await validator.fieldValidator(fields, rules)
    // 更新文本域验证状态
    reduce('validateSearchState', { type: 'update', data: resultObj })
    // 更新表单数据
    reduce('searchParam', { type: 'update-search-param', data: fields })
    return result
  }
}

/************************** 搜索表单 end **************************/

/************************** 表格数据 start **************************/

export function fetchThead(reduce, gf, data) {
  return async (dispatch, getState) => {
    // 查询时的查询条件应通过gf函数从store中获取参数，尽量减少从View层传参。注意：gf函数返回的是一个对象
    const searchOption = gf(['searchParam'])
    const res = await webapi.thead(searchOption)
    // 添加Checkbox列
    let columns = [{
      title: 'checkbox',
      dataIndex: 'selected'
    }]
    if (res) {
      res.map((item, index) => {
        // if (!item.isVisible) return
        columns.push({
          ...item,
          key: index,
        })
      })
      reduce('tableThead', columns)
      return columns
    }
  }
}

export function fetchTableBody(reduce, gf, data) {
  return async (dispatch, getState) => {
    const searchOption = gf(['searchParam'])
    const res = await webapi.tableBody(searchOption)
    if (res) {
      reduce('searchParam', { type: 'update-search-page', data: res.pager })
      reduce('tableData', { type: 'update-list', data: res.data })
      return res
    }
  }
}

/************************** 表格数据 end **************************/