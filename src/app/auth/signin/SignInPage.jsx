import React, { useEffect, useState } from 'react'
import styles from './SignInPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginThunk } from '../../../redux/reducers/authSlice'

const SignInPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { currentUser, loading, error } = useSelector(state => state.auth)

    const [loginData, setloginData] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginThunk(loginData))
    }

    useEffect(() => {
        if (currentUser){
            navigate("/")
        }
    }, [currentUser, navigate])


    return (
        <>
            <div className={styles.signUpSection}>
                <form
                    className={styles.signUpForm}
                    onSubmit={handleSubmit}
                >
                    <div className={styles.headling}>
                        <h3>Sign in</h3>
                    </div>
                    <div className={styles.userData}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            value={loginData.email}
                            onChange={(e) => setloginData({
                                ...loginData,
                                email: e.target.value
                            })}
                        />
                    </div>
                    <div className={styles.userData}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id='password'
                            value={loginData.password}
                            onChange={(e) => setloginData({
                                ...loginData,
                                password: e.target.value
                            })}
                        />
                    </div>
                    {loading && <span>Signing up...</span>}
                    {error !== "Failed to get user info" && <span>{error}</span>}


                    <div className={styles.navigateSignUp}>
                        <p>don't you have an account? <span onClick={() => navigate("/signup")}>register</span></p>
                    </div>
                    <button type='submit' disabled={loading} className={styles.submitBtn} >Sign in</button>
                </form>
            </div>
        </>
    )
}

export default SignInPage