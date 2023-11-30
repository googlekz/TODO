import TodoCategory from "./todo-category.tsx";
import styles from './todo-main.module.scss';
import border from '../../assets/images/border.svg';
import {KeyboardEvent, useEffect, useState} from "react";
import TodoRepository from "../../../core/repository/TodoRepository.ts";
import {ITitle} from "../../../core/models/category.ts";
import MainLayout from "../../layouts/main-layout.tsx";
import UiInput from "../ui/ui-input.tsx";

export default function TodoMain() {
    const [groups, setGroups] = useState<ITitle[]>([]);

    const getTodos = () => {
        TodoRepository.getTodos().then(res => {
            setGroups(res.data)
        })
    }

    useEffect(() => {
        return () => getTodos()
    }, [])

    const addItem = async (event: KeyboardEvent) => {
        const targetValue = (event.target as HTMLInputElement).value;
        if (event.key === 'Enter' && targetValue.length > 0) {
            await TodoRepository.createGroup({
                title: targetValue
            });
            getTodos();
            (event.target as HTMLInputElement).value = ''
        }
    }

    return (
        <MainLayout>
            <div className={styles.todoMain}>
                <img src={border} alt="border" className={styles.todoMain__image}/>
                <div className={styles.todoMain__content}>
                    <UiInput addItem={addItem} placeholder={'Новая группа'} />
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
