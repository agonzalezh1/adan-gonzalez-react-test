import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SessionContext } from "../../hooks/context";

const PrivateRoutes = () => {

    const { isLogged } = useContext(SessionContext);

    if(!isLogged) {
        return <Navigate to={'/login'} />
    }
    return <Outlet />
};

export default PrivateRoutes;