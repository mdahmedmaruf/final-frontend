import { createContext, useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../services/api'

const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(
        localStorage.getItem('access_token') || null,
    )
    const [loading, setLoading] = useState(true)

    const login = (accessToken) => {
        localStorage.setItem('access_token', accessToken)
        setToken(accessToken)
    }

    const logout = () => {
        localStorage.removeItem('access_token')
        setToken(null)
        setUser(null)
    }

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setUser(null)
                setLoading(false)
                return
            }

            try {
                const response = await fetch(`${BASE_URL}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (response.ok) {
                    const data = await response.json()
                    setUser(data)
                } else {
                    logout()
                }
            } catch (error) {
                console.error('failed to fetch', error)
                logout()
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [token])

    const values = { user, token, login, logout, loading }
    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('auth must be inside AuthProvider')

    return context
}
