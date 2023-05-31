import { useContext } from "react"
import { AuthContext } from './../context/auth.context'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({ admittedRoles }) => {

    const { user, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    if (!admittedRoles.includes(user.role)) {

        return <h1>User not allowed</h1>
    }

    return <Outlet />
}

export default PrivateRoute