import { useSelector } from "react-redux"
import type { RootState } from "../../store/reducers/store"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRouter = ({ isPublic = false}) => {
    const isLoggedIn = useSelector((state: RootState) => state.authState.user.userId > 0)
    
    if(isPublic) {
        return isLoggedIn ? <Navigate to="/profile" /> : <Outlet />
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRouter