import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    if (loading) {
        return <div className="flex justify-center items-center w-full h-screen"><span className=" loading loading-spinner text-white"></span></div>
    }
    if (user) {
        return children;
    }
    return <Navigate state={{form: location}} to='/login'></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node
}
export default PrivateRoute;