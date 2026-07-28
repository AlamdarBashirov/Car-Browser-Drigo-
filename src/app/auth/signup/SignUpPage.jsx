import React, { useEffect, useState } from 'react'
import styles from './SignUpPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerThunk } from '../../../redux/reducers/authSlice'

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
                        <h3>Create Account</h3>
                        <p>Join Rent a Car and start booking today.</p>
                    </div>

                    <div className={styles.userData}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your full name"
                            value={registerData.name}
                            onChange={(e) =>
                                setRegisterData({
                                    ...registerData,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className={styles.userData}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={registerData.email}
                            onChange={(e) =>
                                setRegisterData({
                                    ...registerData,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className={styles.userData}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Create a password"
                            value={registerData.password}
                            onChange={(e) =>
                                setRegisterData({
                                    ...registerData,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>

                    {loading && (
                        <span className={styles.loadingMessage}>
                            Creating account...
                        </span>
                    )}

                    {error !== "Failed to get user info" && error && (
                        <span className={styles.errorMessage}>
                            {error}
                        </span>
                    )}

                    <div className={styles.navigateSignUp}>
                        <p>
                            Already have an account?
                            <span onClick={() => navigate("/signin")}>
                                Sign in
                            </span>
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={styles.submitBtn}
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </>
    )
}

export default SignUpPage