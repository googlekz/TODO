import TodoCategory from "./todo-category.tsx";
import styles from './todo-main.module.scss';
import border from '../../assets/images/border.svg';
import {CATEGORIES} from "../../core/constants/general";

export default function TodoMain () {
    return (
        <div className={styles.todoMain}>
            <img src={border} alt="border" className={styles.todoMain__image}/>
            <div className={styles.todoMain__content}>
                {
                    CATEGORIES.map(item => (
                        <TodoCategory
                            key={item.id}
                            {...item}
                        />
                    ))
                }
            </div>
        </div>
    )
}
