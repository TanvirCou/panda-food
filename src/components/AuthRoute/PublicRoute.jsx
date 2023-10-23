import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PublicRoute = ({children}) => {


    return !localStorage.getItem('token') ? (children) : 
    <Navigate to='/'></Navigate>;
};

export default PublicRoute;