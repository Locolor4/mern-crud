import {useForm} from 'react-hook-form'
import {useTask} from '../context/TaskContext'

const TaskFormPage = () => {
    
    const {handleSubmit,register} = useForm()

    const {createTaskRequest,createdTask} = useTask()
    
    const onSubmit = handleSubmit(async (values) => {

        createTaskRequest(values)
    })

    return (
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Title" {...register('title',{required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
                <textarea className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' rows="3" placeholder="Description" {...register('description',{required: true})}></textarea>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default TaskFormPage