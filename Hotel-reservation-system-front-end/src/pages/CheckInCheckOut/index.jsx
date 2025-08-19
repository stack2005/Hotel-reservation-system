import { useState } from 'react'
import { Tabs, Card, Form, Input, Button, message, Table, Tag, Modal } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const { TabPane } = Tabs

const CheckInCheckOut = () => {
  const [checkInForm] = Form.useForm()
  const [checkOutForm] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)

  // 模拟预订数据
  const [bookings] = useState([
    {
      id: 'booking-1',
      hotel: '阳光快捷宾馆',
      guestName: '张三',
      roomType: '标准大床房',
      checkInDate: '2023-10-01',
      checkOutDate: '2023-10-05',
      status: 'CONFIRMED'
    },
    {
      id: 'booking-2',
      hotel: '海景度假酒店',
      guestName: '李四',
      roomType: '豪华双床房',
      checkInDate: '2023-11-01',
      checkOutDate: '2023-11-03',
      status: 'CHECKED_IN'
    }
  ])

  const handleCheckIn = (values) => {
    // 这里应该调用办理入住的API
    console.log('办理入住:', values)
    message.success('入住办理成功')
    checkInForm.resetFields()
  }

  const handleCheckOut = (values) => {
    // 这里应该调用办理退房的API
    console.log('办理退房:', values)
    message.success('退房办理成功')
    checkOutForm.resetFields()
  }

  const handleRoomChange = (booking) => {
    setSelectedBooking(booking)
    setIsModalVisible(true)
  }

  const handleConfirmRoomChange = () => {
    // 这里应该调用换房的API
    message.success('换房成功')
    setIsModalVisible(false)
  }

  const handleCancelRoomChange = () => {
    setIsModalVisible(false)
  }

  const bookingColumns = [
    {
      title: '预订编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '宾馆',
      dataIndex: 'hotel',
      key: 'hotel',
    },
    {
      title: '客人姓名',
      dataIndex: 'guestName',
      key: 'guestName',
    },
    {
      title: '房型',
      dataIndex: 'roomType',
      key: 'roomType',
    },
    {
      title: '入住日期',
      dataIndex: 'checkInDate',
      key: 'checkInDate',
    },
    {
      title: '退房日期',
      dataIndex: 'checkOutDate',
      key: 'checkOutDate',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'default'
        let text = status
        if (status === 'CONFIRMED') {
          color = 'green'
          text = '已确认'
        } else if (status === 'CHECKED_IN') {
          color = 'blue'
          text = '已入住'
        }
        return <Tag color={color}>{text}</Tag>
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <>
          {record.status === 'CONFIRMED' && (
            <Button 
              type="primary" 
              icon={<CheckCircleOutlined />}
              onClick={() => handleCheckIn({ bookingId: record.id })}
              style={{ marginRight: 8 }}
            >
              办理入住
            </Button>
          )}
          {record.status === 'CHECKED_IN' && (
            <>
              <Button 
                type="primary" 
                onClick={() => handleRoomChange(record)}
                style={{ marginRight: 8 }}
              >
                换房
              </Button>
              <Button 
                type="primary" 
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => handleCheckOut({ checkInId: record.id })}
              >
                办理退房
              </Button>
            </>
          )}
        </>
      ),
    }
  ]

  return (
    <div>
      <h1>入住/退房管理</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="办理入住" key="1">
          <Card title="入住信息">
            <Form
              form={checkInForm}
              layout="vertical"
              onFinish={handleCheckIn}
            >
              <Form.Item
                name="bookingId"
                label="预订编号"
                rules={[{ required: true, message: '请输入预订编号!' }]}
              >
                <Input placeholder="请输入预订编号" />
              </Form.Item>
              
              <Form.Item
                name="idNumber"
                label="证件号码"
                rules={[{ required: true, message: '请输入证件号码!' }]}
              >
                <Input placeholder="请输入证件号码" />
              </Form.Item>
              
              <Form.Item
                name="idType"
                label="证件类型"
                rules={[{ required: true, message: '请选择证件类型!' }]}
              >
                <Input placeholder="请输入证件类型" />
              </Form.Item>
              
              <Form.Item
                name="specialRequests"
                label="特殊要求"
              >
                <Input.TextArea placeholder="如有特殊要求请填写" rows={4} />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  办理入住
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        
        <TabPane tab="办理退房" key="2">
          <Card title="退房信息">
            <Form
              form={checkOutForm}
              layout="vertical"
              onFinish={handleCheckOut}
            >
              <Form.Item
                name="checkInId"
                label="入住记录ID"
                rules={[{ required: true, message: '请输入入住记录ID!' }]}
              >
                <Input placeholder="请输入入住记录ID" />
              </Form.Item>
              
              <Card title="额外费用" style={{ marginBottom: 20 }}>
                <Form.Item
                  name="additionalCharges"
                  label="费用描述"
                >
                  <Input placeholder="费用描述" />
                </Form.Item>
                <Form.Item
                  name="amount"
                  label="金额"
                >
                  <Input placeholder="金额" type="number" />
                </Form.Item>
              </Card>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  办理退房
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        
        <TabPane tab="预订列表" key="3">
          <Card title="待处理预订">
            <Table 
              dataSource={bookings} 
              columns={bookingColumns} 
              rowKey="id"
            />
          </Card>
        </TabPane>
      </Tabs>

      <Modal
        title="客人换房"
        visible={isModalVisible}
        onOk={handleConfirmRoomChange}
        onCancel={handleCancelRoomChange}
      >
        <p>为客人 <strong>{selectedBooking?.guestName}</strong> 办理换房手续</p>
        <Form layout="vertical">
          <Form.Item
            label="新房间号"
            name="newRoomId"
            rules={[{ required: true, message: '请输入新房间号!' }]}
          >
            <Input placeholder="请输入新房间号" />
          </Form.Item>
          <Form.Item
            label="换房原因"
            name="reason"
          >
            <Input.TextArea placeholder="请输入换房原因" rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CheckInCheckOut