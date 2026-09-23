export default function UserFilterBar({
    allUsers,
    roleFilter,
    setRoleFilter,
    showCreateUserForm,
    setShowCreateUserForm,
}) {
    const customerCount = allUsers.filter(
        (user) => user.role === 'customer',
    ).length
    const riderCount = allUsers.filter((user) => user.role === 'rider').length
    const adminCount = allUsers.filter((user) => user.role === 'admin').length
    return (
        <div className='w-full flex flex-wrap justify-between items-center gap-4'>
            <div className='flex items-center gap-2'>
                <button
                    onClick={() => setRoleFilter('all')}
                    className={`font-nunito font-bold text-xs transition-all rounded-lg px-3 py-1 cursor-pointer ${roleFilter === 'all' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'}`}
                >
                    All Users ({allUsers.length})
                </button>
                <button
                    onClick={() => setRoleFilter('customer')}
                    className={`font-nunito font-bold text-xs transition-all rounded-lg px-3 py-1 cursor-pointer ${roleFilter === 'customer' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'}`}
                >
                    Customer ({customerCount})
                </button>
                <button
                    onClick={() => setRoleFilter('rider')}
                    className={`font-nunito font-bold text-xs transition-all rounded-lg px-3 py-1 cursor-pointer ${roleFilter === 'rider' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'}`}
                >
                    Rider ({riderCount})
                </button>
                <button
                    onClick={() => setRoleFilter('admin')}
                    className={`font-nunito font-bold text-xs transition-all rounded-lg px-3 py-1 cursor-pointer ${roleFilter === 'admin' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'}`}
                >
                    Admin ({adminCount})
                </button>
            </div>
            <div>
                <button
                    onClick={() => setShowCreateUserForm((prev) => !prev)}
                    className='bg-amber-500 hover:bg-amber-400 text-slate-900 font-nunito font-bold text-xs px-4 py-1.5 rounded-lg transition-all cursor-pointer'
                >
                    {showCreateUserForm ? 'Cancel' : 'New User'}
                </button>
            </div>
        </div>
    )
}
