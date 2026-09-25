import { Bike, Cuboid, UserCog } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthProvider'

export default function Header() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    console.log(user)

    const handleLogOut = () => {
        logout()
        navigate('/login')
    }
    return (
        <div className='fixed left-0 w-full'>
            <div className='container mx-auto px-6'>
                <div className='flex justify-between items-center py-5'>
                    <Link
                        to={`/`}
                        className='text-slate-200 font-nunito text-lg font-light'
                    >
                        Swift<span className='font-black'>Parcel</span>
                    </Link>
                    <nav>
                        {user ? (
                            <div className='text-slate-200 font-nunito text-lg font-light flex items-center gap-4'>
                                <div className='flex items-center gap-3 font-nunito text-sm bg-slate-800 border border-slate-700 py-1.5 px-4 rounded-md'>
                                    <p className='flex items-center gap-1.5 bg-slate-600 border border-slate-500 py-0.5 px-2 rounded-sm'>
                                        <span>
                                            {user.role === 'admin' ? (
                                                <UserCog size={16} />
                                            ) : user.role === 'customer' ? (
                                                <Cuboid size={16} />
                                            ) : (
                                                <Bike size={16} />
                                            )}
                                        </span>{' '}
                                        {user.full_name || 'User'}
                                    </p>
                                    <p>|</p>
                                    <p className='font-nunito font-black text-xs uppercase'>
                                        {user.role}
                                    </p>
                                </div>
                                <button
                                    onClick={handleLogOut}
                                    className='font-nunito text-base cursor-pointer'
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className='flex items-center gap-3 text-slate-200 font-nunito text-lg font-light'>
                                <Link
                                    to={`/register`}
                                    className='bg-amber-500 hover:bg-amber-400 transition-colors py-2 px-3 rounded-lg font-nunito font-bold text-sm text-slate-900'
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    )
}
