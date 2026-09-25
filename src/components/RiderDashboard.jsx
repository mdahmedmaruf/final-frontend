import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthProvider'
import { BASE_URL } from '../services/api'
import ParcelsCard from './customer/ParcelsCard'

export default function RiderDashboard() {
    const { user, token } = useAuth()

    const [parcels, setParcels] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!token) return

        const fetchRiderParcels = async () => {
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
                console.log('data', data)
            } catch (error) {
                toast.error(error.message || 'Something went wrong!')
            } finally {
                setLoading(false)
            }
        }
        fetchRiderParcels()
    }, [token])

    const handleUpdateStatus = async (parcelId, status) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/parcels/${parcelId}/status`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status }),
                },
            )

            const updatedParcel = await response.json()

            if (!response.ok)
                throw new Error(
                    updatedParcel.detail ||
                        updatedParcel.message ||
                        'Failed to update user',
                )

            setParcels((prev) =>
                prev.map((parcel) =>
                    parcel.id === parcelId ? updatedParcel : parcel,
                ),
            )
            toast.success(`Parcel ${status}!`)
        } catch (error) {
            toast(error.message || 'Something went wrong!')
        }
    }

    return (
        <div className='max-w-3xl mx-auto px-4 py-8 space-y-6'>
            <h2 className='font-nunito font-bold text-2xl text-slate-200'>
                My Delivery
            </h2>
            <div className='space-y-5'>
                {loading ? (
                    <p className='font-nunito font-bold text-sm text-slate-400'>
                        Loading...
                    </p>
                ) : parcels.length === 0 ? (
                    <p className='font-nunito font-bold text-sm text-slate-400'>
                        No assigned deliveries found
                    </p>
                ) : (
                    parcels.map((parcel) => (
                        <ParcelsCard
                            key={parcel.id}
                            parcel={parcel}
                            user={user}
                            onAccept={(id) =>
                                handleUpdateStatus(id, 'accepted')
                            }
                            onReject={(id) =>
                                handleUpdateStatus(id, 'rejected')
                            }
                            onUpdateStatus={handleUpdateStatus}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
