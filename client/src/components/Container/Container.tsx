import React from 'react';
import styles from './Container.module.scss'

type ContainerType = {
    children: any
}

const Container = ({children}: ContainerType) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default Container;