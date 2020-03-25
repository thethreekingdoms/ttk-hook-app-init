import React, { useState, useCallback } from 'react'
import { Spin, Card, Layout, Row, Col, Form, Input, Radio, Select, Button, Message, DatePicker, Modal } from 'edf-component'
import { useData, useActions, useCommit } from 'edf-app-loader'

export default function CardTree(props) {

  const commit = useCommit()
  const actions = useActions(props)
  const isEdit = useData([props, 'dialogTempState', 'isEdit'])
  const loading = useData([props, 'dialogTempState', 'loading'])
  const validateState = useData([props, 'validateState']).toJS()
  const formObj = useData([props, 'attributeForm']).toJS()
  const isCycle = ['否', '是']
  const isUse = ['否', '是']

  const updateForm = useCallback((e) => {
    async function asyncFun(arges) {
      await actions.updateFormObj(e)
    }
    asyncFun(e)
  }, [])

  const save = useCallback(() => {
    async function asyncFun() {
      // 使用commit直接更新reducer数据。这种方式可跳过action直接更新reducer数据
      commit([props, 'dialogTempState'], { type: 'setLoading', data: true })
      const resutl = await actions.dialogSave()
      if (resutl) {
        Message.info('新建成功')
        commit([props, 'tempState'], { type: 'setShowDialog', data: false })
      }
      commit([props, 'dialogTempState'], { type: 'setLoading', data: false })
    }
    async function validate() {
      const result = await actions.updateFormObj()
      if (!result) return;
      Modal.confirm({
        title: '确认',
        content: '是否确认提交表单',
        onOk: () => asyncFun()
      })
    }
    validate()
  }, [formObj.parentId])

  const onReset = useCallback(() => {
    commit([props, 'attributeForm'], { type: 'reset', data: null })
  }, [])
  return (
    <Card
      className="ttk-card-form"
    >
      <Spin spinning={loading} delay={50}>
        <Layout className="content">
          <Form>
            <Row>
              <Col span={12}>
                <Form.Item
                  className="label100"
                  label="名称"
                  required={true}
                  validateStatus={validateState.name.state}
                  help={validateState.name.message}>
                  <Input placeholder="请输入名称" disabled={false} value={formObj.name} onChange={e => updateForm({ name: e.target.value })} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="label100"
                  label="排序"
                  required={true}
                  validateStatus={validateState.sortNo.state}
                  help={validateState.sortNo.message}>
                  <Input placeholder="请输入优先级" disabled={false} value={formObj.sortNo} onChange={e => updateForm({ sortNo: e.target.value })} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  className="label100"
                  label="是否循环"
                  required={true}
                  validateStatus={validateState.isCycle.state}
                  help={validateState.isCycle.message}>
                  <Select
                    placeholder="请选择是否循环"
                    filterOption={null}
                    allowClear={true}
                    disabled={false}
                    value={formObj.isCycle}
                    onChange={e => updateForm({ isCycle: e })} >
                    {
                      isCycle.map((item, index) => <Select.Option value={index}>{item}</Select.Option>)
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="label100"
                  label="启用"
                  required={true}
                  validateStatus={validateState.isUse.state}
                  help={validateState.isUse.message}>
                  <Select
                    placeholder="请选择启用"
                    filterOption={null}
                    allowClear={true}
                    disabled={false}
                    value={formObj.isUse}
                    onChange={e => updateForm({ isUse: e })} >
                    {
                      isUse.map((item, index) => <Select.Option value={index}>{item}</Select.Option>)
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="label100"
                  label="有效期起"
                // required={true}
                >
                  <DatePicker placeholder="请选择有效期起" defaultValue={formObj.dateStart} value={formObj.dateStart} onChange={e => updateForm({ dateStart: e })} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="label100"
                  label="有效期止"
                // required={true}
                >
                  <DatePicker placeholder="请选择有效期止" value={formObj.dateEnd} onChange={e => updateForm({ dateEnd: e })} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  className="label100"
                  label="分值"
                >
                  <Input placeholder="请输入分值" disabled={false} value={formObj.url} onChange={e => updateForm({ url: e.target.value })} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col className="form-footer" span={24}>
                {isEdit ?
                  <Button type="primary" _visible={true} onClick={save}>修改</Button>
                  :
                  <Button type="primary" _visible={!isEdit} onClick={save}>新增</Button>
                }
                <Button onClick={onReset}>清除</Button>
              </Col>
            </Row>
          </Form>
        </Layout>
      </Spin>
    </Card>
  )
}