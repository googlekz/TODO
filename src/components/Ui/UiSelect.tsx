import './UiSelect.scss'
import {useState} from "react";

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
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
                  <path
                      d="M9.77694 1.36523L9.60975 1.19674L9.43317 1.35537L4.72974 5.58053L2.38581 3.399L2.2089 3.23435L2.03873 3.40596L1.24083 4.21062L1.06134 4.39164L1.24621 4.56716L4.555 7.70875L4.7235 7.86873L4.89503 7.712L10.5666 2.52975L10.7585 2.35441L10.5754 2.16989L9.77694 1.36523Z"
                      fill="#F4F4F4" stroke="#F4F4F4" strokeWidth="0.498909"/>
                </svg>
            </span>
            <span className='ui-select__label'>{ children }</span>
        </label>
    )
}
