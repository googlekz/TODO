import {ChangeEvent, useContext, useMemo, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../main.tsx";
import {useNavigate} from "react-router-dom";
import style from './authorization.module.scss';
import UiInput from '../ui/inputs/ui-input.tsx';
import ButtonMain from '../ui/buttons/button-main.tsx';
import UiError from "../ui/ui-error.tsx";
import Loader from "../loading/loader.tsx";

const Authorization = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const {store} = useContext(Context)
    const navigate = useNavigate();

    /**
     * Запрос на авторизацию
     */
    const doLogin = async () => {
        await store.doLogin({login, password});
        if (store.isAuth) {
            return navigate('/');
        }
    }

    /**
     * Отключение кнопки если есть ошибки
     */
    const isDisabled = useMemo(() => {
        return !login || !password || store.errors.length > 0;
    }, [login, password, store.errors]);

    /**
     * Динамически изменить значения в переменных
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
    }

    return (
        <>
            {store.isLoading && <Loader/>}
            <div className={style.authorization}>
                <h1 className={style.authorization__title}>Авторизация</h1>
                <UiInput
                    className={style.authorization__input}
                    custom={'registration'}
                    placeholder={'Логин'}
                    value={login}
                    onChange={(e) => changeValue(e, 'login')}
                />
                <UiInput
                    className={style.authorization__input}
                    custom={'registration'}
                    placeholder={'Пароль'}
                    type={'password'}
                    value={password}
                    onChange={(e) => changeValue(e, 'password')}
                />
                {
                    store.errors.length > 0 &&
                    <UiError
                        className={style.authorization__error}
                    >{store.errors[0]}</UiError>
                }
                <div className={style.authorization__navigation}>
                    <ButtonMain
                        custom={'additional'}
                        onClick={() => navigate('/registration')}
                    >
                        Зарегистрироваться
                    </ButtonMain>
                    <ButtonMain
                        custom={'active'}
                        onClick={doLogin}
                        disabled={isDisabled}
                    >
                        Войти
                    </ButtonMain>
                </div>
            </div>
        </>
    );
}

export default observer(Authorization);
