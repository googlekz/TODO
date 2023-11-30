import {useContext, useState} from "react";
import {Context} from "../../main.tsx";
import {useNavigate} from "react-router-dom";

export default function Registration () {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const { store } = useContext(Context);

    const navigate = useNavigate();

    const registration = async () => {
        await store.registration({login, password});
        navigate('/');
    }

    return (
        <div>
            <h1>Регистрация</h1>
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
            <button onClick={registration}>Зарегистрироваться</button>
            <button onClick={() => navigate('/authorization')}>Авторизоваться</button>
        </div>
    );
}
