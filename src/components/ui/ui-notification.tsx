import './ui-notification.scss'

export default function UiNotification ({notification}: { notification: number}) {
    return (
        <span className='notification'>{ notification }</span>
    )
}
