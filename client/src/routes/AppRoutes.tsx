import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ChatPage from "../pages/Chat/ChatPage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound/NotFound";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import GuestRoute from "./components/GuestRoute";
import PrivateRoute from "./components/PrivateRoute";
import Chat from "../components/Chat/Chat";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>


                <Route element={<PrivateRoute allowedRoles={['admin', 'user']}/>}>
                    <Route path="/" element={<ChatPage />} />
                </Route>

                <Route element={<PrivateRoute allowedRoles={['user', 'admin']}/>}>
                    <Route path="/profile" element={<Profile />} />
                </Route>



                {/*guest routes*/}
                <Route element={<GuestRoute />}>
                    <Route path="/login" element={<LoginPage />} />
                </Route>

                <Route element={<GuestRoute />}>
                    <Route path="/registration" element={<RegisterPage />} />
                </Route>

                {/*public routes*/}
                <Route path="/not-found-404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/not-found-404" />} />
                <Route path="unauthorized" element={<Unauthorized />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;