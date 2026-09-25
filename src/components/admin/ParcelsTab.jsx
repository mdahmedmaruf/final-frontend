import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthProvider'
import { BASE_URL } from '../../services/api'
import ParcelsCard from '../customer/ParcelsCard'

export default function ParcelsTab() {
    const { user, token } = useAuth()
    const [parcels, setParcels] = useState([])
    const [riders, setRiders] = useState([])
    const [statusFilter, setStatusFilter] = useState('all')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!token) return

        const fetchData = async () => {
            try {
                const parcelsResponse = await fetch(`${BASE_URL}/api/parcels`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })

                const parcelData = await parcelsResponse.json()

                if (!parcelsResponse.ok)
                    throw new Error(
                        parcelData.detail || 'Failed to load parcels',
                    )
                setParcels(parcelData)
            } catch (error) {
                toast.error(error.message || 'Something went wrong!')
            }

            try {
                const ridersResponse = await fetch(
                    `${BASE_URL}/api/admin/users`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )

                const userData = await ridersResponse.json()

                if (!ridersResponse.ok)
                    throw new Error(userData.detail || 'Failed to load riders')
                const filteredRiders =
                    userData?.filter?.((user) => user.role === 'rider') || []
                setRiders(filteredRiders)
            } catch (error) {
                toast.error(error.message || 'Something went wrong!')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [token])

    const handleApprove = async (parcelId) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/parcels/${parcelId}/approve`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            )

            const updatedParcel = await response.json()

            if (!response.ok)
                throw new Error(
                    updatedParcel.detail || 'Failed to approve parcel',
                )
            setParcels((prev) =>
                prev.map((parcel) =>
                    parcel.id === parcelId ? updatedParcel : parcel,
                ),
            )
            toast.success('Parcel request approved!')
        } catch (error) {
            toast.error(error.message || 'Something went wrong!')
        }
    }

    const handleAssign = async (parcelId, riderId) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/parcels/${parcelId}/assign`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ rider_id: riderId }),
                },
            )

            const updatedParcel = await response.json()

            if (!response.ok)
                throw new Error(
                    updatedParcel.detail || 'Failed to assign rider',
                )
            setParcels((prev) =>
                prev.map((parcel) =>
                    parcel.id === parcelId ? updatedParcel : parcel,
                ),
            )
            toast.success('Rider assigned successfully!')
        } catch (error) {
            toast.error(error.message || 'Something went wrong!')
        }
    }

    const pendingCount = parcels.filter(
        (parcel) => parcel.status === 'pending',
    ).length
    const outForDeliveryCount = parcels.filter(
        (parcel) => parcel.status === 'out_for_delivery',
    ).length
    const deliveredCount = parcels.filter(
        (parcel) => parcel.status === 'delivered',
    ).length

    const filteredParcels = parcels.filter((parcel) =>
        statusFilter === 'all'
            ? true
            : parcel.status?.toLowerCase() === statusFilter,
    )

    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                <div className='bg-slate-800 border border-slate-700 p-6 rounded-2xl'>
                    <h3 className='font-nunito font-bold text-3xl text-slate-400'>
                        {parcels.length}
                    </h3>
                    <p className='font-nunito font-medium text-base text-slate-300'>
                        All Parcels
                    </p>
                </div>
                <div className='bg-slate-800 border border-slate-700 p-6 rounded-2xl'>
                    <h3 className='font-nunito font-bold text-3xl text-slate-300'>
                        {pendingCount}
                    </h3>
                    <p className='font-nunito font-medium text-base text-slate-300'>
                        Pending
                    </p>
                </div>
                <div className='bg-slate-800 border border-slate-700 p-6 rounded-2xl'>
                    <h3 className='font-nunito font-bold text-3xl text-slate-300'>
                        {outForDeliveryCount}
                    </h3>
                    <p className='font-nunito font-medium text-base text-slate-300'>
                        Out for Delivery
                    </p>
                </div>
                <div className='bg-slate-800 border border-slate-700 p-6 rounded-2xl'>
                    <h3 className='font-nunito font-bold text-3xl text-slate-300'>
                        {deliveredCount}
                    </h3>
                    <p className='font-nunito font-medium text-base text-slate-300'>
                        Delivered
                    </p>
                </div>
            </div>

            <div className='space-y-4 mt-8'>
                {loading ? (
                    <p className='font-nunito font-bold text-sm text-slate-400'>
                        Loading...
                    </p>
                ) : filteredParcels.length === 0 ? (
                    <p className='font-nunito font-bold text-sm text-slate-400'>
                        No parcel found
                    </p>
                ) : (
                    filteredParcels.map((parcel) => (
                        <ParcelsCard
                            key={parcel.id}
                            parcel={parcel}
                            user={user}
                            allRiders={riders}
                            onApprove={handleApprove}
                            onAssign={handleAssign}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
