import ButtonActive from "./button-active.tsx";
import ButtonAdditional from "./button-additional.tsx";
import {IButtonProps} from "../../../../core/models/ui.ts";

const ButtonMain = (props: IButtonProps) => {
    /**
     * Получение компонента с кнопкой
     */
    const getButton = () => {
        switch (props.custom) {
            case 'additional': {
                return <ButtonAdditional {...props} />;
            }
            default: {
                return <ButtonActive {...props} />
            }
        }
    }
    return (
        <>
            {getButton()}
        </>
    );
};

export default ButtonMain;
