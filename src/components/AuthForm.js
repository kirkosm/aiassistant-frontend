import React, { useState } from 'react';
import styles from '../styles/AuthForm.module.css';

const AuthForm = ({ onSubmit, isSignup }) => {
    const [form, setForm] = useState({ username: '', password: '', email: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

            <input
                className={styles.inputField}
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
            />
            <input
                className={styles.inputField}
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
            />
            {isSignup && (
                <input
                    className={styles.inputField}
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
            )}
            <button className={styles.submitButton} type="submit">
                {isSignup ? 'Sign Up' : 'Login'}
            </button>
        </form>
    );
};

export default AuthForm;
