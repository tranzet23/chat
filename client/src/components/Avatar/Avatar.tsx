import React from 'react';
import IMG from '../../assets/Avatar.png'
import styles from './Avatar.module.scss'

type Props =  {
    image: string | any
}


const Avatar = ({image}:Props) => {
    return (
        <div className= {styles.avatar}>
            <img src={image} alt=""/>
        </div>
    );
};

export default Avatar;