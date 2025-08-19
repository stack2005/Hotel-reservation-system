import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHotelById, fetchRoomTypes, clearError } from '../../store/hotelSlice'
import { createBooking } from '../../store/bookingSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Row, Col, Button, message, Spin, Rate, Tag, Modal, Form, Input, InputNumber, DatePicker } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { formatCurrency } from '../../utils/helpers'

const { RangePicker } = DatePicker

const HotelDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { hotelId } = useParams()
  const { currentHotel, roomTypes, loading, error } = useSelector(state => state.hotels)
  const { user } = useSelector(state => state.auth)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [bookingForm] = Form.useForm()

  useEffect(() => {
    dispatch(fetchHotelById(hotelId))
    dispatch(fetchRoomTypes(hotelId))
  }, [dispatch, hotelId])

  useEffect(() => {
    if (error) {
      message.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleBookNow = (room) => {
    if (!user) {
      message.warning('请先登录后再预订')
      navigate('/login')
      return
    }
    setSelectedRoom(room)
    setIsModalVisible(true)
  }

  const handleBooking = async (values) => {
    try {
      const bookingData = {
        hotelId,
        roomId: selectedRoom.id,
        checkInDate: values.dateRange[0].format('YYYY-MM-DD'),
        checkOutDate: values.dateRange[1].format('YYYY-MM-DD'),
        guests: values.guests,
        totalPrice: selectedRoom.basePrice * values.dateRange[0].diff(values.dateRange[1], 'days') * -1,
        discountCode: values.discountCode || null
      }
      
      await dispatch(createBooking(bookingData)).unwrap()
      message.success('预订成功')
      setIsModalVisible(false)
      bookingForm.resetFields()
    } catch (err) {
      message.error(err || '预订失败')
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    bookingForm.resetFields()
  }

  const disabledDate = (current) => {
    // 不能选择今天之前的日期
    return current && current < new Date().setHours(0, 0, 0, 0)
  }

  return (
    <div>
      {loading && !currentHotel ? (
        <div style={{ textAlign: 'center', padding: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <h1>{currentHotel?.name}</h1>
          <Card>
            <Row gutter={16}>
              <Col span={16}>
                <p><strong>地址:</strong> {currentHotel?.address}</p>
                <p><strong>电话:</strong> {currentHotel?.phone}</p>
                <p><strong>描述:</strong> {currentHotel?.description}</p>
              </Col>
              <Col span={8}>
                <div style={{ textAlign: 'center' }}>
                  <Rate disabled defaultValue={currentHotel?.rating} />
                  <p>评分: {currentHotel?.rating}</p>
                </div>
              </Col>
            </Row>
          </Card>

          <h2 style={{ marginTop: 30 }}>房间类型</h2>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 50 }}>
              <Spin size="large" />
            </div>
          ) : (
            <Row gutter={[16, 16]}>
              {roomTypes.map(room => (
                <Col span={8} key={room.id}>
                  <Card
                    title={room.name}
                    extra={<Tag color="blue">{formatCurrency(room.basePrice)}/晚</Tag>}
                    actions={[
                      <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={() => handleBookNow(room)}
                      >
                        立即预订
                      </Button>
                    ]}
                  >
                    <p><strong>容量:</strong> {room.capacity}人</p>
                    <p><strong>设施:</strong></p>
                    <div>
                      {room.amenities.map((amenity, index) => (
                        <Tag key={index} color="green">{amenity}</Tag>
                      ))}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}

      <Modal
        title={`预订 - ${selectedRoom?.name}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={bookingForm}
          layout="vertical"
          onFinish={handleBooking}
        >
          <Form.Item
            name="dateRange"
            label="入住日期"
            rules={[{ required: true, message: '请选择入住日期!' }]}
          >
            <RangePicker
              style={{ width: '100%' }}
              disabledDate={disabledDate}
              format="YYYY-MM-DD"
            />
          </Form.Item>
          
          <Form.Item
            name="guests"
            label="入住人数"
            rules={[{ required: true, message: '请输入入住人数!' }]}
          >
            <InputNumber min={1} max={selectedRoom?.capacity} style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="discountCode"
            label="优惠码"
          >
            <Input placeholder="如有优惠码请填写" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              确认预订
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default HotelDetails