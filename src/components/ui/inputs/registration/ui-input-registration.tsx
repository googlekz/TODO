import styles from './ui-input-registration.module.scss';
import {IInputProps} from "../../../../../core/models/ui.ts";

const UiInputRegistration = (props: IInputProps) => {
    return (
        <>
            <input
                type={props.type ? props.type : 'text'}
                value={props.type}
                onChange={props.onChange}
                className={props.className ? `${styles.uiRegistration} ${props.className}` : styles.uiRegistration}
            />
        </>
    );
};

export default UiInputRegistration;
