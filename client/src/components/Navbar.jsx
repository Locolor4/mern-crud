import { Link, Navigate, useNavigate } from "react-router-dom"
import {useAuth} from '../context/AuthContext'
import {logoutRequest} from '../api/auth.js'

const Navbar = () => {

    const {isAuthenticated,signOut, user} = useAuth()

    const navigate = useNavigate()

    const handleLogout = async () => {

        const res = await signOut()
        if(res === 200) return navigate('/')
    }

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <h1 className="text-2xl font-bold">Task manager</h1>
            {!isAuthenticated ? (
                <ul className="flex gap-x-2">
                    <li>
                        <Link className="bg-indigo-500 px-4 py-1 rounded-md" to={'/login'}>Login</Link>
                    </li>
                    <li>
                        <Link className="bg-indigo-500 px-4 py-1 rounded-md" to={'/register'}>Register</Link>
                    </li>
                </ul>
            ) : (
                <>
                    <ul className="flex gap-x-2">
                        <li>Welcome {user.username}</li>
                        <li>
                            <Link className="bg-indigo-500 px-4 py-1 rounded-md" to={'/tasks'}>Tasks</Link>
                        </li>
                        <li>
                            <Link className="bg-indigo-500 px-4 py-1 rounded-md" to={'/add-task'}>Add task</Link>
                        </li>
                        <li>
                            <button  type="button" onClick={() => handleLogout()}>Logout</button>
                        </li>
                    </ul>
                </>
            )}
        </nav>
    )
}

export default Navbar