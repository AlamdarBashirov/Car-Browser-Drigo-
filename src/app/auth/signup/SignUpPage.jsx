import React, { useEffect, useState } from 'react'
import styles from './SignUpPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerThunk } from '../../../redux/reducers/AuthSlice'

const SignUpPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { currentUser, loading, error } = useSelector(state => state.auth)

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registerThunk(registerData))
    }

    useEffect(() => {
        if (currentUser) {
            navigate("/")
        }
    }, [currentUser])

    return (
        <>
            <div className={styles.signUpSection}>
                <form
                    className={styles.signUpForm}
                    onSubmit={handleSubmit}
                >
                    <div className={styles.headling}>
                        <h3>Sign up</h3>
                    </div>
                    <div className={styles.userData}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id='name'
                            value={registerData.name}
                            onChange={(e) => setRegisterData({
                                ...registerData,
                                name: e.target.value
                            })}
                        />
                    </div>
                    <div className={styles.userData}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            value={registerData.email}
                            onChange={(e) => setRegisterData({
                                ...registerData,
                                email: e.target.value
                            })}
                        />
                    </div>
                    <div className={styles.userData}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id='password'
                            value={registerData.password}
                            onChange={(e) => setRegisterData({
                                ...registerData,
                                password: e.target.value
                            })}
                        />
                    </div>
                    {loading && <span>Signing up...</span>}
                    {error && <span>{error}</span>}


                    <div className={styles.navigateSignUp}>
                        <p>do you have an account? <span onClick={() => navigate("/signin")}>register</span></p>
                    </div>
                    <button type='submit' disabled={loading} className={styles.submitBtn} >Sign in</button>
                </form>
            </div>
        </>
    )
}

export default SignUpPage