import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";

const GuestRoute = () => {
    const { user } = useAppSelector((state) => state.authReducer);

    const location:any = useLocation();
    const from = location.state?.from?.pathname || '/';

    console.log(user)

    return user !== null ? <Navigate to={from} /> : <Outlet />;
};

export default GuestRoute;