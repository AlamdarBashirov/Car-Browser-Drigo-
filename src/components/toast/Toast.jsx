import React, { useEffect } from 'react'
import styles from './Toast.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { hideToast } from '../../redux/reducers/toastSlice'

const Toast = () => {

    const dispatch = useDispatch()
    const { message, type, visible } = useSelector((state) => state.toast)

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                dispatch(hideToast())
            }, 3000)
        }
    }, [visible])

    if (!visible) {
        return;
    }
    return (
        <div className={styles.toast}>
            <div
                className={`${styles.toastContainer} ${type === "success" ? styles.success : styles.error}`}
            >
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Toast