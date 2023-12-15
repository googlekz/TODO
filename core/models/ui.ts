import {ChangeEventHandler, MouseEventHandler, ReactNode} from "react";

export interface IButtonProps {
    custom: 'additional' | 'active'
    children?: ReactNode
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean
}

export interface IInputProps {
    custom: 'registration'
    type?: 'password'
    value: string
    className?: string
    onChange: ChangeEventHandler<HTMLInputElement>
    placeholder?: string
}
