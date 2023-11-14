import {createContext, useState, useContext} from 'react'
import {registerRequest} from '../api/auth.js'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)

    const signUp = async (values) => {

        const res = await registerRequest(values)
        setUser(res.data)
    }

    return (
        <AuthContext.Provider value={{
            signUp,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}