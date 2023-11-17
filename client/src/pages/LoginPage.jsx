import { useEffect } from 'react'
import {useAuth} from '../context/AuthContext.jsx'
import {useForm} from 'react-hook-form'
import {useNavigate, Link} from 'react-router-dom'

const LoginPage = () => {

    const {isAuthenticated, signIn, errors: registerErrors, clearErrors} = useAuth()
    const navigation = useNavigate()
    const {register,handleSubmit, formState: {
        errors
    }} = useForm()

    useEffect(() => {

        if(isAuthenticated) navigation('/tasks')
        return () => clearErrors()
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signIn(values)
    })

    return (
        <div className='flex h-[100vh] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                {registerErrors.map((e,i) => (
                    <div className='bg-red-500 p-2 text-white text-center' key={i}>
                        {e}
                    </div>
                ))}
                <h1 className='text-2xl font-bold'>Login</h1>
                <form onSubmit={onSubmit}>
                    <input type="email" {...register('email', {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'placeholder='Email' onClick={clearErrors}/>
                    {errors.email && (
                        <p>Email is required</p>
                    )}
                    <input type="password" {...register('password', {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'placeholder='Password' onClick={clearErrors}/>
                    {errors.password && (
                        <p>Password is required</p>
                    )}
                    <button type='submit'>
                        Submit
                    </button>
                </form>
                <p>Don't have an account? <Link to={'/register'} className='font-bold'>Sign In</Link></p>
            </div>
        </div>
    )
}

export default LoginPage