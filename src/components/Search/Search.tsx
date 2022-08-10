import React from 'react';
import styles from './Search.module.scss';
import SearchImg from '../../assets/search.svg'

const Search = () => {
    return (
        <div className={styles.searchContainer}>
        <input className={styles.inputSearch} type="text" placeholder="Search"/>
            <button>
                <img src={SearchImg} alt=""/>
            </button>

        </div>
    );
};

export default Search;