import React from 'react';
import styles from '../Sidebar/Sidebar.module.scss'
import {Link} from "react-router-dom";

type Props = {
    to: string;
    name: string;
    icon: any
}

const SidebarItem = ({to, name, icon}:Props) => {
    return (
      <li className={styles.item}>
          <img src={icon} />
          <Link to={to}>{name}</Link>
      </li>
    );
};

export default SidebarItem;