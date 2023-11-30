import styles from './main-layout.module.scss'
import {Children, useContext, useEffect} from "react";
import {Context} from "../main.tsx";
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom';

const MainLayout = ({children}: {children: React.ReactNode}) => {
    const {store} = useContext(Context)
    const navigate = useNavigate();

    const logoutClick = async () => {
        const logoutRes = await store.logout();
        if (logoutRes) {
            return navigate('/authorization');
        }
    }

    useEffect(() => {
        if (store.isInit && !store.isAuth) {
            return navigate('/authorization');
        }
    }, [store.isInit])

    return (
        <div className={styles.mainLayout}>
            <header className={styles.mainLayout__header}>
                {store.login &&
                    <>
                        <span className={styles.mainLayout__login}>{store.login}</span>
                        <button className={styles.mainLayout__logout} onClick={logoutClick}>Выйти</button>
                    </>
                }
            </header>
            <div className={styles.mainLayout__content}>
                {Children.map(children, child =>
                    <div className="Row">
                        {child}
                    </div>
                )}
            </div>
        </div>
    );
};

export default observer(MainLayout);
