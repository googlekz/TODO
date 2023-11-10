import './ui-select.scss'
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

    return (
        <label htmlFor={`select${id}`} className={`ui-select${checkbox ? ' ui-select_active' : ''}`}>
            <input
                checked={checkbox}
                className='ui-select__checkbox'
                type="checkbox"
                id={`select${id}`}
                onChange={setInputValue}
            />
            <span className='ui-select__span'>
                <img src={access} alt="access" />
            </span>
            <span className='ui-select__label'>{ children }</span>
        </label>
    )
}
