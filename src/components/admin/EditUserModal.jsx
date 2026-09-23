import { Eye, EyeOff, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function EditUserModal({ isOpen, user, onClose, onSubmit }) {
    const [userData, setUserData] = useState({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        role: 'customer',
    })
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (user) {
            setUserData({
                full_name: user.full_name || '',
                email: user.email || '',
                phone: user.phone || '',
                password: '',
                role: user.role || 'customer',
            })
        }
    }, [user])

    if (!isOpen) return null

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(user.id, userData)
    }

    return (
        <div className='fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4'>
            <form
                onSubmit={handleSubmit}
                className='max-w-3xl bg-slate-800 border border-amber-500/30 p-5 rounded-xl w-full space-y-4'
            >
                <div className='flex items-center justify-between'>
                    <h2 className='font-nunito font-bold text-2xl text-slate-200'>
                        Edit User Details
                    </h2>
                    <button
                        onClick={onClose}
                        className='text-slate-400 cursor-pointer'
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-y-2'>
                        <label
                            htmlFor='full_name'
                            className='text-slate-400 font-nunito text-xs'
                        >
                            Full Name
                        </label>
                        <input
                            type='text'
                            name='full_name'
                            id='full_name'
                            placeholder='Your Full Name'
                            value={userData.full_name}
                            onChange={handleChange}
                            className='w-full border border-slate-700 bg-slat-800 font-nunito text-sm text-slate-200 rounded-lg py-2.5 px-3 outline-none focus:border-amber-500 transition-colors placeholder:text-slate-500'
                        />
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <label
                            htmlFor='email'
                            className='text-slate-400 font-nunito text-xs'
                        >
                            Email Address
                        </label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='john@example.com'
                            value={userData.email}
                            onChange={handleChange}
                            className='w-full border border-slate-700 bg-slat-800 font-nunito text-sm text-slate-200 rounded-lg py-2.5 px-3 outline-none focus:border-amber-500 transition-colors placeholder:text-slate-500'
                        />
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <label
                            htmlFor='phone'
                            className='text-slate-400 font-nunito text-xs'
                        >
                            Phone
                        </label>
                        <input
                            type='text'
                            name='phone'
                            id='phone'
                            placeholder='01X-XXXXXXXX'
                            value={userData.phone}
                            onChange={handleChange}
                            className='w-full border border-slate-700 bg-slat-800 font-nunito text-sm text-slate-200 rounded-lg py-2.5 px-3 outline-none focus:border-amber-500 transition-colors placeholder:text-slate-500'
                        />
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <label
                            htmlFor='password'
                            className='text-slate-400 font-nunito text-xs'
                        >
                            Password
                        </label>
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                id='password'
                                placeholder='Leave blank to keep'
                                value={userData.password}
                                onChange={handleChange}
                                className='w-full border border-slate-700 bg-slat-800 font-nunito text-sm text-slate-200 rounded-lg py-2.5 px-3 outline-none focus:border-amber-500 transition-colors placeholder:text-slate-500'
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer'
                            >
                                {showPassword ? (
                                    <EyeOff size={14} />
                                ) : (
                                    <Eye size={14} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-fit'>
                    <label
                        htmlFor='role'
                        className='text-slate-400 font-nunito text-xs block mb-2'
                    >
                        Role
                    </label>
                    <div className='grid grid-cols-3 gap-2 mb-3'>
                        {['customer', 'rider', 'admin'].map((roleOption) => (
                            <label
                                key={roleOption}
                                className={`cursor-pointer py-2 px-4 rounded-lg font-nunito text-center text-xs font-medium border transition-all capitalize ${userData.role === roleOption ? 'border-amber-500 text-amber-400 bg-amber-500/10' : 'border-slate-600 text-slate-400 hover:border-slate-500'} `}
                            >
                                <input
                                    type='radio'
                                    name='role'
                                    id='role'
                                    className='sr-only'
                                    checked={userData.role === roleOption}
                                    value={roleOption}
                                    onChange={handleChange}
                                />
                                <span className=''>{roleOption}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type='submit'
                    className='w-fit bg-amber-500 hover:bg-amber-400 transition-colors py-2.5 px-6 rounded-lg font-nunito font-bold text-sm text-slate-900 cursor-pointer'
                >
                    Save Changes
                </button>
            </form>
        </div>
    )
}
