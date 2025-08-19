import { useState, useEffect } from 'react'
import { Card, Form, DatePicker, Select, Button, Table, Tag, Statistic, Row, Col, message } from 'antd'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { useDispatch, useSelector } from 'react-redux'
import { formatCurrency } from '../../utils/helpers'

const { RangePicker } = DatePicker
const { Option } = Select

const Reports = () => {
  const dispatch = useDispatch()
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState([])
  const [form] = Form.useForm()

  // 模拟销售统计数据
  const salesReportData = {
    period: "2023-01-01 至 2023-12-31",
    totalRevenue: 156800.5,
    occupancyRate: 78.5,
    topRoomTypes: [
      { roomType: "豪华套房", revenue: 45000, count: 120 },
      { roomType: "标准大床房", revenue: 38000, count: 180 },
      { roomType: "豪华双床房", revenue: 32000, count: 150 }
    ],
    monthlyTrend: [
      { month: "2023-01", revenue: 12500, bookings: 45 },
      { month: "2023-02", revenue: 11800, bookings: 42 },
      { month: "2023-03", revenue: 14200, bookings: 51 },
      { month: "2023-04", revenue: 13500, bookings: 48 },
      { month: "2023-05", revenue: 15800, bookings: 56 },
      { month: "2023-06", revenue: 16200, bookings: 58 },
      { month: "2023-07", revenue: 14800, bookings: 53 },
      { month: "2023-08", revenue: 13900, bookings: 49 },
      { month: "2023-09", revenue: 12600, bookings: 45 },
      { month: "2023-10", revenue: 14100, bookings: 50 },
      { month: "2023-11", revenue: 15200, bookings: 54 },
      { month: "2023-12", revenue: 16800, bookings: 60 }
    ]
  }

  // 模拟热门房型数据
  const topRoomTypesData = [
    { roomType: "豪华套房", revenue: 45000, count: 120 },
    { roomType: "标准大床房", revenue: 38000, count: 180 },
    { roomType: "豪华双床房", revenue: 32000, count: 150 },
    { roomType: "商务套房", revenue: 28000, count: 100 },
    { roomType: "家庭房", revenue: 22000, count: 90 }
  ]

  useEffect(() => {
    // 初始化图表数据
    setChartData(salesReportData.monthlyTrend)
  }, [])

  const handleGenerateReport = (values) => {
    setLoading(true)
    // 模拟API调用
    setTimeout(() => {
      setReportData(salesReportData)
      setChartData(salesReportData.monthlyTrend)
      setLoading(false)
      message.success('报表生成成功')
    }, 1000)
  }

  const topRoomTypesColumns = [
    {
      title: '房型',
      dataIndex: 'roomType',
      key: 'roomType',
    },
    {
      title: '收入',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue) => formatCurrency(revenue)
    },
    {
      title: '预订数量',
      dataIndex: 'count',
      key: 'count',
    }
  ]

  const monthlyTrendColumns = [
    {
      title: '月份',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: '收入',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue) => formatCurrency(revenue)
    },
    {
      title: '预订数量',
      dataIndex: 'bookings',
      key: 'bookings',
    }
  ]

  return (
    <div>
      <h1>销售统计报表</h1>
      
      <Card style={{ marginBottom: 20 }}>
        <Form
          form={form}
          layout="inline"
          onFinish={handleGenerateReport}
        >
          <Form.Item
            name="dateRange"
            label="日期范围"
            rules={[{ required: true, message: '请选择日期范围!' }]}
          >
            <RangePicker />
          </Form.Item>
          
          <Form.Item
            name="hotelId"
            label="宾馆"
          >
            <Select placeholder="请选择宾馆" style={{ width: 200 }}>
              <Option value="hotel-1">阳光快捷宾馆</Option>
              <Option value="hotel-2">海景度假酒店</Option>
              <Option value="hotel-3">商务精品酒店</Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              生成报表
            </Button>
          </Form.Item>
        </Form>
      </Card>
      
      {reportData && (
        <>
          <Row gutter={16} style={{ marginBottom: 20 }}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="总收入"
                  value={reportData.totalRevenue}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  suffix="元"
                  formatter={(value) => formatCurrency(value)}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="入住率"
                  value={reportData.occupancyRate}
                  precision={1}
                  valueStyle={{ color: '#cf1322' }}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="统计周期"
                  value={reportData.period}
                />
              </Card>
            </Col>
          </Row>
          
          <Card title="月度趋势" style={{ marginBottom: 20 }}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === 'revenue') return [formatCurrency(value), '收入']
                      return [value, name === 'bookings' ? '预订数量' : name]
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} name="收入" />
                  <Line type="monotone" dataKey="bookings" stroke="#82ca9d" name="预订数量" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Row gutter={16}>
            <Col span={12}>
              <Card title="热门房型">
                <Table
                  dataSource={reportData.topRoomTypes}
                  columns={topRoomTypesColumns}
                  pagination={false}
                  rowKey="roomType"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="月度明细">
                <Table
                  dataSource={reportData.monthlyTrend}
                  columns={monthlyTrendColumns}
                  pagination={false}
                  rowKey="month"
                />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}

export default Reports