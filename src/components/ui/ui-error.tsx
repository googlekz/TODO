import styles from './ui-error.module.scss'
import {ReactNode} from "react";

const UiError = ({ children, className }: { children: ReactNode, className: string}) => {
    return (
        <span className={`${styles.error} ${className}`}>
            { children }
        </span>
    );
};

export default UiError;
