import TodoCategory from "./todo-category.tsx";
import styles from './todo-main.module.scss';
import border from '../../assets/images/border.svg';
import {KeyboardEvent, useContext, useEffect, useState} from "react";
import TodoRepository from "../../../core/repository/TodoRepository.ts";
import {ITitle} from "../../../core/models/category.ts";
import MainLayout from "../../layouts/main-layout.tsx";
import UiInput from "../ui/inputs/ui-input.tsx";
import {Context} from "../../main.tsx";
import {observer} from "mobx-react-lite";

const TodoMain = () => {
    const [groups, setGroups] = useState<ITitle[]>([]);

    /**
     * Получение списка дел
     */
    const getTodos = async () => {
        store.isLoading = true;
        await TodoRepository.getTodos().then(res => {
            setGroups(res.data)
        })
        store.isLoading = false;
    }

    const {store} = useContext(Context);

    useEffect(() => {
        if (store.isInit) {
            getTodos()
        }
    }, [store.isInit])

    /**
     * Добавление дела
     * @param event
     */
    const addItem = async (event: KeyboardEvent) => {
        const targetValue = (event.target as HTMLInputElement).value;
        if (event.key === 'Enter' && targetValue.length > 0) {
            store.isLoading = true;
            await TodoRepository.createGroup({
                title: targetValue
            });
            await getTodos();
            (event.target as HTMLInputElement).value = ''
        }
    }

    return (
        <MainLayout>
            <div className={styles.todoMain}>
                <img src={border} alt="border" className={styles.todoMain__image}/>
                <div className={styles.todoMain__content}>
                    <UiInput
                        custom={'todo'}
                        addItem={addItem}
                        placeholder={'Новая группа'}
                    />
                    {
                        groups.map(item => (
                            <TodoCategory
                                key={item.id}
                                refreshGroup={getTodos}
                                {...item}
                            />
                        ))
                    }
                </div>
            </div>
        </MainLayout>
    )
}

export default observer(TodoMain);
