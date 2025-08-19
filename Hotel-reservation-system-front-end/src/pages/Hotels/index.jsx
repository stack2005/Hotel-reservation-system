import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHotels, clearError } from '../../store/hotelSlice'
import { Card, Row, Col, Input, Button, message, Rate, Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Search } = Input

const Hotels = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { hotels, loading, error } = useSelector(state => state.hotels)
  const [searchParams, setSearchParams] = useState({ name: '', location: '' })

  useEffect(() => {
    dispatch(fetchHotels())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      message.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleSearch = () => {
    dispatch(fetchHotels(searchParams))
  }

  const handleViewDetails = (hotelId) => {
    navigate(`/hotels/${hotelId}`)
  }

  const onSearchChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <h1>宾馆浏览</h1>
      <div style={{ marginBottom: 20 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Input
              placeholder="宾馆名称"
              name="name"
              value={searchParams.name}
              onChange={onSearchChange}
            />
          </Col>
          <Col span={8}>
            <Input
              placeholder="位置"
              name="location"
              value={searchParams.location}
              onChange={onSearchChange}
            />
          </Col>
          <Col span={8}>
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
              搜索
            </Button>
          </Col>
        </Row>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {hotels.map(hotel => (
            <Col span={8} key={hotel.id}>
              <Card
                title={hotel.name}
                extra={<Rate disabled defaultValue={hotel.rating} />}
                actions={[
                  <Button type="primary" onClick={() => handleViewDetails(hotel.id)}>
                    查看详情
                  </Button>
                ]}
              >
                <p><strong>地址:</strong> {hotel.address}</p>
                <p><strong>电话:</strong> {hotel.phone}</p>
                <p><strong>描述:</strong> {hotel.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default Hotels