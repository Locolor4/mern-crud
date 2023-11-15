import { useEffect } from 'react'
import {useAuth} from '../context/AuthContext.jsx'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {

    const {isAuthenticated, signIn, errors: registerErrors} = useAuth()
    const navigation = useNavigate()
    const {register,handleSubmit, formState: {
        errors
    }} = useForm()

    useEffect(() => {

        if(isAuthenticated) navigation('/profile')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signIn(values)
    })

    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            {registerErrors.map((e,i) => (
                <div className='bg-red-500 text-white' key={i}>
                    {e}
                </div>
            ))}
            <form onSubmit={onSubmit}>
                <input type="email" {...register('email', {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'placeholder='Email'/>
                <input type="password" {...register('password', {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'placeholder='Password'/>
                <button type='submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default LoginPage