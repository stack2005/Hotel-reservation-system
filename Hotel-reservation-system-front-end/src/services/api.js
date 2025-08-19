// 模拟API服务，实际项目中应该替换为真实的API调用

// 模拟延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 模拟API基础URL
const API_BASE_URL = '/api'

// API服务类
class ApiService {
  // 用户相关API
  static async registerUser(userData) {
    await delay(1000)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: {
        id: 'user-' + Date.now(),
        email: userData.email,
        fullName: userData.fullName,
        phone: userData.phone,
        userType: userData.userType || 'GUEST',
        createdAt: new Date().toISOString()
      }
    }
  }

  static async loginUser(credentials) {
    await delay(1000)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + Date.now(),
        user: {
          id: 'user-' + Date.now(),
          email: credentials.email,
          fullName: '测试用户',
          phone: '13800138000',
          userType: 'GUEST',
          createdAt: new Date().toISOString()
        }
      }
    }
  }

  static async getCurrentUser() {
    await delay(500)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: {
        id: 'user-' + Date.now(),
        email: 'user@example.com',
        fullName: '测试用户',
        phone: '13800138000',
        userType: 'GUEST',
        createdAt: new Date().toISOString()
      }
    }
  }

  // 宾馆相关API
  static async getHotels(searchParams = {}) {
    await delay(1000)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: [
        {
          id: 'hotel-1',
          name: '阳光快捷宾馆',
          address: '北京市海淀区中关村大街1号',
          phone: '010-88889999',
          description: '经济型连锁酒店，提供舒适住宿体验',
          rating: 4.2,
          createdAt: new Date().toISOString()
        },
        {
          id: 'hotel-2',
          name: '海景度假酒店',
          address: '三亚市滨海路88号',
          phone: '0898-66889999',
          description: '豪华海景酒店，享受无敌海景',
          rating: 4.8,
          createdAt: new Date().toISOString()
        },
        {
          id: 'hotel-3',
          name: '商务精品酒店',
          address: '上海市浦东新区陆家嘴金融区',
          phone: '021-66889999',
          description: '高端商务酒店，提供全方位商务服务',
          rating: 4.5,
          createdAt: new Date().toISOString()
        }
      ]
    }
  }

  static async getHotelById(hotelId) {
    await delay(500)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: {
        id: hotelId,
        name: '阳光快捷宾馆',
        address: '北京市海淀区中关村大街1号',
        phone: '010-88889999',
        description: '经济型连锁酒店，提供舒适住宿体验',
        rating: 4.2,
        createdAt: new Date().toISOString()
      }
    }
  }

  static async getRoomTypes(hotelId) {
    await delay(500)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: [
        {
          id: 'room-1',
          name: '标准大床房',
          basePrice: 299,
          capacity: 2,
          amenities: ['免费WiFi', '空调', '独立卫浴']
        },
        {
          id: 'room-2',
          name: '豪华双床房',
          basePrice: 399,
          capacity: 4,
          amenities: ['免费WiFi', '空调', '独立卫浴', '阳台']
        },
        {
          id: 'room-3',
          name: '商务套房',
          basePrice: 599,
          capacity: 4,
          amenities: ['免费WiFi', '空调', '独立卫浴', '客厅', '厨房']
        }
      ]
    }
  }

  // 预订相关API
  static async createBooking(bookingData) {
    await delay(1000)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: {
        id: 'booking-' + Date.now(),
        userId: 'user-1',
        hotelId: bookingData.hotelId,
        roomId: bookingData.roomId,
        roomType: {
          id: bookingData.roomId,
          name: '标准大床房',
          basePrice: 299,
          capacity: 2,
          amenities: ['免费WiFi', '空调', '独立卫浴']
        },
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        guests: bookingData.guests,
        totalPrice: bookingData.totalPrice,
        discountApplied: bookingData.discountCode || null,
        discountAmount: bookingData.discountAmount || 0,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  }

  static async getUserBookings(filterParams = {}) {
    await delay(1000)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: [
        {
          id: 'booking-1',
          userId: 'user-1',
          hotelId: 'hotel-1',
          roomId: 'room-1',
          roomType: {
            id: 'room-1',
            name: '标准大床房',
            basePrice: 299,
            capacity: 2,
            amenities: ['免费WiFi', '空调', '独立卫浴']
          },
          checkInDate: '2023-10-01',
          checkOutDate: '2023-10-05',
          guests: 2,
          totalPrice: 1196,
          discountApplied: 'WELCOME10',
          discountAmount: 119.6,
          status: 'CONFIRMED',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'booking-2',
          userId: 'user-1',
          hotelId: 'hotel-2',
          roomId: 'room-2',
          roomType: {
            id: 'room-2',
            name: '豪华双床房',
            basePrice: 399,
            capacity: 4,
            amenities: ['免费WiFi', '空调', '独立卫浴', '阳台']
          },
          checkInDate: '2023-11-01',
          checkOutDate: '2023-11-03',
          guests: 2,
          totalPrice: 798,
          discountApplied: null,
          discountAmount: 0,
          status: 'PENDING',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
    }
  }

  static async getBookingById(bookingId) {
    await delay(500)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: {
        id: bookingId,
        userId: 'user-1',
        hotelId: 'hotel-1',
        roomId: 'room-1',
        roomType: {
          id: 'room-1',
          name: '标准大床房',
          basePrice: 299,
          capacity: 2,
          amenities: ['免费WiFi', '空调', '独立卫浴']
        },
        checkInDate: '2023-10-01',
        checkOutDate: '2023-10-05',
        guests: 2,
        totalPrice: 1196,
        discountApplied: 'WELCOME10',
        discountAmount: 119.6,
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  }

  static async updateBooking(bookingId, updateData) {
    await delay(1000)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: {
        id: bookingId,
        userId: 'user-1',
        hotelId: 'hotel-1',
        roomId: 'room-1',
        roomType: {
          id: 'room-1',
          name: '标准大床房',
          basePrice: 299,
          capacity: 2,
          amenities: ['免费WiFi', '空调', '独立卫浴']
        },
        checkInDate: updateData.checkInDate,
        checkOutDate: updateData.checkOutDate,
        guests: updateData.guests,
        totalPrice: 1196,
        discountApplied: 'WELCOME10',
        discountAmount: 119.6,
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  }

  static async cancelBooking(bookingId, reason) {
    await delay(1000)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: {
        id: bookingId,
        userId: 'user-1',
        hotelId: 'hotel-1',
        roomId: 'room-1',
        roomType: {
          id: 'room-1',
          name: '标准大床房',
          basePrice: 299,
          capacity: 2,
          amenities: ['免费WiFi', '空调', '独立卫浴']
        },
        checkInDate: '2023-10-01',
        checkOutDate: '2023-10-05',
        guests: 2,
        totalPrice: 1196,
        discountApplied: 'WELCOME10',
        discountAmount: 119.6,
        status: 'CANCELLED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  }

  // 支付相关API
  static async payDeposit(paymentData) {
    await delay(1000)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: {
        id: 'deposit-' + Date.now(),
        bookingId: paymentData.bookingId,
        amount: paymentData.amount,
        paymentMethod: paymentData.paymentMethod,
        transactionId: 'txn_' + Date.now(),
        status: 'COMPLETED',
        createdAt: new Date().toISOString()
      }
    }
  }

  // 入住退房相关API
  static async checkIn(checkInData) {
    await delay(1000)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: {
        id: 'checkin-' + Date.now(),
        bookingId: checkInData.bookingId,
        roomId: 'room-1',
        checkInTime: new Date().toISOString(),
        idNumber: checkInData.idNumber,
        idType: checkInData.idType,
        roomNumber: '808'
      }
    }
  }

  static async changeRoom(checkInId, roomChangeData) {
    await delay(1000)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: {
        id: checkInId,
        bookingId: 'booking-1',
        roomId: roomChangeData.newRoomId,
        checkInTime: new Date().toISOString(),
        idNumber: '110101199003072316',
        idType: 'ID_CARD',
        roomNumber: '808'
      }
    }
  }

  static async checkOut(checkOutData) {
    await delay(1000)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: {
        id: 'checkout-' + Date.now(),
        checkInId: checkOutData.checkInId,
        checkOutTime: new Date().toISOString(),
        totalAmount: 1200,
        paymentStatus: 'PAID',
        invoiceUrl: 'https://api.hotel-system.com/invoices/inv_123456.pdf'
      }
    }
  }

  // 报表相关API
  static async getSalesReport(reportParams) {
    await delay(1000)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: {
        period: `${reportParams.startDate} 至 ${reportParams.endDate}`,
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
    }
  }

  // 管理员相关API
  static async createHotel(hotelData) {
    await delay(1000)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: {
        id: 'hotel-' + Date.now(),
        name: hotelData.name,
        address: hotelData.address,
        phone: hotelData.phone,
        description: hotelData.description,
        rating: 0,
        createdAt: new Date().toISOString()
      }
    }
  }

  static async modifyUserRole(userId, roleData) {
    await delay(1000)
    // 模拟响应
    return {
      code: 0,
      msg: 'success',
      data: {
        id: userId,
        email: 'user@example.com',
        fullName: '测试用户',
        phone: '13800138000',
        userType: roleData.role,
        createdAt: new Date().toISOString()
      }
    }
  }
}

export default ApiService