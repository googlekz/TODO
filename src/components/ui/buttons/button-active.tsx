import styles from './button-active.module.scss'

const ButtonActive = (props) => {
    return (
        <button
            className={styles.buttonActive}
            {...props}
        >{ props.children }</button>
    );
};

export default ButtonActive;
