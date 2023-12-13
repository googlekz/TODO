import ButtonActive from "./button-active.tsx";
import ButtonAdditional from "./button-additional.tsx";

const ButtonMain = (props) => {
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
