import React from 'react';
import styles from './Sidebar.module.scss'
import Container from "../Container/Container";
import SidebarItem from "../SidebarItem/SidebarItem";
import {useAppSelector} from "../../hooks/redux";
import profileIcon from '../../assets/profileIcon.svg';
import newsIcon from '../../assets/newsIcon.svg';
import messageIcon from '../../assets/messageIcon.svg';
import friendsIcon from '../../assets/friendsIcon.svg';
import settingsIcon from '../../assets/settings.svg';


export type SidebarType = {
    to: string;
    name: string;
    icon: any;
}


const Sidebar = () => {
    const {user} = useAppSelector(state => state.authReducer);
    const links: SidebarType[] = [
        {
            icon: profileIcon,
            to: `/profile/${user!._id}`,
            name: 'Моя Страница'
        },
        {
            icon: newsIcon,
            to: '/posts',
            name: 'Посты'
        },
        {
            icon: messageIcon,
            to: '/',
            name: 'Мессенджер'
        },
        {
            icon: friendsIcon,
            to: '/friends',
            name: 'Друзья'
        },
        {
            icon: friendsIcon,
            to: '/users',
            name: 'Пользователи'
        },
        {
            icon: settingsIcon,
            to: '/settings',
            name: 'Настройки'
        },
    ]


    return (
        <Container sidebar>
            <ul className={styles.sidebarMenu}>
                {links.map(link =>
                    <SidebarItem icon={link.icon} to={link.to} name={link.name} key={link.name}/>
                )}
            </ul>
        </Container>
    );
};

export default Sidebar;