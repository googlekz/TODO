import {KeyboardEvent} from 'react';
import styles from './ui-input.module.scss';

interface IInput {
    addItem(e: KeyboardEvent): void,
    placeholder?: string
}

export default function UiInput ({addItem, placeholder}: IInput) {
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
