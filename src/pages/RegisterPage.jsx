import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import { BASE_URL } from '../services/api'

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        role: 'customer',
    })
    const Navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((userData) => ({ ...userData, [name]: value }))
    }

    const handleRegisterUser = async (e) => {
        e.preventDefault()

        if (
            !formData.full_name ||
            !formData.email ||
            !formData.phone ||
            !formData.password
        ) {
            toast.error('Fill in all required fields')
            return
        }

        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await response.json()

            if (!response.ok)
                throw new Error(
                    data.detail ||
                        data.message ||
                        'Failed to registration user',
                )

            toast.success('Registration Successful!')
            setFormData({
                full_name: '',
                email: '',
                phone: '',
                password: '',
                role: 'customer',
            })
            Navigate('/login')
        } catch (error) {
            toast.error(error.message || 'Something went wrong!')
        }
    }
    return (
        <div className='h-screen flex items-center justify-center bg-slate-900'>
            <div className='w-full max-w-sm flex flex-col gap-y-8 px-4 sm:px-0'>
                <div className='text-slate-100 font-nunito text-center'>
                    <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
                        Create account
                    </h1>
                    <p className='text-sm md:text-base'>
                        Join SwiftParcel today
                    </p>
                </div>
                <form
                    onSubmit={handleRegisterUser}
                    className='bg-slate-800 border border-slate-700 p-6 rounded-2xl flex flex-col gap-y-4'
                >
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
                            value={formData.full_name}
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
                            value={formData.email}
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
                            value={formData.phone}
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
                        <input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='••••••••'
                            value={formData.password}
                            onChange={handleChange}
                            className='w-full border border-slate-700 bg-slat-800 font-nunito text-sm text-slate-200 rounded-lg py-2.5 px-3 outline-none focus:border-amber-500 transition-colors placeholder:text-slate-500'
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-amber-500 hover:bg-amber-400 transition-colors py-2.5 rounded-lg font-nunito font-bold text-sm text-slate-900'
                    >
                        Create Account
                    </button>
                </form>
                <p className='font-nunito text-center text-sm text-slate-500'>
                    Already have an account?{' '}
                    <Link
                        to={`/login`}
                        className='text-amber-400 hover:text-amber-300 font-medium transition-colors'
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
