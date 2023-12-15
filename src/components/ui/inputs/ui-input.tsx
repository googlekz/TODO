import UiInputTodo from "./todo/ui-input-todo.tsx";
import UiInputRegistration from "./registration/ui-input-registration.tsx";
import {IInputProps} from "../../../../core/models/ui.ts";

const UiInput = (props: IInputProps) => {
    const getElement = () => {
        switch (props.custom) {
            case 'registration': {
                return <UiInputRegistration { ...props }/>
            }
            default:
                return <UiInputTodo {...props} />
        }
    }
    return (
        <>
            {getElement()}
        </>
    )
}

export default UiInput;
