import AdminDashboard from '../components/AdminDashboard'
import CustomerDashboard from '../components/CustomerDashboard'
import RiderDashboard from '../components/RiderDashboard'
import { useAuth } from '../context/AuthProvider'

export default function Dashboard() {
    const { user } = useAuth()
    // console.log(user?.role)
    return (
        <div className=' bg-slate-900 '>
            {user?.role == 'admin' ? (
                <AdminDashboard />
            ) : user?.role === 'rider' ? (
                <RiderDashboard />
            ) : (
                <CustomerDashboard />
            )}
        </div>
    )
}
