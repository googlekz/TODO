import {KeyboardEvent} from 'react';
import './ui-input.scss';

export default function UiInput ({addItem}: {addItem(e: KeyboardEvent): void}) {
    return (
        <div className='ui-input'>
            <span className="ui-input__span" />
            <input className='ui-input__input' placeholder='Write a task...' onKeyDown={addItem} />
        </div>
    )
}
