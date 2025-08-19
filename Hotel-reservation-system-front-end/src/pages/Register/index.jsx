import { useState } from 'react'
import { Form, Input, Button, Card, message, Select } from 'antd'
import { UserOutlined, LockOutlined, PhoneOutlined, IdcardOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, clearError } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

const Register = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useSelector(state => state.auth)

  const onFinish = async (values) => {
    setLoading(true)
    try {
      await dispatch(registerUser(values)).unwrap()
      message.success('注册成功')
      navigate('/login')
    } catch (err) {
      message.error(err || '注册失败')
    } finally {
      setLoading(false)
    }
  }

  const handleClearError = () => {
    dispatch(clearError())
  }

  return (
    <div className="auth-form-card">
      <Card title="用户注册">
        <Form
          name="register"
          onFinish={onFinish}
          onValuesChange={handleClearError}
        >
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: '请输入姓名!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="姓名" />
          </Form.Item>
          
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱!' },
              { type: 'email', message: '请输入有效的邮箱地址!' }
            ]}
          >
            <Input prefix={<IdcardOutlined />} placeholder="邮箱" />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码!' },
              { min: 8, message: '密码至少8位!' }
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: '请输入手机号!' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号!' }
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="手机号" />
          </Form.Item>
          
          <Form.Item
            name="userType"
            rules={[{ required: true, message: '请选择用户类型!' }]}
          >
            <Select placeholder="用户类型">
              <Option value="GUEST">普通用户</Option>
              <Option value="HOTEL_ADMIN">宾馆管理员</Option>
            </Select>
          </Form.Item>

          {error && (
            <Form.Item>
              <div style={{ color: 'red' }}>{error}</div>
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              注册
            </Button>
            或 <a href="/login">已有账户，立即登录!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Register