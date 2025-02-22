import { useContext } from "react";
import { authContext } from './../provider/AuthContext';
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {

    const { user } = useContext(authContext)
    const { loading } = useContext(authContext)


    if (loading) {
        return <>
            <div className="min-h-screen flex justify-center items-center">
            <span className="loading loading-ring loading-xl"></span>
            </div>
        </>
    }

    if (!user) {
        return <Navigate to="/"></Navigate>
    }
    return children
};


PrivateRoute.propTypes = {
    children: PropTypes.object,
}


export default PrivateRoute;