import styles from './ui-error.module.scss'

const UiError = ({ children, className }: { children: string, className: any}) => {
    return (
        <span className={`${styles.error} ${className}`}>
            { children }
        </span>
    );
};

export default UiError;
