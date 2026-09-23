import { Outlet } from 'react-router'
import Header from '../components/Header'

export default function Root() {
    return (
        <div className='bg-slate-900'>
            <Header />
            <Outlet />
        </div>
    )
}
