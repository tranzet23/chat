import React from 'react';
import {Routes, Route} from 'react-router-dom';


import './App.css';
import ChatPage from "./pages/Chat/ChatPage";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/Login/LoginPage";

function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path='' element={<ChatPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;

