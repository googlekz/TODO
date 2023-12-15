import styles from './button-active.module.scss'
import {IButtonProps} from "../../../../core/models/ui.ts";

const ButtonActive = (props: IButtonProps) => {
    return (
        <button
            className={styles.buttonActive}
            {...props}
        >{ props.children }</button>
    );
};

export default ButtonActive;
