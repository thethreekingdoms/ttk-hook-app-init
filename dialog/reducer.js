import { Map, fromJS, List } from 'immutable'
import moment from 'moment'



// 所有的reducers函数在框架初始化时都会被框架自动调用一次，以初始化state数据。调用时action的值为{type:0.022444457651 },type是一个小于1的随机值
export function dialogTempState(state = Map({
  isEdit: false,
  loading: false
}), action) {
  switch (action.type) {
    case 'setEdit':
      return state.sf(['isEdit'], action.data)
    case 'setLoading':
      return state.sf(['loading'], action.data)
    default:
      return state
  }
}

/************************** 属性表单 start **************************/

export function validateState(state = Map({
  name: { state: 'success', message: '' },
  sortNo: { state: 'success', message: '' },
  isCycle: { state: 'success', message: '' },
  isUse: { state: 'success', message: '' },
}), action) {
  switch (action.type) {
    case 'update':
      return state.sfs(fromJS(action.data))
    default:
      return state
  }
}

const defaultForm = {
  name: null,
  sortNo: null,
  isCycle: null,
  isUse: null,
  dateStart: moment(),
  dateEnd: moment('2015/01/01')
}
export function attributeForm(state = Map(fromJS(defaultForm)
), action) {
  switch (action.type) {
    case 'update':
      return state.sfs(fromJS(action.data))
    case 'reset':
      if (!action.data)
        return Map(fromJS(defaultForm))
      return Map(fromJS({ ...defaultForm, ...action.data }))
    default:
      return state
  }
}

/************************** 属性表单 end **************************/
