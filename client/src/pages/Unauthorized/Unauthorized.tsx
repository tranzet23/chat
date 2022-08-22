import React from 'react';
import {useNavigate} from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate('/');

    return (
        <div>
            <div className="justify-content-center">
                <div >
                    <h1 className="mb-5">Unauthorized</h1>
                    <p>You do not have access to the requested page.</p>
                    <div className="flexGrow">
                        <button  type="button" onClick={goBack}>
                            Go home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;