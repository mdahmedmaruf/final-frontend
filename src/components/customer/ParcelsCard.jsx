import { useState } from 'react'

export default function ParcelsCard({
    parcel,
    user,
    allRiders = [],
    onApprove,
    onAssign,
    onAccept,
    onReject,
    onUpdateStatus,
}) {
    console.log('parcel object', parcel)
    console.log('ParcelSender', parcel?.sender)
    const [selectedRiderId, setSelectedRiderId] = useState('')

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return 'bg-blue-500/30 text-blue-400 border-blue-500/30'
            case 'assigned':
                return 'bg-purple-500/30 text-purple-400 border-purple-500/30'
            case 'accepted':
                return 'bg-cyan-500/30 text-cyan-400 border-cyan-500/30'
            case 'rejected':
            case 'failed':
            case 'cancelled':
                return 'bg-red-500/30 text-red-400 border-red-500/30'
            case 'picked_up':
                return 'bg-teal-500/30 text-teal-400 border-teal-500/30'
            case 'out_for_delivery':
                return 'bg-orange-500/30 text-orange-400 border-orange-500/30'
            case 'delivered':
                return 'bg-green-500/30 text-green-400 border-green-500/30'
            default:
                return 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
        }
    }

    return (
        <div className='border border-slate-700 bg-slate-800 p-5 rounded-lg'>
            <div className='flex items-center justify-between border-b border-slate-700 pb-5'>
                <div>
                    <div className='flex items-center gap-4'>
                        <span className='font-nunito text-xs uppercase text-amber-500'>
                            {parcel.tracking_number}
                        </span>
                        <span
                            className={`font-nunito font-semibold py-1 px-2 text-xs capitalize rounded-sm ${getStatusStyle(parcel.status)}`}
                        >
                            {parcel.status}
                        </span>
                    </div>
                    <div className='flex items-center gap-4 mt-2'>
                        <p className='font-nunito text-sm text-slate-300'>
                            {parcel.description}
                        </p>
                        <p className='font-nunito text-xs text-slate-500'>
                            {parcel.weight_kg} kg
                        </p>
                    </div>
                </div>
                <div>
                    <p className='font-nunito text-xs uppercase text-amber-500'>
                        Request
                    </p>
                    <p className='font-nunito text-sm text-slate-300'>
                        {parcel.created_at
                            ? new Date(parcel.created_at).toLocaleString(
                                  'en-US',
                                  { dateStyle: 'short', timeStyle: 'short' },
                              )
                            : 'N/A'}
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-y-4 pt-5'>
                <div>
                    <p className='font-nunito font-semibold text-xs text-slate-500 mb-1'>
                        From
                    </p>
                    <p className='font-nunito text-sm text-slate-300'>
                        {parcel.sender?.full_name
                            ? `${parcel.sender?.full_name} - ${parcel.sender?.phone}`
                            : 'N/A'}
                    </p>
                </div>
                <div>
                    <p className='font-nunito font-semibold text-xs text-slate-500 mb-1'>
                        Receiver
                    </p>
                    <p className='font-nunito text-sm text-slate-300'>
                        {parcel.receiver_name} - {parcel.receiver_phone}
                    </p>
                </div>
                <div>
                    <p className='font-nunito font-semibold text-xs text-slate-500 mb-1'>
                        Delivery Address
                    </p>
                    <p className='font-nunito text-sm text-slate-300'>
                        {parcel.delivery_address}
                    </p>
                </div>
                <div>
                    <p className='font-nunito font-semibold text-xs text-slate-500 mb-1'>
                        Last Update
                    </p>
                    <p className='font-nunito text-sm text-slate-300'>
                        {parcel.updated_at
                            ? new Date(parcel.updated_at).toLocaleString(
                                  'en-US',
                                  { dateStyle: 'short', timeStyle: 'short' },
                              )
                            : 'N/A'}
                    </p>
                </div>
            </div>
            {user?.role === 'admin' && (
                <div className='pt-4 mt-4 border-t border-slate-700 flex items-center gap-4'>
                    {parcel.status === 'pending' && (
                        <button
                            onClick={() => onApprove(parcel.id)}
                            className='font-nunito font-bold text-sm bg-blue-500 py-1 px-3 text-slate-200 rounded-md cursor-pointer'
                        >
                            Approve Request
                        </button>
                    )}
                    {parcel.status === 'approved' && (
                        <div className='flex items-center gap-2'>
                            <select
                                value={selectedRiderId}
                                onChange={(e) =>
                                    setSelectedRiderId(e.target.value)
                                }
                                className='font-nunito font-medium text-xs text-slate-200 bg-slate-800 border border-slate-700 rounded-xl py-1.5 px-3 outline-none cursor-pointer focus:border-amber-500 transition-all'
                            >
                                <option value=''>Select Rider</option>
                                {allRiders.map((rider) => (
                                    <option key={rider.id} value={rider.id}>
                                        {rider.full_name}
                                    </option>
                                ))}
                            </select>
                            <button
                                disabled={!selectedRiderId}
                                onClick={() =>
                                    onAssign(parcel.id, selectedRiderId)
                                }
                                className='font-nunito font-bold text-sm bg-teal-500 py-1 px-3 text-slate-200 rounded-md cursor-pointer'
                            >
                                Assign Rider
                            </button>
                        </div>
                    )}
                </div>
            )}

            {user?.role === 'rider' && (
                <div>
                    {parcel.status === 'assigned' && (
                        <div className='mt-6 flex items-center gap-2'>
                            <button
                                onClick={() => onAccept(parcel.id)}
                                className='font-nunito font-bold text-sm text-slate-200 bg-blue-700/30 py-1 px-3 rounded-md cursor-pointer'
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => onReject(parcel.id)}
                                className='font-nunito font-bold text-sm text-slate-200 bg-red-700 py-1 px-3 rounded-md cursor-pointer'
                            >
                                Reject
                            </button>
                        </div>
                    )}
                    {[
                        'accepted',
                        'picked_up',
                        'out_for_delivery',
                        'delivered',
                    ].includes(parcel.status) && (
                        <div className='pt-5 mt-5 border-t border-slate-700'>
                            <h2 className='font-nunito font-semibold text-xs text-slate-200 pb-3'>
                                Update Delivery Status:
                            </h2>
                            <select
                                value={parcel.status}
                                onChange={(e) =>
                                    onUpdateStatus(parcel.id, e.target.value)
                                }
                                className='font-nunito font-medium text-xs text-slate-200 bg-slate-800 border border-slate-700 rounded-xl py-1.5 px-3 outline-none cursor-pointer focus:border-amber-500 transition-all'
                            >
                                <option
                                    value=''
                                    disabled
                                    className='font-nunito text-xs uppercase'
                                >
                                    Select One
                                </option>
                                <option value='picked_up'>Picked Up</option>
                                <option value='out_for_delivery'>
                                    Out For Delivery
                                </option>
                                <option value='delivered'>Delivered</option>
                                <option value='failed'>Failed</option>
                            </select>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
