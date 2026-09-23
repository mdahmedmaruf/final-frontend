import { apiRequest } from './api'

export const authService = {
    login: async (email, password) => {
        const formData = new URLSearchParams()
        formData.append('username', email)
        formData.append('password', password)

        const data = await apiRequest('/auth/login', {
            method: 'POST',
            Headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData,
        })

        if (data.access_token) {
            localStorage.setItem('access_token', data.access_token)
        }
        return data
    },
    register: (userData) =>
        apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        }),
    logout: () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_role')
    },
}
