import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthProvider'
import { BASE_URL } from '../services/api'

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((userData) => ({ ...userData, [name]: value }))

        if (errors[name]) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: false }))
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        const newErrors = {
            email: !formData.email,
            password: !formData.password,
        }

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors)
            toast.error('Fill in all required fields')
            return
        }

        setErrors({})
        setSubmitting(true)

        const formBody = new URLSearchParams()
        formBody.append('username', formData.email)
        formBody.append('password', formData.password)

        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody,
            })

            const data = await response.json()

            if (!response.ok)
                throw new Error(data.detail || 'Invalid email or password')

            login(data.access_token)
            toast.success('Login Successful!')
            navigate('/dashboard')
        } catch (error) {
            toast.error(error.message || 'Something went wrong!')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className='h-screen flex items-center justify-center bg-slate-900'>
            <div className='w-full max-w-sm flex flex-col gap-y-8 px-4 sm:px-0'>
                <div className='text-slate-100 font-nunito text-center'>
                    <h1 className='text-2xl md:text-3xl font-extrabold mb-2'>
                        Welcome Back
                    </h1>
                    <p className='text-sm md:text-base'>
                        Sign in to your SwiftParcel account
                    </p>
                </div>
                <form
                    onSubmit={handleLogin}
                    className='bg-slate-800 border border-slate-700 p-6 rounded-2xl flex flex-col gap-y-4'
                >
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
                            placeholder='you@example.com'
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full border bg-slate-800 font-nunito text-sm text-slate-200 rounded-lg py-2.5 px-3 outline-none transition-colors placeholder:text-slate-500 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-amber-500'}`}
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
                            className={`w-full border bg-slate-800 font-nunito text-sm text-slate-200 rounded-lg py-2.5 px-3 outline-none transition-colors placeholder:text-slate-500 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-amber-500'}`}
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={submitting}
                        className='w-full bg-amber-500 hover:bg-amber-400 transition-colors py-2.5 rounded-lg font-nunito font-bold text-sm text-slate-900'
                    >
                        {submitting ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                <p className='font-nunito text-center text-sm text-slate-500'>
                    Don't have an account?{' '}
                    <Link
                        to={`/register`}
                        className='text-amber-400 hover:text-amber-300 font-medium transition-colors'
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}
