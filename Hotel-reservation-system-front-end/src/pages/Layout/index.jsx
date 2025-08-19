import { Card, Row, Col, Typography, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const { Title, Paragraph } = Typography

const Layout = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)

    return (
        <div className="home-page">
            <Title level={2}>欢迎使用宾馆预订管理系统</Title>
            <Paragraph>
                这是一个功能完整的宾馆预订管理系统，您可以在这里浏览宾馆、预订房间、管理订单等。
            </Paragraph>
            
            {!user ? (
                <Card style={{ marginBottom: 20 }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Title level={4}>新用户?</Title>
                            <Paragraph>立即注册账户以享受我们的服务</Paragraph>
                            <Button type="primary" onClick={() => navigate('/register')}>
                                注册账户
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Title level={4}>已有账户?</Title>
                            <Paragraph>登录您的账户以管理预订</Paragraph>
                            <Button onClick={() => navigate('/login')}>
                                登录
                            </Button>
                        </Col>
                    </Row>
                </Card>
            ) : null}
            
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="宾馆浏览" bordered={false}>
                        <Paragraph>浏览我们合作的宾馆，查看详细信息和房型</Paragraph>
                        <Button type="primary" onClick={() => navigate('/hotels')}>
                            浏览宾馆
                        </Button>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="我的预订" bordered={false}>
                        <Paragraph>查看和管理您的预订记录</Paragraph>
                        <Button type="primary" onClick={() => navigate('/bookings')}>
                            查看预订
                        </Button>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="优惠活动" bordered={false}>
                        <Paragraph>查看最新的优惠活动和折扣信息</Paragraph>
                        <Button type="primary">
                            查看优惠
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Layout