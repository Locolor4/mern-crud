import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

export const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<h1>Home Page</h1>} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/tasks' element={<h1>Home Page</h1>} />
                    <Route path='/add-task' element={<h1>Home Page</h1>} />
                    <Route path='/task/:id' element={<h1>Home Page</h1>} />
                    <Route path='/profile' element={<h1>Home Page</h1>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}