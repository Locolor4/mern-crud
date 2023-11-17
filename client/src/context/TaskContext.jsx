import {useContext, createContext, useState} from 'react'
import {createTask, getTasks} from '../api/tasks.js'

export const TaskContext = createContext()

export const useTask = () => {
    const context = useContext(TaskContext)
    if(!context) {
        throw new Error('Context must be within a provider')
    }
    return context
}

export const TaskProvider = ({children}) => {
    
    const [createdTask, setCreatedTask] = useState([])
    const [tasks, setTasks] = useState([])

    const getTasksRequest = async () => {
        try {
            const res = await getTasks()
            setTasks(res.data)
            // console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const createTaskRequest = async (values) => {
        try {
            const res = await createTask(values)
            if(!res.data) return 
            setCreatedTask(res.data)
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <TaskContext.Provider value={{
            createTaskRequest,
            createdTask,
            getTasksRequest,
            tasks
        }}>
            {children}
        </TaskContext.Provider>
    )
}