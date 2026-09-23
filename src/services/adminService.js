import { apiRequest } from './api'

export const adminService = {
    getAllUsers: () => apiRequest('/api/admin/users'),

    createUser: (userData) =>
        apiRequest('/api/admin/users', {
            method: 'POST',
            body: JSON.stringify(userData),
        }),

    updateUser: (userId, userData) =>
        apiRequest(`/api/admin/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        }),

    deleteUser: (userId) =>
        apiRequest(`/api/admin/${userId}`, {
            method: 'DELETE',
        }),
}
