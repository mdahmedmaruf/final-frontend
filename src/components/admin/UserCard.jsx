import { Trash, UserPen } from 'lucide-react'

export default function UserCard({ user, onOpenEditModal, onDelete }) {
    return (
        <div
            key={user.id}
            className='bg-slate-800 border border-slate-700 hover:border-slate-600 flex justify-between items-center transition-all p-4 rounded-xl'
        >
            <div className='flex items-center gap-4'>
                <div className='h-10 w-10 rounded-xl bg-slate-800 border border-slate-700 flex justify-center items-center font-nunito font-bold text-xs text-slate-300'>
                    {user.full_name
                        ? user.full_name.charAt(0).toUpperCase()
                        : 'U'}
                </div>
                <div>
                    <h4 className='font-nunito font-bold text-sm text-slate-200'>
                        {user.full_name}
                    </h4>
                    <p className='font-nunito font-bold text-xs text-slate-200'>
                        {user.email}
                    </p>
                </div>
            </div>
            <div className='flex items-center gap-6'>
                <span className='font-nunito font-bold text-xs text-slate-400 hidden sm:inline'>
                    {user.phone || 'N/A'}
                </span>
                <select
                    defaultValue={user.role}
                    className='font-nunito font-medium text-xs text-slate-200 bg-slate-800 border border-slate-700 rounded-xl py-1.5 px-3 outline-none cursor-pointer focus:border-amber-500 transition-all'
                >
                    <option value='custer'>customer</option>
                    <option value='rider'>rider</option>
                    <option value='admin'>admin</option>
                </select>
                <button onClick={() => onOpenEditModal(user)}>
                    <UserPen size={20} className='text-slate-400' />
                </button>
                <button onClick={() => onDelete(user.id)}>
                    <Trash
                        size={20}
                        className='text-slate-400 cursor-pointer'
                    />
                </button>
            </div>
        </div>
    )
}
