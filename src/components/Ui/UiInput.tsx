import React from 'react';

import './UiInput.scss';

export default function UiInput ({addItem}: {addItem<T>(e: React.SyntheticEvent<T>): void}) {
    return (
        <div className='ui-input'>
            <span className="ui-input__span" />
            <input className='ui-input__input' placeholder='Write a task...' onKeyDown={addItem} />
        </div>
    )
}
