import styles from './ui-input-registration.module.scss';

const UiInputRegistration = (props) => {
    return (
        <>
            <input
                {
                    ...props
                }
                className={props.className ? `${styles.uiRegistration} ${props.className}` : styles.uiRegistration}
            />
        </>
    );
};

export default UiInputRegistration;
