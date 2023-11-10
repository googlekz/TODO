import UiNotification from "../ui/ui-notification.tsx";
import './todo-category.scss'
import {useMemo, useState, KeyboardEvent} from "react";
import UiSelect from "../ui/ui-select.tsx";
import UiInput from "../ui/ui-input.tsx";

import { ICategory, ITitle, IItem } from "../../core/interfaces/category";

import folder from '../../assets/images/folder.svg';
import arrow from '../../assets/images/arrow.svg';

function CategoryTitle({title, notification, toggleBlock}: ICategory) {
    return (
        <div className='category-title' onClick={toggleBlock}>
            <img src={folder} alt="Folder"/>
            <h4>{title}</h4>
            <hr className="category-title__line"/>
            <button className='category-title__button-arrow'>
                <img src={arrow} alt="arrow"/>
            </button>
            {
                notification > 0 ? <UiNotification notification={notification}/> : null
            }
        </div>
    )
}

export default function TodoCategory({title, items}: ITitle) {
    const [stateItems, setStateItems] = useState(items);
    const [showBlock, setShowBlock] = useState(false);
    const [generateId, setGenerateId] = useState(items.length ? items[items.length - 1].id : 0)

    /**
     * Получение уведомлений
     */
    const getNotification = useMemo(() => {
        return stateItems.filter(item => !item.isDone).length
    }, [stateItems])

    /**
     * Получение классов
     */
    const getClassName = () => {
        return showBlock ? `todo-category__selects_active` : '';
    }

    /**
     * Изменение статуса дела (закончен/в процессе)
     * @param changedItem
     * @param checked
     */
    const changeItemStatus = (changedItem: IItem, checked: boolean) => {
        const index = stateItems.findIndex(item => item.id === changedItem.id);
        const stateClone = [...stateItems];
        stateClone.splice(index, 1, {...changedItem, isDone: checked});
        setStateItems(stateClone);
    }

    /**
     * Передача значения инпута при нажатии на enter
     * @param event
     */
    const changeInput = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            addItem((event.target as HTMLInputElement).value);
            (event.target as HTMLInputElement).value = ''
        }
    }

    /**
     * Добавление дела
     * @param text
     */
    const addItem = (text: string) => {
        const incrementGenerate = generateId + 1;
        setStateItems([...stateItems, {
            id: incrementGenerate,
            title: text,
            isDone: false,
        }])
        setGenerateId(incrementGenerate);
    }

    return (
        <div className='todo-category'>
            <CategoryTitle
                title={title}
                notification={getNotification}
                toggleBlock={() => setShowBlock(!showBlock)}
            />
            <div className={`todo-category__selects ${getClassName()}`}>
                {
                    stateItems.map(item => (
                        <UiSelect
                            key={`${title}${item.id}`}
                            item={item}
                            changeItem={changeItemStatus}
                            id={`${title}${item.id}`}
                        >
                            {item.title}
                        </UiSelect>
                    ))
                }
                <UiInput addItem={changeInput}/>
            </div>
        </div>
    )
}
