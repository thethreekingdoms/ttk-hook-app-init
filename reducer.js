import { Map, fromJS, List } from 'immutable'
import moment from 'moment'
export {
  dialogTempState,
  attributeForm,
  validateState,
} from './dialog/reducer'

// 所有的reducers函数在框架初始化时都会被框架自动调用一次，以初始化state数据。调用时action的值为{type:0.022444457651 },type是一个小于1的随机值
export function tempState(state = Map({
  loading: false,
  showDialog: false
}), action) {
  switch (action.type) {
    case 'setLoading':
      return state.sf(['loading'], action.data)
    case 'setShowDialog':
      return state.sf(['showDialog'], action.data)
    default:
      return state
  }
}

/************************** 搜索数据 start **************************/
export function validateSearchState(state = Map({
  code: { state: 'success', message: '' },
  userName: { state: 'success', message: '' },
  phone: { state: 'success', message: '' },
  email: { state: 'success', message: '' },
  createData: { state: 'success', message: '' }
}), action) {
  switch (action.type) {
    case 'update':
      return state.sfs(fromJS(action.data))
    default:
      return state
  }
}
export function searchParam(state = Map(fromJS({
  entity: {
    userName: '',
    phone: '',
    email: '',
    department: '',
    createData: moment()
  },
  pager: {
    pageIndex: 1,
    pageSize: 20,
    recordCount: 0,
    pageCount: 0
  }
})), action) {
  switch (action.type) {
    case "update-search-param":
      state = state.mergeIn(['entity'], action.data)
      return state
    case "update-search-page":
      return state = state.mergeIn(['pager'], fromJS(action.data))
    default:
      return state
  }
}
/************************** 搜索数据 End **************************/

/************************** 表格数据 start **************************/
export function tableThead(state = List(), action) {
  state = List(fromJS(action))
  return state
}

export function tableData(state = List(), action) {
  let index
  switch (action.type) {
    case 'update-list':
      state = List(fromJS(action.data))
      return state
    // case 'insert':
    //   state = state.insert(parseInt(action.data.seq), fromJS({
    //     ...action.data,
    //     // seq: parseInt(action.data.seq) + 1 + '',
    //   }))
    //   state = updataSeq(state)
    //   return state
    // case 'remove':
    //   index = state.findIndex((item, index, array) => {
    //     return item.get('id') === action.data.id
    //   })
    //   return state.slice(0, index).concat(state.slice(index + 1, state.count()))
    // case 'update':
    //   index = state.findIndex((item, index, array) => {
    //     return item.get('id') === action.data.id
    //   })
    //   state = state.update(index, record => record = fromJS(action.data))
    //   return state
    case 'selectall':
      return state.map(item => {
        return item.sf(['selected'], action.data)
      })
    default:
      return state
  }
}
/************************** 表格数据 end **************************/