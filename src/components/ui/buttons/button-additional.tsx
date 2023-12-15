import styles from './button-additional.module.scss'
import {IButtonProps} from "../../../../core/models/ui.ts";

const ButtonAdditional = (props: IButtonProps) => {
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
