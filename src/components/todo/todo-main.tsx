import TodoCategory from "./todo-category.tsx";
import './todo-main.scss';
import border from '../../assets/images/border.svg';
import {CATEGORIES} from "../../core/constants/general";

export default function TodoMain () {
    return (
        <div className='todo-main'>
            <img src={border} alt="border" className='todo-main__image'/>
            <div className="todo-main__content">
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
