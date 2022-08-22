import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";

type Props = {
    allowedRoles: ('admin' | 'user')[],
};

const PrivateRoute = ({allowedRoles}:Props) => {
    const {user} = useAppSelector((state) => state.authReducer);

    const location = useLocation();



    if (allowedRoles) {
        if (user && allowedRoles?.includes(user.role)) {
            return <Outlet/>;
        } else {
            return (
                <Navigate
                    to="/unauthorized"
                    state={{from: location}}
                    replace
                />
            );
        }
    } else {
        if (user) {
            return <Outlet/>;
        } else {
            return <Navigate to="/login" state={{from: location}} replace/>;
        }
    }
};

export default PrivateRoute;