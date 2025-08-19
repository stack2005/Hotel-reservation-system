import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs, Card, Form, Input, Button, message, Table, Select, Tag } from 'antd'
import { fetchHotels, clearError } from '../../store/hotelSlice'

const { TabPane } = Tabs
const { Option } = Select

const Admin = () => {
  const dispatch = useDispatch()
  const { hotels, loading, error } = useSelector(state => state.hotels)
  const { user } = useSelector(state => state.auth)
  const [form] = Form.useForm()
  const [userForm] = Form.useForm()

  useEffect(() => {
    if (user?.userType !== 'HOTEL_ADMIN' && user?.userType !== 'SYSTEM_ADMIN') {
      message.error('您没有权限访问此页面')
      // 这里应该导航到首页或其他页面
    } else {
      dispatch(fetchHotels())
    }
  }, [dispatch, user])

  useEffect(() => {
    if (error) {
      message.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleCreateHotel = (values) => {
    // 这里应该调用创建宾馆的API
    console.log('创建宾馆:', values)
    message.success('宾馆创建成功')
    form.resetFields()
  }

  const handleModifyUserRole = (values) => {
    // 这里应该调用修改用户角色的API
    console.log('修改用户角色:', values)
    message.success('用户角色修改成功')
    userForm.resetFields()
  }

  const hotelColumns = [
    {
      title: '宾馆名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '评分',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <Tag color="blue">{rating}</Tag>
    }
  ]

  return (
    <div>
      <h1>管理员面板</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="创建宾馆" key="1">
          <Card title="宾馆信息">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleCreateHotel}
            >
              <Form.Item
                name="name"
                label="宾馆名称"
                rules={[{ required: true, message: '请输入宾馆名称!' }]}
              >
                <Input placeholder="请输入宾馆名称" />
              </Form.Item>
              
              <Form.Item
                name="address"
                label="地址"
                rules={[{ required: true, message: '请输入地址!' }]}
              >
                <Input placeholder="请输入地址" />
              </Form.Item>
              
              <Form.Item
                name="phone"
                label="电话"
                rules={[{ required: true, message: '请输入电话!' }]}
              >
                <Input placeholder="请输入电话" />
              </Form.Item>
              
              <Form.Item
                name="description"
                label="描述"
              >
                <Input.TextArea placeholder="请输入宾馆描述" rows={4} />
              </Form.Item>
              
              <Form.Item
                name="adminUserId"
                label="管理员用户ID"
                rules={[{ required: true, message: '请输入管理员用户ID!' }]}
              >
                <Input placeholder="请输入管理员用户ID" />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  创建宾馆
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        
        <TabPane tab="宾馆管理" key="2">
          <Card title="宾馆列表">
            <Table 
              dataSource={hotels} 
              columns={hotelColumns} 
              loading={loading}
              rowKey="id"
            />
          </Card>
        </TabPane>
        
        <TabPane tab="用户管理" key="3">
          <Card title="修改用户角色">
            <Form
              form={userForm}
              layout="vertical"
              onFinish={handleModifyUserRole}
            >
              <Form.Item
                name="userId"
                label="用户ID"
                rules={[{ required: true, message: '请输入用户ID!' }]}
              >
                <Input placeholder="请输入用户ID" />
              </Form.Item>
              
              <Form.Item
                name="role"
                label="角色"
                rules={[{ required: true, message: '请选择角色!' }]}
              >
                <Select placeholder="请选择角色">
                  <Option value="GUEST">普通用户</Option>
                  <Option value="HOTEL_ADMIN">宾馆管理员</Option>
                  <Option value="SYSTEM_ADMIN">系统管理员</Option>
                </Select>
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  修改角色
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Admin