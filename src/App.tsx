import './assets/styles/index.scss';
import TodoMain from "./components/todo/todo-main.tsx";
import {useContext, useEffect} from "react";
import {Context} from "./main.tsx";
import {observer} from "mobx-react-lite";


function App() {
    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
             return () => store.checkAuth();
        }
    }, [])

    return (
        <div className="App">
            <TodoMain/>
        </div>
    );
}

export default observer(App);
