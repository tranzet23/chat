import React, {useState} from 'react';
import styles from './Send.module.scss';

import SubmitImg from '../../assets/edit.svg'
import BtnMoreImg from '../../assets/nav.svg'
import CheckImg from '../../assets/content.svg'


type Props =  {
    onSubmit: (text: string) => void
}


const Send = ({onSubmit}: Props) => {
    const [value, setValue] = useState('')


    const handleSubmit= (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        onSubmit(value)
        setValue('')
    }

    return (
        <div className={styles.sendBlock}>
            <div className={styles.container}>
                <input value={value} onChange={(e) => setValue(e.target.value)} type="text"
                       placeholder="Digite a mensagem"/>
                <div className={styles.buttons}>
                    <button onClick={handleSubmit} className={styles.buttonSubmit}>
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