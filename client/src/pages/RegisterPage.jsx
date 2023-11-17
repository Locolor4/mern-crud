import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext.jsx'
import {useNavigate, Link} from 'react-router-dom'
import { useEffect } from 'react'

const RegisterPage = () => {
    
    const {handleSubmit,register, formState: {
        errors
    }} = useForm()
    
    const navigate = useNavigate()
    
    const {signUp, isAuthenticated, errors: registerErrors, clearErrors} = useAuth()
    
    useEffect(() => {

        if(isAuthenticated) navigate('/tasks')

        return () => clearErrors()
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async values => {
        signUp(values)
    })

    return (
        <div className='flex h-[100vh] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                {registerErrors.map((e,i) => (
                    <div className='bg-red-500 text-white' key={i}>
                        {e}
                    </div>
                ))}
                <p className='text-2xl font-bold'>Register</p>
                <form onSubmit={onSubmit}>
                    <input type="text" {...register('username', {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'placeholder='Username' onClick={clearErrors}/>
                    <input type="email" {...register('email', {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'placeholder='Email' onClick={clearErrors}/>
                    <input type="password" {...register('password', {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'placeholder='Password' onClick={clearErrors}/>
                    <button type='submit' className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'>
                        Register
                    </button>
                </form>
                <p>
                    Already have an account? <Link to={'/login'} className='font-bold'>Log In</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage