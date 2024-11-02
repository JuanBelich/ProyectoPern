import { Navigate, Outlet } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({redirecTo, isAllowed, children}) => {
    if(!isAllowed)return <Navigate to={redirecTo} replace />;
    
    return children ? children : <Outlet />;
}

