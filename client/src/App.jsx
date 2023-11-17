import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { TaskProvider } from './context/TaskContext'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import TaskPage from './pages/TaskPage'
import TaskFormPage from './pages/TaskFormPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'

export const App = () => {
    return (
        <AuthProvider>
            <TaskProvider>
                <BrowserRouter>
                    <main className='container mx-auto px-10'>
                        <Navbar />
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/login' element={<LoginPage />} />
                            <Route path='/register' element={<RegisterPage />} />
                            
                            <Route element={<ProtectedRoute />}>
                                <Route path='/tasks' element={<TaskPage />} />
                                <Route path='/add-task' element={<TaskFormPage />} />
                                <Route path='/task/:id' element={<TaskFormPage />} />
                                <Route path='/profile' element={<ProfilePage />} />
                            </Route>
                        </Routes>
                    </main>
                </BrowserRouter>
            </TaskProvider>
        </AuthProvider>
    )
}