import { useRouter } from 'next/router';
import AuthForm from '../components/AuthForm';

const LoginPage = () => {
    const router = useRouter();

    const handleLogin = async (form) => {
        try {
            const res = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Login failed');

            const data = await res.json();
            localStorage.setItem('userId', data.id);
            router.push('/chat');
        } catch (err) {
            console.error('Login failed:', err);
            alert('Login failed');
        }
    };

    return <AuthForm onSubmit={handleLogin} isSignup={false} />;
};

export default LoginPage;
