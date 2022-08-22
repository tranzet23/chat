import React from 'react';
import Container from "../../components/Container/Container";
import styles from './NotFound.module.scss'

const NotFound = () => {
    return (
        <Container>
            <div className={styles.contentCenter}>
                <div>
                    <h2>404</h2>
                    <h3>Page not found.</h3>
                </div>
            </div>
        </Container>
    );
};

export default NotFound;