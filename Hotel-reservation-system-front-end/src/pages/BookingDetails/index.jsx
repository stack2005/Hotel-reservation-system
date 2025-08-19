import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookingById, clearError } from '../../store/bookingSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, message, Spin, Tag, Descriptions } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { formatDate, formatCurrency, getStatusColor } from '../../utils/helpers'

const BookingDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { bookingId } = useParams()
  const { currentBooking, loading, error } = useSelector(state => state.bookings)

  useEffect(() => {
    dispatch(fetchBookingById(bookingId))
  }, [dispatch, bookingId])

  useEffect(() => {
    if (error) {
      message.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleGoBack = () => {
    navigate('/bookings')
  }

  return (
    <div>
      <Button icon={<ArrowLeftOutlined />} onClick={handleGoBack} style={{ marginBottom: 20 }}>
        返回预订列表
      </Button>
      
      {loading && !currentBooking ? (
        <div style={{ textAlign: 'center', padding: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Card title={`预订详情 - ${currentBooking?.id}`}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="预订状态">
              <Tag color={getStatusColor(currentBooking?.status)}>{currentBooking?.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="宾馆名称">{currentBooking?.hotelId}</Descriptions.Item>
            <Descriptions.Item label="房型">{currentBooking?.roomType.name}</Descriptions.Item>
            <Descriptions.Item label="入住日期">{formatDate(currentBooking?.checkInDate)}</Descriptions.Item>
            <Descriptions.Item label="退房日期">{formatDate(currentBooking?.checkOutDate)}</Descriptions.Item>
            <Descriptions.Item label="入住人数">{currentBooking?.guests}</Descriptions.Item>
            <Descriptions.Item label="基础价格">{formatCurrency(currentBooking?.roomType.basePrice)}/晚</Descriptions.Item>
            <Descriptions.Item label="总价">{formatCurrency(currentBooking?.totalPrice)}</Descriptions.Item>
            {currentBooking?.discountApplied && (
              <>
                <Descriptions.Item label="优惠码">{currentBooking.discountApplied}</Descriptions.Item>
                <Descriptions.Item label="优惠金额">{formatCurrency(currentBooking.discountAmount)}</Descriptions.Item>
              </>
            )}
            <Descriptions.Item label="创建时间">{formatDate(currentBooking?.createdAt)}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{formatDate(currentBooking?.updatedAt)}</Descriptions.Item>
          </Descriptions>
          
          <div style={{ marginTop: 20 }}>
            <h3>房间设施</h3>
            {currentBooking?.roomType.amenities.map((amenity, index) => (
              <Tag key={index} color="green">{amenity}</Tag>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export default BookingDetails