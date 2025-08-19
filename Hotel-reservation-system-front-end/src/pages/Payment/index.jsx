import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Button, Radio, Input, Form, message, Steps, Result } from 'antd'
import { fetchBookingById } from '../../store/bookingSlice'
import { formatDate, formatCurrency } from '../../utils/helpers'

const { Step } = Steps

const Payment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { bookingId } = useParams()
  const { currentBooking } = useSelector(state => state.bookings)
  const [currentStep, setCurrentStep] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('ALIPAY')
  const [cardInfo, setCardInfo] = useState({ number: '', name: '', expiry: '', cvv: '' })

  useEffect(() => {
    if (bookingId) {
      dispatch(fetchBookingById(bookingId))
    }
  }, [dispatch, bookingId])

  const handlePayment = () => {
    // 模拟支付处理
    setCurrentStep(1)
    setTimeout(() => {
      setCurrentStep(2)
      message.success('支付成功')
    }, 2000)
  }

  const handleCardInfoChange = (field, value) => {
    setCardInfo({
      ...cardInfo,
      [field]: value
    })
  }

  const handleFinish = () => {
    navigate('/bookings')
  }

  if (currentStep === 2) {
    return (
      <Result
        status="success"
        title="支付成功"
        subTitle={`您已成功支付订单 ${currentBooking?.id}，金额为${formatCurrency(currentBooking?.totalPrice)}`}
        extra={[
          <Button type="primary" key="bookings" onClick={handleFinish}>
            查看预订
          </Button>,
          <Button key="home" onClick={() => navigate('/')}>
            返回首页
          </Button>
        ]}
      />
    )
  }

  return (
    <div>
      <h1>支付订单</h1>
      <Steps current={currentStep} style={{ marginBottom: 30 }}>
        <Step title="支付信息" />
        <Step title="处理中" />
        <Step title="支付完成" />
      </Steps>

      {currentStep === 0 && (
        <Card title={`订单信息 - ${currentBooking?.id}`}>
          <div style={{ marginBottom: 20 }}>
            <h3>订单详情</h3>
            <p><strong>宾馆:</strong> {currentBooking?.hotelId}</p>
            <p><strong>房型:</strong> {currentBooking?.roomType.name}</p>
            <p><strong>入住日期:</strong> {formatDate(currentBooking?.checkInDate)}</p>
            <p><strong>退房日期:</strong> {formatDate(currentBooking?.checkOutDate)}</p>
            <p><strong>总价:</strong> {formatCurrency(currentBooking?.totalPrice)}</p>
          </div>

          <Card title="选择支付方式" style={{ marginBottom: 20 }}>
            <Radio.Group
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
              style={{ width: '100%' }}
            >
              <Radio.Button value="ALIPAY" style={{ width: '33%', textAlign: 'center' }}>
                支付宝
              </Radio.Button>
              <Radio.Button value="WECHAT_PAY" style={{ width: '33%', textAlign: 'center' }}>
                微信支付
              </Radio.Button>
              <Radio.Button value="CREDIT_CARD" style={{ width: '33%', textAlign: 'center' }}>
                信用卡
              </Radio.Button>
            </Radio.Group>
          </Card>

          {paymentMethod === 'CREDIT_CARD' && (
            <Card title="信用卡信息" style={{ marginBottom: 20 }}>
              <Form layout="vertical">
                <Form.Item label="卡号">
                  <Input
                    placeholder="请输入卡号"
                    value={cardInfo.number}
                    onChange={(e) => handleCardInfoChange('number', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="持卡人姓名">
                  <Input
                    placeholder="请输入持卡人姓名"
                    value={cardInfo.name}
                    onChange={(e) => handleCardInfoChange('name', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="有效期">
                  <Input
                    placeholder="MM/YY"
                    value={cardInfo.expiry}
                    onChange={(e) => handleCardInfoChange('expiry', e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="CVV">
                  <Input
                    placeholder="CVV"
                    value={cardInfo.cvv}
                    onChange={(e) => handleCardInfoChange('cvv', e.target.value)}
                  />
                </Form.Item>
              </Form>
            </Card>
          )}

          <Button type="primary" onClick={handlePayment} style={{ width: '100%' }}>
            确认支付 {formatCurrency(currentBooking?.totalPrice)}
          </Button>
        </Card>
      )}

      {currentStep === 1 && (
        <Card>
          <div style={{ textAlign: 'center', padding: 50 }}>
            <h2>正在处理支付...</h2>
            <p>请稍候，我们正在处理您的支付请求</p>
          </div>
        </Card>
      )}
    </div>
  )
}

export default Payment