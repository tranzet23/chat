import * as yup from 'yup';

export const schema = yup.object().shape({
    username: yup.string()
        .required('Необходимо заполнить !')
        .min(4, 'Минимальное количество символов 4'),
    email: yup
        .string()
        .email('Please enter a valid email format !')
        .required('Email обязателен к заполеннию !'),
    password: yup
        .string()
        .min(4, 'Пароль должен иметь минимум 4 символа!')
        .required('Пароль обязателен к заполнению!!'),
    country: yup.string().required('Country is required please !')
});