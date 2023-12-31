import {MouseEventHandler, ChangeEvent, ReactNode, KeyboardEvent} from "react";

export interface IButtonProps {
    custom: 'additional' | 'active'
    children?: ReactNode
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean
}

export interface IInputProps {
    custom: 'registration' | 'todo'
    type?: 'password'
    value?: string
    className?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    addItem?: (event: KeyboardEvent) => Promise<void>
}
