import React, {useState} from 'react';
import styles from './Send.module.scss';


import SubmitImg from '../../assets/edit.svg'
import BtnMoreImg from '../../assets/nav.svg'
import CheckImg from '../../assets/content.svg'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchAddMessage} from "../../store/chat/actionCreators";
import {FetchMessage} from "../../models/Messages";

const Send = () => {
    const dispatch = useAppDispatch();
    const {currentConversationId} = useAppSelector(state => state.chatReducer);
    const [value, setValue] = useState('')
    const {user} = useAppSelector(state => state.authReducer);


console.log(currentConversationId)



    const OnClickBtnAlert = () => {
        if(!user) return;

        const messagesData: FetchMessage = {
            text: value,
            conversationId: currentConversationId,
            sender: user._id,
        }
        dispatch(fetchAddMessage(messagesData))
        alert(value);
        setValue('')
    }
    return (
        <div className={styles.sendBlock}>
            <div className={styles.container}>
                <input value={value} onChange={(e) => setValue(e.target.value)} type="text"
                       placeholder="Digite a mensagem"/>
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