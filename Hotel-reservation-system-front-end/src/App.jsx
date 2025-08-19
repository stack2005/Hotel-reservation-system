import { Outlet, useNavigate } from 'react-router-dom'
import { Layout, Menu, theme, message } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './store/authSlice'
import './App.css'

const { Header, Content, Footer } = Layout

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const [current, setCurrent] = useState('home')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClick = (e) => {
    setCurrent(e.key)
    // 根据菜单项key进行导航
    switch (e.key) {
      case 'home':
        navigate('/')
        break
      case 'hotels':
        navigate('/hotels')
        break
      case 'bookings':
        navigate('/bookings')
        break
      case 'payment':
        navigate('/payment')
        break
      case 'admin':
        navigate('/admin')
        break
      case 'checkin-checkout':
        navigate('/checkin-checkout')
        break
      case 'reports':
        navigate('/reports')
        break
      case 'login':
        navigate('/login')
        break
      default:
        navigate('/')
    }
  }

  const { user } = useSelector(state => state.auth)

  const menuItems = [
    { key: 'home', label: '首页' },
    { key: 'hotels', label: '宾馆浏览' },
    { key: 'bookings', label: '我的预订', disabled: !user },
  ]

  // 如果用户已登录，添加更多菜单项
  if (user) {
    menuItems.push({ key: 'payment', label: '支付中心' })
    
    // 如果是管理员，添加管理员菜单项
    if (user.userType === 'HOTEL_ADMIN' || user.userType === 'SYSTEM_ADMIN') {
      menuItems.push({ key: 'admin', label: '管理员面板' })
      menuItems.push({ key: 'checkin-checkout', label: '入住/退房' })
      menuItems.push({ key: 'reports', label: '报表系统' })
    }
    
    menuItems.push({ key: 'logout', label: '退出登录' })
  } else {
    menuItems.push({ key: 'login', label: '登录' })
  }

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      dispatch(logout())
      message.success('已退出登录')
    } else {
      onClick(e)
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          onClick={handleMenuClick}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: 8,
            marginTop: 16,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        宾馆预订管理系统 ©{new Date().getFullYear()} Created by React & Ant Design
      </Footer>
    </Layout>
  )
}

export default App
