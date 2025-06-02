import { useSelector } from "react-redux"
import type { RootState } from "../../store/reducers/store"
import { Navigate, Outlet, useLocation } from "react-router-dom"

const PrivateRouter = ({ isPublic = false}) => {
    const user = useSelector((state: RootState) => state.authState.user)
    const isLoggedIn = user.userId > 0
    const location = useLocation()
    
    if(isPublic) {
        return isLoggedIn ? <Navigate to="/user/profile" /> : <Outlet />
    }

    if (!isLoggedIn) {
        // Store the attempted URL
        localStorage.setItem('redirectAfterLogin', location.pathname + location.search)
        return <Navigate to="/login" />
    } else {
        const redirectUrl = localStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
            localStorage.removeItem('redirectAfterLogin')
            return <Navigate to={redirectUrl} />
        }
    }

    return <Outlet />
}

export default PrivateRouter