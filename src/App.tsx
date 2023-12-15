import './assets/styles/index.scss';
import TodoMain from "./components/todo/todo-main.tsx";
import {useContext, useEffect} from "react";
import {Context} from "./main.tsx";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import Loader from "./components/loading/loader.tsx";


function App() {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth().then(() => {
                store.isInit = !store.isInit;
            });
            return;
        }
        navigate('/authorization')
    }, [])

    return (
        <div className="App">
            {
                store.isLoading && <Loader/>
            }
            <TodoMain/>
        </div>
    );
}

export default observer(App);
