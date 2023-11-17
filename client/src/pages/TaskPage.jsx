import { useEffect } from 'react'
import { useTask } from '../context/TaskContext'

const TaskPage = () => {

    const {getTasksRequest, tasks} = useTask()

    useEffect(() => {

        getTasksRequest()
    }, [])


    if(tasks.length <= 0) return <h1>No tasks</h1>

    return (
        <div>
            {tasks.map( (item,i) => (
                <div key={i}>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <a className=''>Edit</a> <a>DELETE</a>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default TaskPage