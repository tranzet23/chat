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
import Users from "../pages/Users/Users";
import {useAppSelector} from "../hooks/redux";
import Settings from "../pages/Settings/Settings";
import Posts from "../pages/Posts/Posts";
import Friends from "../pages/Friends/Friends";

const AppRoutes = () => {
    const {users} = useAppSelector(state => state.userReducer);
    const {user} = useAppSelector(state => state.authReducer);


    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route element={<PrivateRoute allowedRoles={['admin', 'user']}/>}>
                    <Route path="/" element={<ChatPage />} />
                </Route>

                <Route element={<PrivateRoute allowedRoles={['user', 'admin']}/>}>
                    <Route path="/profile/:_id" element={<Profile/>} />
                </Route>


                <Route element={<PrivateRoute allowedRoles={['user', 'admin']}/>}>
                    <Route path="/users" element={<Users users={users} />} />
                </Route>

                <Route element={<PrivateRoute allowedRoles={['user', 'admin']}/>}>
                    <Route path="/friends" element={<Friends />} />
                </Route>

                <Route element={<PrivateRoute allowedRoles={['user', 'admin']}/>}>
                    <Route path="/settings" element={<Settings user={user} />} />
                </Route>

                <Route element={<PrivateRoute allowedRoles={['user', 'admin']}/>}>
                    <Route path="/posts" element={<Posts user={user} />} />
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