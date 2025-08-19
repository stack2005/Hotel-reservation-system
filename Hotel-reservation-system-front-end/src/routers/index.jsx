import App from "../App";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Hotels from "../pages/Hotels";
import HotelDetails from "../pages/HotelDetails";
import Bookings from "../pages/Bookings";
import BookingDetails from "../pages/BookingDetails";
import Payment from "../pages/Payment";
import Admin from "../pages/Admin";
import CheckInCheckOut from "../pages/CheckInCheckOut";
import Reports from "../pages/Reports";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Layout />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/hotels",
                element: <Hotels />
            },
            {
                path: "/hotels/:hotelId",
                element: <HotelDetails />
            },
            {
                path: "/bookings",
                element: <Bookings />
            },
            {
                path: "/bookings/:bookingId",
                element: <BookingDetails />
            },
            {
                path: "/payment/:bookingId",
                element: <Payment />
            },
            {
                path: "/admin",
                element: <Admin />
            },
            {
                path: "/checkin-checkout",
                element: <CheckInCheckOut />
            },
            {
                path: "/reports",
                element: <Reports />
            }
        ]
    }
]);

export default router;