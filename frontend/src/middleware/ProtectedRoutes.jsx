
import {Outlet} from "react-router-dom";
import Login from "../pages/Login.jsx";

export const useAuth = () => {
    return JSON.parse(localStorage.getItem('token'))
}

const ProtectedRoutes = () => {
    const isAuthorized = useAuth()

    return isAuthorized ? <Outlet /> : <Login />
}

export default ProtectedRoutes