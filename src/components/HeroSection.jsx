import { Link } from 'react-router'

export default function HeroSection() {
    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='flex flex-col justify-center items-center gap-4'>
                <p className='font-nunito text-sm font-medium py-1.5 px-4 rounded-lg text-amber-400 bg-amber-500/20 border border-amber-500 w-fit'>
                    Fast-Reliable-Trackable
                </p>
                <h1 className='font-nunito font-extrabold text-xl md:text-5xl text-center text-slate-200 leading-18'>
                    Courier Delivery, <br />{' '}
                    <span className='text-amber-500'>Simplified.</span>
                </h1>
                <p className='font-nunito text-lg text-slate-200 text-center'>
                    SwiftParcel connects customers, riders, and admins in one{' '}
                    <br />
                    clean platform. Send parcels, track status, and manage{' '}
                    <br />
                    deliveries — all in real time.
                </p>
                <Link
                    to={`/login`}
                    className='font-nunito font-bold text-lg bg-amber-500 text-slate-900 rounded-xl px-6 py-2'
                >
                    Get Started - it's free
                </Link>
            </div>
        </div>
    )
}
