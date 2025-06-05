import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>
                    <span>🤖</span> AI Assistant
                </h1>
                <p className={styles.subtitle}>Welcome! Choose what you want to do:</p>

                <div className={styles.buttonGroup}>
                    <Link href="/signup" className={styles.linkButton}>Sign Up</Link>
                    <Link href="/login" className={styles.linkButton}>Login</Link>
                </div>
            </div>
        </div>
    );
}
