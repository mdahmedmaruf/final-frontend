import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthProvider'
import { BASE_URL } from '../services/api'
import ParcelsTab from './admin/ParcelsTab'
import UsersTab from './admin/UsersTab'

export default function AdminDashboard() {
    const [allUsers, setAllUsers] = useState([])
    const [allParcels, setAllParcels] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('parcels')

    const { user, token } = useAuth()

    useEffect(() => {
        if (user?.role !== 'admin' || !token) return

        const fetchDashboardData = async () => {
            try {
                const usersResponse = await fetch(
                    `${BASE_URL}/api/admin/users`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )

                const userData = await usersResponse.json()
                if (!usersResponse.ok)
                    throw new Error(userData.detail || 'Failed to load users')

                setAllUsers(userData)
            } catch (error) {
                toast.error(`Users: ${error.message}`)
            } finally {
                setLoading(false)
            }

            try {
                const parcelsResponse = await fetch(`${BASE_URL}/api/parcels`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })

                const parcelsData = await parcelsResponse.json()
                if (!parcelsResponse.ok)
                    throw new Error(
                        parcelsData.detail || 'Failed to load parcels',
                    )

                setAllParcels(parcelsData)
            } catch (error) {
                toast.error(`Parcels: ${error.message}`)
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [token, user])

    // console.log(allParcels)

    return (
        <div className='max-w-3xl mx-auto px-4 py-8'>
            <div className='flex flex-col mb-6'>
                <h2 className='font-nunito font-extrabold text-2xl text-slate-200'>
                    AdminDashboard
                </h2>
                <p className='font-nunito font-medium text-base text-slate-300'>
                    Manage all parcel requests across customers and users
                </p>
            </div>
            <div className='flex items-center gap-2 bg-slate-800 border border-slate-700 p-1 rounded-lg w-fit my-8'>
                <button
                    onClick={() => setActiveTab('parcels')}
                    className={`px-5 py-2 rounded-lg text-sm font-nunito font-bold transition-all cursor-pointer ${activeTab === 'parcels' ? 'bg-amber-500 text-slate-900' : 'text-slate-400 hover:text-slate-200'}`}
                >
                    Parcels{' '}
                    <span className='ml-1 text-xs font-extrabold opacity-80'>
                        {allParcels.length}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    className={`px-5 py-2 rounded-lg text-sm font-nunito font-bold transition-all cursor-pointer ${activeTab === 'users' ? 'bg-amber-500 text-slate-900' : 'text-slate-400 hover:text-slate-200'}`}
                >
                    Users{' '}
                    <span className='ml-1 text-xs font-extrabold opacity-80'>
                        {allUsers.length}
                    </span>
                </button>
            </div>
            {activeTab === 'parcels' ? (
                <ParcelsTab
                    allParcels={allParcels}
                    setAllParcels={setAllParcels}
                    allUsers={allUsers}
                    loading={loading}
                />
            ) : (
                <UsersTab
                    allUsers={allUsers}
                    setAllUsers={setAllUsers}
                    loading={loading}
                />
            )}
        </div>
    )
}
