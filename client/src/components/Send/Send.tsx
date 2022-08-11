import React, {useState} from 'react';
import styles from './Send.module.scss';


import SubmitImg from '../../assets/edit.svg'
import BtnMoreImg from '../../assets/nav.svg'
import CheckImg from '../../assets/content.svg'

const Send = () => {
    const [value, setValue] = useState('')

    const OnClickBtnAlert = () => {
        alert(value);
        setValue('Еще?')
    }
    return (
        <div className={styles.sendBlock}>
            <div className={styles.container}>
                <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder="Digite a mensagem"/>
                <div className={styles.buttons}>
                    <button onClick={OnClickBtnAlert} className={styles.buttonSubmit}>
                        <img src={CheckImg} alt=""/>
                    </button>
                    <button className={styles.buttonMore}>
                        <img src={BtnMoreImg} alt=""/>
                    </button>
                    <button className={styles.buttonCheck}>
                        <img src={SubmitImg} alt=""/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Send;