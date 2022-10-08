import React from 'react';
import styles from './MyButton.module.scss'
import classNames from "classnames";

type Button = {
    children: string | File | HTMLImageElement | any;
    className?: string;
    onClick?: any;
    primary?: boolean;
    remove?: boolean;
    type?: any,
    noBorder?: boolean;
    hoverNone?: boolean;
    marginTop?: boolean;

}

const MyButton = ({children, primary, remove,noBorder,hoverNone,marginTop,  ...props}: Button) => {
    const classes = classNames(styles.myBtn, {
        [styles.myBtnPrimary]: primary,
        [styles.myBtnRemove]: remove,
        [styles.myBtnNoRadius]: noBorder,
        [styles.myBtnHover]: hoverNone,
        [styles.myBtnMarginT]: marginTop

    });


    return (
      <button {...props}  className={classes}>
          {children}
      </button>
    );
};

export default MyButton;