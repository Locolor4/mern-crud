import {useContext, createContext, useState} from 'react'
import {createTask, deleteTask, getTask, getTasks, updateTask} from '../api/tasks.js'

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

    const getTaskRequest = async (id) => {

        try {
            const res = await getTask(id)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    const updateTaskRequest = async (values) => {

        try {
            const res = await updateTask(values)
            console.log(res);

        } catch (error) {
            console.log(error);
        }
    }

    const deleteTaskRequest = async (id) => {

        try {
            const res = await deleteTask(id)
            if(res.status === 204) setTasks(prev => prev.filter(e => e._id !== id))
        } catch (error) {
            console.log(error);
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
            tasks,
            deleteTaskRequest,
            getTaskRequest,
            updateTaskRequest
        }}>
            {children}
        </TaskContext.Provider>
    )
}