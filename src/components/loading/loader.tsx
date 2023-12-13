import style from './loader.module.scss'

const Loader = () => {
    return (
        <div className={style.loader}>
            <div className={style.loader__roll} />
        </div>
    );
};

export default Loader;
