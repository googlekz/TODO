import styles from './ui-input-todo.module.scss';
import {IInputProps} from "../../../../../core/models/ui.ts";

export default function UiInputTodo ({addItem, placeholder}: IInputProps) {
    return (
        <div className={styles.uiInput}>
            <span className={styles.uiInput__span} />
            <input
                className={styles.uiInput__input}
                placeholder={placeholder || 'Добавить карточку...'}
                onKeyDown={addItem}
            />
        </div>
    )
}
