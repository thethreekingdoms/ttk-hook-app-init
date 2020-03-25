import webapi from '../webapi'
import { validator } from 'edf-utils'


/************************** 属性表单 start **************************/

// 定义需要校验的字段和校验规则, 支持同一个字段多条规则和异步校验，详情可参考
// https://github.com/yiminghe/async-validator
const rules = {
  name: { type: 'string', max: 12, min: 4, required: true, message: '请输入长度为4-12的名称' },
  sortNo: [{ type: 'string', required: true, message: '请输入顺序' }, { pattern: /^\d{1,12}$/, message: '顺序必须是1-12d的数字' }],
  isCycle: { type: 'number', required: true, message: '请选择是否循环' },
  isUse: { type: 'number', required: true, message: '请选择是否启用' }
}
// 更新表单
export function updateFormObj(reduce, gf, fields) {
  return async (dispatch, getState) => {
    if (!fields)
      fields = gf(['attributeForm'])
    // 字段校验。返回一个长度为2的数组，第一个是boolean值，代表是否校验成功，第二个是错误消息状态
    const [result, resultObj] = await validator.fieldValidator(fields, rules)
    // 更新文本域验证状态
    reduce('validateState', { type: 'update', data: resultObj })
    // 更新表单数据
    reduce('attributeForm', { type: 'update', data: fields })
    return result
  }
}

// 提交表单
export function dialogSave(reduce, gf, data) {
  return async (dispatch, getState) => {
    // 获取表单数据
    const formObj = gf(['attributeForm'])
    const isEdit = gf(['dialogTempState', 'isEdit'])
    // 提交表单
    const res = await webapi.attributeForm(formObj)
    if (res === undefined) {
      return false
    } else {
      return true
    }
  }
}

/************************** 属性表单 end **************************/
