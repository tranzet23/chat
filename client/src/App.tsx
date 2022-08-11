import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Messages from "./components/Messages/Messages";
import Chat from "./components/Chat/Chat";
import {useAppSelector} from "./hooks/redux";

function App() {
    const { isFetching } = useAppSelector(state => state.authReducer);

    console.log(isFetching);

    return (
        <div className="App">

            <Header/>
            <div className="wrapper">
            <Messages/>
                <Chat/>
            </div>
        </div>
    );
}

export default App;
