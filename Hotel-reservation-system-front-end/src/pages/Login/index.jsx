import { useState } from 'react'
import { Form, Input, Button, Checkbox, Card, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearError } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useSelector(state => state.auth)

  const onFinish = async (values) => {
    setLoading(true)
    try {
      await dispatch(loginUser(values)).unwrap()
      message.success('登录成功')
      navigate('/')
    } catch (err) {
      message.error(err || '登录失败')
    } finally {
      setLoading(false)
    }
  }

  const handleClearError = () => {
    dispatch(clearError())
  }

  return (
    <div className="auth-form-card">
      <Card title="用户登录">
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onValuesChange={handleClearError}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: '请输入邮箱!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="邮箱" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <a style={{ float: 'right' }} href="">
              忘记密码
            </a>
          </Form.Item>

          {error && (
            <Form.Item>
              <div style={{ color: 'red' }}>{error}</div>
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              登录
            </Button>
            或 <a href="/register">立即注册!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login