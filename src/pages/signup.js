import { useRouter } from 'next/router';
import AuthForm from '../components/AuthForm';

const SignupPage = () => {
    const router = useRouter();

    const handleSignup = async (form) => {
        try {
            const res = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const text = await res.text();

            if (text.includes('success')) {
                alert('Signup successful! You can now log in.');
                router.push('/login');
            } else {
                alert(text);
            }
        } catch (err) {
            console.error('Signup failed:', err);
            alert('Signup failed');
        }
    };

    return <AuthForm onSubmit={handleSignup} isSignup={true} />;
};

export default SignupPage;
