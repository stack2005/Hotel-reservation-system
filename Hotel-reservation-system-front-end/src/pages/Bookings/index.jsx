import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserBookings, cancelBooking, clearError } from '../../store/bookingSlice'
import { Card, List, Button, message, Spin, Tag, Modal, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import { formatDate, formatCurrency, getStatusColor } from '../../utils/helpers'

const Bookings = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { bookings, loading, error } = useSelector(state => state.bookings)
  const { user } = useSelector(state => state.auth)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [cancelForm] = Form.useForm()

  useEffect(() => {
    if (user) {
      dispatch(fetchUserBookings())
    } else {
      navigate('/login')
    }
  }, [dispatch, user, navigate])

  useEffect(() => {
    if (error) {
      message.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking)
    setIsModalVisible(true)
  }

  const handleConfirmCancel = async (values) => {
    try {
      await dispatch(cancelBooking({
        bookingId: selectedBooking.id,
        reason: values.reason
      })).unwrap()
      message.success('预订已取消')
      setIsModalVisible(false)
      cancelForm.resetFields()
    } catch (err) {
      message.error(err || '取消预订失败')
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    cancelForm.resetFields()
  }

  const handleViewDetails = (bookingId) => {
    navigate(`/bookings/${bookingId}`)
  }

  return (
    <div>
      <h1>我的预订</h1>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={bookings}
          renderItem={booking => (
            <List.Item>
              <Card
                title={`预订编号: ${booking.id}`}
                extra={<Tag color={getStatusColor(booking.status)}>{booking.status}</Tag>}
                actions={[
                  <Button onClick={() => handleViewDetails(booking.id)}>查看详情</Button>,
                  (booking.status === 'PENDING' || booking.status === 'CONFIRMED') && (
                    <Button type="primary" danger onClick={() => handleCancelBooking(booking)}>
                      取消预订
                    </Button>
                  )
                ]}
              >
                <p><strong>宾馆:</strong> {booking.hotelId}</p>
                <p><strong>房型:</strong> {booking.roomType.name}</p>
                <p><strong>入住日期:</strong> {formatDate(booking.checkInDate)}</p>
                <p><strong>退房日期:</strong> {formatDate(booking.checkOutDate)}</p>
                <p><strong>入住人数:</strong> {booking.guests}</p>
                <p><strong>总价:</strong> {formatCurrency(booking.totalPrice)}</p>
                {booking.discountApplied && (
                  <p><strong>优惠码:</strong> {booking.discountApplied} (优惠{formatCurrency(booking.discountAmount)})</p>
                )}
              </Card>
            </List.Item>
          )}
        />
      )}

      <Modal
        title="取消预订"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={cancelForm}
          layout="vertical"
          onFinish={handleConfirmCancel}
        >
          <Form.Item
            name="reason"
            label="取消原因"
            rules={[{ required: true, message: '请输入取消原因!' }]}
          >
            <Input.TextArea placeholder="请输入取消原因" rows={4} />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" danger htmlType="submit" style={{ width: '100%' }}>
              确认取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Bookings