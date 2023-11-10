import {KeyboardEvent} from 'react';
import styles from './ui-input.module.scss';

export default function UiInput ({addItem}: {addItem(e: KeyboardEvent): void}) {
    return (
        <div className={styles.uiInput}>
            <span className={styles.uiInput__span} />
            <input className={styles.uiInput__input} placeholder='Write a task...' onKeyDown={addItem} />
        </div>
    )
}
