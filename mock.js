/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'edf-utils'
import { debug } from 'util';
import Mock from 'mockjs'

const mockproxy = '/v1/testTools/ttk-hook-app-init'
function filter(list, index, value) {
  return list.filter(item => {
    return String(item[index]).indexOf(value) >= 0
  })
}
// fetch.mock(`${mockproxy}/subTreeData`, (option) => {
//   const data = Mock.mock({
//     'list|15': [{
//       functioinId: "@integer(-100000, 100000)",
//       name: "@cname",
//       url: "#",
//       parentId: "1",
//       'subNodeFlag|1': ["0", "1"],
//     }]
//   })
//   return {
//     result: true,
//     value: data.list
//   }
// })

fetch.mock(`${mockproxy}/thead`, (option) => {
  return {
    result: true,
    value: [{
      dataIndex: 'userId',
      title: '用户ID'
    }, {
      title: '用户类型',
      dataIndex: 'userType',
    }, {
      title: '服务号码',
      dataIndex: 'encode'
    }, {
      title: '用户名称',
      dataIndex: 'userName'
    }, {
      title: '邮箱',
      dataIndex: 'email'
    }, {
      title: '手机号',
      dataIndex: 'mobilePhone'
    }, {
      title: '启用',
      dataIndex: 'isValid'
    }, {
      title: '部门',
      dataIndex: 'channel'
    }, {
      title: '创建者ID',
      dataIndex: 'createUser'
    }, {
      title: '所属部门',
      dataIndex: 'depName'
    }, {
      title: '所属部门ID',
      dataIndex: 'depId'
    }, {
      title: '用户岗位',
      dataIndex: 'dutiesName'
    }]
  }
})
// mock(url, function)， function必须返回你要的值
fetch.mock(`${mockproxy}/tableBody`, (option) => {
  const { pageIndex, pageSize } = option.pager
  const { userName } = option.entity
  let list = mockList().list
  if (userName !== '')
    list = filter(list, 'userName', userName)
  const recordCount = list.length
  const pageCount = Math.ceil(recordCount / pageSize)
  const data = list.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
  return {
    result: true,
    value: {
      pager: {
        pageIndex,
        pageSize,
        recordCount,
        pageCount
      },
      data
    }
  }
})

function mockList() {
  return Mock.mock({
    'list|101': [{
      userId: "@integer(-100000, 100000)",
      userType: "@ctitle(4)",
      encode: "@increment",
      userName: "@name",
      email: "123456@qq.com",
      mobilePhone: "15800003248",
      isValid: "@cparagraph(1, 2)",
      channel: "win",
      createUser: "1",
      createDate: "@datetime(yyyy-MM-dd)",
      updateUser: "1",
      updateDate: "@datetime",
      depName: "@cparagraph(4)",
      depId: "1",
      dutiesName: "@ctitle(12)",
      depUserId: "0ec47f6cd1c54c0dbed81255d4f84ce6"
    }]
  })
}

// mock(url, function)， function必须返回你要的值
fetch.mock(`${mockproxy}/attributeForm`, (option) => {
  const { name, sortNo } = option
  let result = true
  if (Number(sortNo) != 1)
    result = false
  return {
    result,
    error:{
      code:303,
      message: 'mock接口设置了只有排序等于1时才能提交成功。'
    },
    value: {
      ...option
    }
  }
})