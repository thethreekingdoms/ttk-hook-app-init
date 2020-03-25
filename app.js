import React, { useState, useEffect, useCallback } from 'react'
import { Layout, Button, Card, Dialog } from 'edf-component'
import { useAppData, useData, useActions, useCommit } from 'edf-app-loader'
import CardTable from './components/CardTable'
import Pagination from './components/Pagination'
import TableSearch from './components/TableSearch'
import CardForm from './dialog/CardForm'

export default React.memo(Page)
function Page(props) {
  const actions = useActions(props)
  const commit = useCommit()
  const showDialog = useData([props, 'tempState', 'showDialog'])

  const handleDialgOK = useCallback((e) => {
    commit([props, 'tempState'], { type: 'setShowDialog', data: false })
  }, [showDialog])
  const handleDialgCancel = useCallback((e) => {
    commit([props, 'tempState'], { type: 'setShowDialog', data: false })
  }, [showDialog])

  return (
    <Layout className="ttk-menu-container ttk-hook-app-init">
      <Layout className="ttk-table-container">
        <TableSearch {...props} />
        <CardTable {...props} />
        <Pagination {...props} />
      </Layout>
      {/* Dialog是antd的Modal组件的再封装，更多属性可参考antd */}
      <Dialog
        className="ttk-hook-app-init-dialog"
        title="新增"
        visible={showDialog}
        // style={{ top: 70 }}
        width={800}
        onOk={handleDialgOK}
        onCancel={handleDialgCancel}
        footer={null} // 不需要显示底部按钮时，只需要将 footer设置为null即可，否则删除
      >
        <div className="ttk-table-container">
          <CardForm {...props} />
        </div>
      </Dialog>
    </Layout>
  )
}