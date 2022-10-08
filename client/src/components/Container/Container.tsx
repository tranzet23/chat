import React from 'react';
import styles from './Container.module.scss';
import classNames from "classnames";

type ContainerType = {
    children: any;
    center?: boolean;
    className?: string;
    sidebar?: boolean;
    flex?: 'flex' | 'block';
}


const Container = ({children, center, className, flex, sidebar}: ContainerType) => {
    const classes = classNames(styles.container, {
        [styles.containerAllCenter]: center,
        [styles.containerSidebar]: sidebar,
        [styles.containerFlex]: flex === 'flex'
    });


    return (
        <div className={classes}>
            {children}
        </div>
    );
};

export default Container;