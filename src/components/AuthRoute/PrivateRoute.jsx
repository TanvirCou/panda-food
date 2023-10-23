import { Navigate } from 'react-router-dom';
import { useUserState } from '../ContextProvider/ContextProvider';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    // eslint-disable-next-line no-unused-vars
    const [loggedInUser, setLoggedInUser] = useUserState();    

    return (localStorage.getItem('token') || loggedInUser.success) ? (children) : 
    <Navigate to='/login'></Navigate>;
};

export default PrivateRoute;