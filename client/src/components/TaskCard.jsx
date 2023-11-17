import {useTask} from '../context/TaskContext'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const TaskCard = ({data}) => {

    const {deleteTaskRequest} = useTask()

    const handleDelete = async (id) => {
        if(confirm(`delete task ${data.title}`)){
            deleteTaskRequest(id)
        }
    }

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{data.title}</h1>
                <div className="flex gap-x-2 items-center">
                    <Link to={`/task/${data._id}`} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'>Edit</Link>
                    <button onClick={() => handleDelete(data._id)} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'>Delete</button>
                </div>
            </header>
            <p className="text-slate-300">{data.description}</p>
            <p>{dayjs(data.date).format('DD/MM/YYYY')}</p>
        </div>
    )
}

export default TaskCard