import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext.jsx'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

const RegisterPage = () => {
    
    const {handleSubmit,register, formState: {
        errors
    }} = useForm()
    
    const navigate = useNavigate()
    
    const {signUp, isAuthenticated, errors: registerErrors} = useAuth()
    
    useEffect(() => {

        if(isAuthenticated) navigate('/tasks')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async values => {
        signUp(values)
    })

    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            {/* {registerErrors.map((e,i) => (
                <div className='bg-red-500 text-white' key={i}>
                    {e}
                </div>
            ))} */}
            <form onSubmit={onSubmit}>
                <input type="text" {...register('username', {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'placeholder='Username'/>
                <input type="email" {...register('email', {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'placeholder='Email'/>
                <input type="password" {...register('password', {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'placeholder='Password'/>
                <button type='submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default RegisterPage