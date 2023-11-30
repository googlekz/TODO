import UiNotification from "../ui/ui-notification.tsx";
import styles from './todo-category.module.scss';
import {useMemo, useState, KeyboardEvent} from "react";
import UiSelect from "../ui/ui-select.tsx";
import UiInput from "../ui/ui-input.tsx";

import { ICategory, ITitle, IItem } from "../../../core/models/category.ts";

import folder from '../../assets/images/folder.svg';
import arrow from '../../assets/images/arrow.svg';
import TodoRepository from "../../../core/repository/TodoRepository.ts";

function CategoryTitle({title, notification, toggleBlock}: ICategory) {
    return (
        <div className={styles.categoryTitle} onClick={toggleBlock}>
            <img src={folder} alt="Folder"/>
            <h4>{title}</h4>
            <hr className={styles.categoryTitle__line}/>
            <button className={styles.categoryTitle__buttonArrow}>
                <img src={arrow} alt="arrow"/>
            </button>
            {
                notification > 0 ? <UiNotification notification={notification}/> : null
            }
        </div>
    )
}

interface ICategoryProps extends ITitle {
    refreshGroup(): void;
}

export default function TodoCategory({title, items, id, refreshGroup}: ICategoryProps ) {
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
        let result = `${styles.todoCategory__selects}`;
        if (showBlock) {
            result = `${result} ${styles.todoCategory__selects_active}`
        }
            return result
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

    const createItem = async (title: string, groupId: number) => {
        return await TodoRepository.createItem({
            title,
            groupId,
        })
    }

    /**
     * Передача значения инпута при нажатии на enter
     * @param event
     */
    const changeInput = async (event: KeyboardEvent) => {
        const targetValue = (event.target as HTMLInputElement).value;
        if (event.key === 'Enter' && targetValue.length > 0) {
            addItem((event.target as HTMLInputElement).value);
            await createItem(targetValue, id);
            refreshGroup();
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
        <div className={styles.todoCategory}>
            <CategoryTitle
                title={title}
                notification={getNotification}
                toggleBlock={() => setShowBlock(!showBlock)}
            />
            <div className={getClassName()}>
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
