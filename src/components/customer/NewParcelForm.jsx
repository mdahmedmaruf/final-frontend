import { useState } from 'react'
import toast from 'react-hot-toast'
import { BASE_URL } from '../../services/api'

export default function NewParcelForm({ token, setParcels, setShowForm }) {
    const [formData, setFormData] = useState({
        receiver_name: '',
        receiver_phone: '',
        delivery_address: '',
        description: '',
        weight_kg: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleAddParcel = async (e) => {
        e.preventDefault()

        if (
            !formData.receiver_name ||
            !formData.receiver_phone ||
            !formData.delivery_address ||
            !formData.weight_kg
        ) {
            toast.error(
                'Please fill in receiver details, address and parcel weight',
            )
            return
        }

        try {
            const payload = {
                receiver_name: formData.receiver_name,
                receiver_phone: formData.receiver_phone,
                delivery_address: formData.delivery_address,
                description: formData.description,
                weight_kg: parseFloat(formData.weight_kg),
            }
            const response = await fetch(`${BASE_URL}/api/parcels`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            })

            const data = await response.json()
            if (!response.ok)
                throw new Error(
                    data.detail || data.message || 'Failed to add parcel',
                )

            setParcels((prevParcels) => [data, ...prevParcels])
            toast.success('Parcel added successfully!')
            setFormData({
                receiver_name: '',
                receiver_phone: '',
                delivery_address: '',
                description: '',
                weight_kg: '',
            })
            setShowForm(false)
        } catch (error) {
            toast.error(error.message || 'Something went wrong!')
        }
    }

    return (
        <div>
            <h2>New Parcel Request</h2>
            <form
                onSubmit={handleAddParcel}
                className='bg-slate-800 border border-amber-500/30 p-5 rounded-xl w-full space-y-4'
            >
                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-y-2'>
                        <label
                            htmlFor='receiver_name'
                            className='text-slate-400 font-nunito text-xs'
                        >
                            Receiver Name
                        </label>
                        <input
                            type='text'
                            name='receiver_name'
                            id='receiver_name'
                            value={formData.receiver_name}
                            onChange={handleChange}
                            className='w-full border border-slate-700 bg-slat-800 font-nunito text-sm text-slate-200 rounded-lg py-2.5 px-3 outline-none focus:border-amber-500 transition-colors placeholder:text-slate-500'
                        />
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <label
                            htmlFor='receiver_phone'
                            className='text-slate-400 font-nunito text-xs'
                        >
                            Receiver Phone
                        </label>
                        <input
                            type='text'
                            name='receiver_phone'
                            id='receiver_phone'
                            value={formData.receiver_phone}
                            onChange={handleChange}
                            className='w-full border border-slate-700 bg-slat-800 font-nunito text-sm text-slate-200 rounded-lg py-2.5 px-3 outline-none focus:border-amber-500 transition-colors placeholder:text-slate-500'
                        />
                    </div>
                </div>
                <div className='flex-1 flex flex-col gap-y-2'>
                    <label
                        htmlFor='delivery_address'
                        className='text-slate-400 font-nunito text-xs'
                    >
                        Delivery Address
                    </label>
                    <input
                        type='text'
                        name='delivery_address'
                        id='delivery_address'
                        value={formData.delivery_address}
                        onChange={handleChange}
                        className='w-full border border-slate-700 bg-slat-800 font-nunito text-sm text-slate-200 rounded-lg py-2.5 px-3 outline-none focus:border-amber-500 transition-colors placeholder:text-slate-500'
                    />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-y-2'>
                        <label
                            htmlFor='description'
                            className='text-slate-400 font-nunito text-xs'
                        >
                            Contents / Description
                        </label>
                        <input
                            type='text'
                            name='description'
                            id='description'
                            placeholder='write something about the parcel or any guideline'
                            value={formData.description}
                            onChange={handleChange}
                            className='w-full border border-slate-700 bg-slat-800 font-nunito text-sm text-slate-200 rounded-lg py-2.5 px-3 outline-none focus:border-amber-500 transition-colors placeholder:text-slate-500'
                        />
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <label
                            htmlFor='weight_kg'
                            className='text-slate-400 font-nunito text-xs'
                        >
                            Weight
                        </label>
                        <input
                            type='text'
                            name='weight_kg'
                            id='weight_kg'
                            placeholder='e.g.1.5 kg'
                            value={formData.weight_kg}
                            onChange={handleChange}
                            className='w-full border border-slate-700 bg-slat-800 font-nunito text-sm text-slate-200 rounded-lg py-2.5 px-3 outline-none focus:border-amber-500 transition-colors placeholder:text-slate-500'
                        />
                    </div>
                </div>

                <button
                    type='submit'
                    className='w-fit bg-amber-500 hover:bg-amber-400 transition-colors py-2.5 px-6 rounded-lg font-nunito font-bold text-sm text-slate-900 cursor-pointer'
                >
                    Submit Request
                </button>
            </form>
        </div>
    )
}
