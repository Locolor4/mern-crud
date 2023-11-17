import {useForm} from 'react-hook-form'
import {useTask} from '../context/TaskContext'
import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const TaskFormPage = () => {
    
    const {handleSubmit,register,setValue} = useForm()
    const {createTaskRequest,getTaskRequest,updateTaskRequest} = useTask()
    const params = useParams()

    const navigate = useNavigate()
    
    const onSubmit = handleSubmit(async (values) => {

        if(params.id) {
            const data = {...values, _id: params.id, date: values.date ? dayjs.utc(values.date).format() : dayjs.utc().format()}
            updateTaskRequest(data)
        } else {
            createTaskRequest({
                ...values,
                date: values.date ? dayjs.utc(values.date).format() : dayjs.utc().format()
            })
        }
        navigate('/tasks')
    })

    useEffect(() => {

        
        if(params.id) {
            
            const getEditData = async () => {
                try {
                    const data = await getTaskRequest(params.id)
                    setValue('title', data.title)
                    setValue('description', data.description)
                    setValue('date', dayjs(data.date).utc().format('YYYY-MM-DD'))
                } catch (error) {
                    console.log(error);
                }
            }

            getEditData()
        }
    }, [])

    return (
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Title" {...register('title',{required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
                <textarea className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' rows="3" placeholder="Description" {...register('description',{required: true})}></textarea>
                <label type='date' htmlFor="date">Date</label>
                <input type="date" placeholder="Title" {...register('date',{required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
                {params.id ? (
                    <button type='submit'>Edit</button>
                ) : (
                    <button type='submit'>Submit</button>
                )}
            </form>
        </div>
    )
}

export default TaskFormPage