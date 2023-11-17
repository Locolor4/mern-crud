import axios from './axios.js'

export const getTasks = () => axios.get('/tasks')

export const getTask = (id) => axios.get(`/tasks/${id}`)

export const createTask = (values) => axios.post('/tasks', values)

export const updateTask = (values) => axios.put(`tasks/${values._id}`, values)

export const deleteTask = (id) => axios.delete(`tasks/${id}`)