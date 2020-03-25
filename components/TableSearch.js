import React, { useState, useCallback } from 'react'
import { Spin, Card, Layout, Row, Col, Form, Input, Radio, Select, Button, Message, Dialog, TimePicker, Popover, DatePicker } from 'edf-component'
import { useData, useActions, useCommit } from 'edf-app-loader'
import { Divider } from 'antd'

export default function CardTree(props) {
  const actions = useActions(props)
  const commit = useCommit()
  const validateState = useData([props, 'validateSearchState']).toJS()
  const formObj = useData([props, 'searchParam', 'entity']).toJS()
  const updateForm = useCallback((e) => {
    async function asyncFun(arges){
      await actions.updateSearchFormObj(arges)
    }
    asyncFun(e)
  }, [])

  const search = useCallback(() => {
    async function asyncFun() {
      commit([props, 'tempState'], { type: 'setLoading', data: true })
      await actions.fetchTableBody()
      commit([props, 'tempState'], { type: 'setLoading', data: false })
    }
    asyncFun()
  }, [])

  const handleClick = useCallback((e) => {
    commit([props, 'tempState'], { type: 'setShowDialog', data: true })
  }, [])

  return (
    <Form
      layout="vertical"
      className="ttk-search-container"
    >
      <Row gutter={24}>
        <Col span={8} style={{ display: 'block' }}>
          <Form.Item labelCol={{ span: 5 }} label="用户名称"
            validateStatus={validateState.userName.state}
            help={validateState.userName.message}>
            <Input value={formObj.userName} onChange={e => updateForm({ userName: e.target.value })} />
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: 'block' }}>
          <Form.Item labelCol={{ span: 5 }} label="手机"
            validateStatus={validateState.phone.state}
            help={validateState.phone.message}>
            <Input value={formObj.phone} onChange={e => updateForm({ phone: e.target.value })} />
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: 'none' }}>
          <Form.Item labelCol={{ span: 5 }} label="部门">
            <Input value={formObj.department} onChange={e => updateForm({ department: e.target.value })} />
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: 'block' }}>
          <Form.Item labelCol={{ span: 5 }} label="邮箱"
            validateStatus={validateState.email.state}
            help={validateState.email.message}>
            <Input value={formObj.email} onChange={e => updateForm({ email: e.target.value })} />
          </Form.Item>
        </Col>
        <Col span={8} style={{ display: 'block' }}>
          <Form.Item labelCol={{ span: 6 }} label="新建日期"
            validateStatus={validateState.createData.state}
            help={validateState.createData.message}>
            <DatePicker
              placeholder="请选择有效期起"
              defaultValue={formObj.createData}
              value={formObj.createData}
              onChange={e => updateForm({ createData: e })}
            />
          </Form.Item>
        </Col>

        <Col span={8} style={{ display: 'block' }}>
          <Form.Item>
            <Button icon="search" type="primary" onClick={search}>查询</Button>
            <Divider type="vertical" />
            <Button icon="plus" type="primary" onClick={handleClick}>新建</Button>
          </Form.Item>
        </Col>
      </Row>

    </Form>
  )
}