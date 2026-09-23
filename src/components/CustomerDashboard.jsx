import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthProvider'
import { BASE_URL } from '../services/api'
import NewParcelForm from './customer/NewParcelForm'
import ParcelsCard from './customer/ParcelsCard'

export default function CustomerDashboard() {
    const { user, token } = useAuth()

    const [parcels, setParcels] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!token) return

        const fetchCustomerParcels = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/parcels`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                const data = await response.json()
                if (!response.ok)
                    throw new Error(data.detail || 'Failed to load parcels')
                setParcels(data)
            } catch (error) {
                toast.error(error.message || 'Something went wrong!')
            } finally {
                setLoading(false)
            }
        }
        fetchCustomerParcels()
    }, [token])

    console.log(parcels)
    console.log(user)

    return (
        <div className='h-screen max-w-3xl mx-auto px-4 py-8 space-y-6'>
            <div>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='font-nunito font-extrabold text-2xl text-slate-200'>
                            My Parcels
                        </h2>
                        <p className='font-nunito font-semibold text-sm text-slate-400 mt-1'>
                            {parcels.length} total requests
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm((prev) => !prev)}
                        className='bg-amber-500 hover:bg-amber-400 text-slate-900 font-nunito font-bold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer'
                    >
                        {showForm ? 'Cancel' : 'Send Parcel'}
                    </button>
                </div>
                {showForm && (
                    <NewParcelForm
                        token={token}
                        setParcels={setParcels}
                        setShowForm={setShowForm}
                    />
                )}
            </div>
            <div className='space-y-4'>
                {loading ? (
                    <p className='font-nunito font-semibold text-sm text-slate-400'>
                        Loading your parcels...
                    </p>
                ) : parcels.length === 0 ? (
                    <p className='font-nunito font-semibold text-sm text-slate-400'>
                        No Parcel Request Found
                    </p>
                ) : (
                    parcels.map((parcel) => (
                        <ParcelsCard
                            key={parcel.id}
                            parcel={parcel}
                            user={user}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
