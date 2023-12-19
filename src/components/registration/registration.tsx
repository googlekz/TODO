import {useContext, useMemo, useState, ChangeEvent} from "react";
import {Context} from "../../main.tsx";
import {useNavigate} from "react-router-dom";
import styles from './registration.module.scss';
import ButtonMain from "../ui/buttons/button-main.tsx";
import UiInput from "../ui/inputs/ui-input.tsx";
import UiError from "../ui/ui-error.tsx";
import {observer} from "mobx-react-lite";
import {ERRORS} from "../../../core/constants/errors.ts";
import Loader from "../loading/loader.tsx";

const Registration = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const {store} = useContext(Context);

    const navigate = useNavigate();

    /**
     * Регитсрация пользователя
     */
    const registration = async () => {
        await store.registration({login, password});
        if (store.isAuth) {
            return navigate('/');
        }
    }

    /**
     * Получение ошибок из бэка
     */
    const getError = () => {
        return ERRORS[store.errors[0]] || store.errors[0];
    }

    /**
     * Перекинуть на страницу авторизации
     */
    const directAuth = () => {
        store.errors = [];
        return navigate('/authorization')
    }

    /**
     * Проверка на идентичность пароли
     */
    const isEqualPassword = () => {
        return password === repeatPassword ? null : 'Пароли не совпадают'
    }

    /**
     * Отключеине кнопки при ошибках или разных паролях
     */
    const isDisabled = useMemo<boolean>(() => {
        return !!(!login || !password || store.errors.length > 0 || isEqualPassword());
    }, [login, password, store.errors]);

    /**
     * Динамически изменить значения useState
     * @param e
     * @param type
     */
    const changeValue = (e: ChangeEvent<HTMLInputElement>, type: string) => {
        store.errors = [];
        if (type === 'login') {
            setLogin(e.target.value);
            return;
        }
        if (type === 'password') {
            setPassword(e.target.value);
            return;
        }
        if (type === 'repeatPassword') {
            setRepeatPassword((e.target as HTMLInputElement).value);
            return;
        }
    }

    return (
        <>
            {store.isLoading && <Loader/>}
            <div className={styles.registration}>
                <h1 className={styles.registration__title}>Регистрация</h1>
                <UiInput
                    className={styles.registration__input}
                    custom={'registration'}
                    placeholder={'Логин'}
                    value={login}
                    onChange={(e) => changeValue(e, 'login')}
                />
                <UiInput
                    className={styles.registration__input}
                    custom={'registration'}
                    placeholder={'Пароль'}
                    value={password}
                    type='password'
                    onChange={(e) => changeValue(e, 'password')}
                />
                <UiInput
                    className={styles.registration__input}
                    custom={'registration'}
                    type='password'
                    placeholder={'Повторите пароль'}
                    value={repeatPassword}
                    onChange={(e) => changeValue(e, 'repeatPassword')}
                />
                {
                    (store.errors.length > 0 || isEqualPassword()) &&
                    <UiError
                        className={styles.registration__error}
                    >{getError() || isEqualPassword()}</UiError>
                }
                <div className={styles.registration__navigation}>
                    <ButtonMain
                        custom={'additional'}
                        onClick={directAuth}
                    >Войти</ButtonMain>
                    <ButtonMain
                        custom={'active'}
                        onClick={registration}
                        disabled={isDisabled}
                    >Зарегистрироваться</ButtonMain>
                </div>
            </div>
        </>
    );
}

export default observer(Registration);
