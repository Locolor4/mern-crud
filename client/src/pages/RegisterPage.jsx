import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext.jsx'

const RegisterPage = () => {
    
    const {handleSubmit,register} = useForm()
    
    const {signUp, user} = useAuth()

    console.log(user);

    const onSubmit = handleSubmit(async values => {
        signUp(values)
    })

    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
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