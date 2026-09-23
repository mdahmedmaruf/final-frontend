import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthProvider'
import { BASE_URL } from '../../services/api'
import EditUserModal from './EditUserModal'
import UserCard from './UserCard'
import UserFilterBar from './UserFilterBar'
import UserForm from './UserForm'

const FORM_INITIAL_STATE = {
    full_name: '',
    email: '',
    phone: '',
    password: '',
    role: 'customer',
}

export default function UserTab({ allUsers, setAllUsers, loading }) {
    const { token } = useAuth()

    const [roleFilter, setRoleFilter] = useState('all')
    const [showCreateUserForm, setShowCreateUserForm] = useState(false)
    const [userData, setUserData] = useState(FORM_INITIAL_STATE)
    const [editingUser, setEditingUser] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(null)

    const filterUsers = allUsers.filter((user) =>
        roleFilter === 'all' ? true : user.role === roleFilter,
    )

    const handleCreateChange = (e) => {
        const { name, value } = e.target
        setUserData((userData) => ({ ...userData, [name]: value }))
    }

    const handleAddUser = async (e) => {
        e.preventDefault()

        if (!userData.full_name || !userData.email || !userData.password) {
            toast.error('Please fill up all required field!')
            return
        }

        try {
            const response = await fetch(`${BASE_URL}/api/admin/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            })
            const data = await response.json()
            if (!response.ok)
                throw new Error(
                    data.detail || data.message || 'Failed to add user',
                )

            setAllUsers((prevUsers) => [data, ...prevUsers])
            toast.success('User created successfully!')

            setUserData(FORM_INITIAL_STATE)
            setShowCreateUserForm(false)
        } catch (error) {
            toast(error.message || 'Something went wrong!')
        }
    }

    const openEditModal = (user) => {
        setEditingUser(user)
        setIsEditModalOpen(true)
    }

    const handleEditUser = async (userId, updatedFields) => {
        try {
            const response = await fetch(
                `${BASE_URL}/api/admin/users/${userId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedFields),
                },
            )

            const data = await response.json()

            if (!response.ok)
                throw new Error(
                    data.detail || data.message || 'Failed to update user',
                )

            setAllUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === userId ? data : user)),
            )
            toast.success('User updated successfully!')

            setIsEditModalOpen(false)
            setEditingUser(null)
        } catch (error) {
            toast(error.message || 'Something went wrong!')
        }
    }

    const handleDeleteUser = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/api/admin/users/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await response.json()
            if (!response.ok)
                throw new Error(data.detail || 'Failed to delete user')

            setAllUsers((prev) => prev.filter((user) => user.id != id))
            toast.success('User deleted successfully!')
        } catch (error) {
            toast.error(error.message || 'Something went wrong!')
        }
    }

    return (
        <div className='space-y-6'>
            <div className='flex flex-wrap justify-between items-center gap-4'>
                <UserFilterBar
                    allUsers={allUsers}
                    roleFilter={roleFilter}
                    setRoleFilter={setRoleFilter}
                    showCreateUserForm={showCreateUserForm}
                    setShowCreateUserForm={setShowCreateUserForm}
                />
                {showCreateUserForm && (
                    <UserForm
                        userData={userData}
                        onChange={handleCreateChange}
                        onSubmit={handleAddUser}
                    />
                )}
            </div>
            <div className='space-y-4'>
                {loading ? (
                    <p className='font-nunito font-bold text-sm text-slate-400'>
                        Loading...
                    </p>
                ) : filterUsers.length == 0 ? (
                    <p className='font-nunito font-bold text-sm text-slate-400'>
                        No Users found
                    </p>
                ) : (
                    filterUsers.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onOpenEditModal={openEditModal}
                            onDelete={handleDeleteUser}
                        />
                    ))
                )}
            </div>
            <EditUserModal
                isOpen={isEditModalOpen}
                user={editingUser}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditUser}
            />
        </div>
    )
}
