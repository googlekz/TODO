import {KeyboardEvent, ReactNode} from "react";

export interface IButtonProps {
    custom: 'additional' | 'active'
    children?: ReactNode
}

export interface IInputProps {
    custom: 'registration'
    className?: string,
    addItem(e: KeyboardEvent): void,
    placeholder?: string
}
