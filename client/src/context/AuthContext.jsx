import {createContext, useState, useContext} from 'react'
import {registerRequest} from '../api/auth.js'
import {loginRequest} from '../api/auth.js'

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


    const clearErrors = () => {
        if(errors.length > 0) {
            setErrors([])
        }
    }

    const signUp = async (values) => {

        try {
            const res = await registerRequest(values)
            console.log(res.data);
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
            console.log(res.data);
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {

            console.log(error.response.data);
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.msg])            
        }
    }

    return (
        <AuthContext.Provider value={{
            signUp,
            user,
            isAuthenticated,
            errors,
            signIn,
            clearErrors
        }}>
            {children}
        </AuthContext.Provider>
    )
}