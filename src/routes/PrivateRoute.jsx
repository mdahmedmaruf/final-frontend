import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/AuthProvider'

export default function PrivateRoute() {
    const { token, loading } = useAuth()

    if (loading) {
        return (
            <div className='h-screen flex items-center justify-center bg-slate-900'>
                <p className='font-nunito font-semibold text-xl text-slate-400'>
                    Loading...
                </p>
            </div>
        )
    }

    if (!token) {
        return <Navigate to={`/login`} replace />
    }

    return <Outlet />
}
