import styles from './ui-notification.module.scss'

export default function UiNotification ({notification}: { notification: number}) {
    return (
        <span className={styles.notification}>{ notification }</span>
    )
}
