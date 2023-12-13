import styles from './button-additional.module.scss'

const ButtonAdditional = (props) => {
    return (
        <button
            className={styles.buttonAdditional}
            {...props}
        >
            {
                props.children
            }
        </button>
    );
};

export default ButtonAdditional;
