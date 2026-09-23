import { createBrowserRouter } from 'react-router'
import Root from '../layouts/Root'
import Dashboard from '../pages/Dashboard'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import PrivateRoute from './PrivateRoute'

export const router = createBrowserRouter([
    { path: 'login', Component: LoginPage },
    { path: 'register', Component: RegisterPage },

    {
        path: '/',
        Component: Root,
        children: [
            { index: true, Component: LoginPage },
            {
                Component: PrivateRoute,
                children: [{ path: 'dashboard', Component: Dashboard }],
            },
        ],
    },
])
