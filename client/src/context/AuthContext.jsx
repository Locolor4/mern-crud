import {createContext, useState, useContext, useEffect} from 'react'
import {registerRequest,loginRequest,verifyToken,logoutRequest} from '../api/auth.js'
import Cookies from 'js-cookie'

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
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)


    const clearErrors = () => {
        if(errors.length > 0) {
            setErrors([])
        }
    }

    const signUp = async (values) => {

        try {
            const res = await registerRequest(values)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error);
            setErrors(error.response.data)
        }
    }

    const signIn = async (values) => {
        try {

            const res = await loginRequest(values)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {

            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.msg])            
        }
    }

    const signOut = async () => {
        
        try {
            const res = await logoutRequest()
            if(res.status === 200) {
                setIsAuthenticated(false)
                setUser(null)
                return 200
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get()
            if(!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                return;
            }

            try {
                const res = await verifyToken(cookies.token)
                // if(!res.data) return setIsAuthenticated(false)
                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                setIsAuthenticated(false)
                setLoading(false)
            }
        }

        checkLogin()
    }, [])

    return (
        <AuthContext.Provider value={{
            signUp,
            user,
            isAuthenticated,
            errors,
            signIn,
            clearErrors,
            loading,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}