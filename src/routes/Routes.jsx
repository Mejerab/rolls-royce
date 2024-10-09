import {
    createBrowserRouter,
} from "react-router-dom";
import '../index.css'
import Roots from "../Roots/Roots";
import SignUp from "../Users/SignIn";
import Login from "../Users/Login";
import Home from "../Pages/Home/Home";

import CarDetails from "../Pages/CarDetails";
import CarOrder from "../Pages/CarOrder";
import PrivateRoute from "./PrivateRoute";
import MyOrder from "../Pages/MyOrder";
import OrderDetails from "../Pages/OrderDetails";
import Cars from "../Pages/Cars";
import ConfirmPayment from "../Pages/payments/ConfirmPayment";
import OrderHistory from "../Pages/OrderHistory";
import About from "../Pages/About";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Roots></Roots>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/our-cars/:page',
                element: <Cars></Cars>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/car-details/:id',
                element: <CarDetails />
            },
            {
                path: '/car-order/:id',
                element: <PrivateRoute><CarOrder /></PrivateRoute>
            },
            {
                path: '/my-orders',
                element: <PrivateRoute><MyOrder /></PrivateRoute>
            },
            {
                path: '/order-details/:id',
                element: <PrivateRoute><OrderDetails /></PrivateRoute>
            },
            {
                path: '/confirm-payment',
                element: <PrivateRoute><ConfirmPayment /></PrivateRoute>
            },
            {
                path: '/order-history',
                element: <PrivateRoute><OrderHistory /></PrivateRoute>
            },
            {
                path: '/about',
                element: <About />
            }
        ]
    }
]);
export default router;