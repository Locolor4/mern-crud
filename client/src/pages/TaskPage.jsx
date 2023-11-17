import { useEffect } from 'react'
import { useTask } from '../context/TaskContext'
import TaskCard from '../components/TaskCard'

const TaskPage = () => {

    const {getTasksRequest, tasks} = useTask()

    useEffect(() => {

        getTasksRequest()
    }, [])


    if(tasks.length <= 0) return <h1>No tasks</h1>

    return (
        <div className='grid sm:grid-cols-3 grid-cols-1 gap-2'>
            {tasks.map( (item,i) => (
                <TaskCard data={item} key={i}/>
            ))}
        </div>
    )
}

export default TaskPage