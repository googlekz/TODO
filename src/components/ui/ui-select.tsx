import styles from './ui-select.module.scss'
import {useState} from "react";
import access from '../../assets/images/access.svg'

import { IItem } from "../../core/interfaces/category";

interface IProps {
    item: IItem,
    id: string,
    changeItem(item: IItem, checkbox: boolean): void,
    children: string,
}

export default function UiSelect({item, id, changeItem, children}: IProps) {
    const [checkbox, setCheckbox] = useState(item.isDone);

    /**
     * изменение значение checked и отправка input
     */
    const setInputValue = () => {
        setCheckbox(!checkbox);
        changeItem(item, !checkbox);
    }

    /**
     * Получение класса
     */
    const getClassName = () => {
        return `${styles.uiSelect} ${checkbox ? styles.uiSelect_active : ''}`
    }

    return (
        <label htmlFor={`select${id}`} className={getClassName()}>
            <input
                checked={checkbox}
                className={styles.uiSelect__checkbox}
                type="checkbox"
                id={`select${id}`}
                onChange={setInputValue}
            />
            <span className={styles.uiSelect__span}>
                <img src={access} alt="access" />
            </span>
            <span className={styles.uiSelect__label}>{ children }</span>
        </label>
    )
}
