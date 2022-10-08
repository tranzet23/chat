import React from 'react';
import {useNavigate} from "react-router-dom";
import Container from "../../components/Container/Container";
import MyButton from "../../components/UI/button/MyButton";

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate('/login');

    return (
            <Container center>
                <div >
                    <h1 className="mb-5">Вы не авторизованы</h1>
                    <p>Вы не можете перейти на эту страницу.</p>
                        <Container center>
                            <MyButton marginTop type="button" onClick={goBack}>
                                Go home
                            </MyButton>
                        </Container>
                </div>
            </Container>
    );
};

export default Unauthorized;