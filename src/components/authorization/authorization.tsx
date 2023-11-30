import {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../main.tsx";
import { useNavigate } from "react-router-dom";

const Authorization = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const {store} = useContext(Context)
    const navigate = useNavigate();

    const doLogin = async () => {
        await store.doLogin({login, password});
        if (store.isAuth) {
            return navigate('/');
        }
    }

    return (
        <div>
            <h1>Авторизация: { store.login }</h1>
            <input
                placeholder={'Логин'}
                value={login}
                onChange={(e) => setLogin((e.target as HTMLInputElement).value)}
            />
            <input
                placeholder={'Пароль'}
                value={password}
                onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            />
            <button onClick={doLogin}>Авторизоваться</button>
            <button onClick={() => navigate('/registration')}>Зарегистрироваться</button>
        </div>
    );
}

export default observer(Authorization);
