import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import styles from '../styles/Chat.module.css';

export default function ChatPage() {
    const router = useRouter();
    const [threads, setThreads] = useState([]);
    const [selectedThreadId, setSelectedThreadId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [selectedModel, setSelectedModel] = useState('GPT-4');

    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

    useEffect(() => {
        if (!userId) {
            router.push('/login');
        }
    }, [userId, router]);

    useEffect(() => {
        if (!userId) return;
        fetch(`http://localhost:8080/api/chat/threads?userId=${userId}`)
            .then((res) => res.json())
            .then(setThreads)
            .catch((err) => console.error('Failed to fetch threads:', err));
    }, [userId]);

    const loadThreadMessages = async (threadId) => {
        try {
            const res = await fetch(`http://localhost:8080/api/chat/thread/${threadId}/messages`);
            const data = await res.json();
            setMessages(data.map((m) => ({ sender: m.sender, text: m.content })));
            setSelectedThreadId(threadId);
        } catch (err) {
            console.error('Failed to load messages:', err);
        }
    };

    const createNewThread = async () => {
        const message = prompt('Write your first question:');
        if (!message) return;

        try {
            const res = await fetch('http://localhost:8080/api/chat/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: Number(userId), message }),
            });
            const data = await res.json();
            setThreads((prev) => [...prev, { id: data.threadId, title: 'New Chat' }]);
            setMessages(data.messages);
            setSelectedThreadId(data.threadId);
        } catch (err) {
            console.error('Failed to create new thread:', err);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || !selectedThreadId) return;

        const userMessage = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');

        try {
            const res = await fetch('http://localhost:8080/api/chat/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ threadId: selectedThreadId, message: input }),
            });
            const botReply = await res.text();
            setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    const deleteThread = async (threadId) => {
        try {
            await fetch(`http://localhost:8080/api/chat/thread/${threadId}`, { method: 'DELETE' });
            setThreads((prev) => prev.filter((t) => t.id !== threadId));
            if (selectedThreadId === threadId) {
                setSelectedThreadId(null);
                setMessages([]);
            }
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <h2>Conversations</h2>
                <button className={styles.newChatBtn} onClick={createNewThread}>
                    + New Chat
                </button>
                <ul>
                    {threads.map((t) => (
                        <li
                            key={t.id}
                            className={classNames(styles.threadItem, {
                                [styles.activeThread]: t.id === selectedThreadId,
                            })}
                        >
                            <span onClick={() => loadThreadMessages(t.id)}>{t.title}</span>
                            <button
                                className={styles.deleteBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (window.confirm('Delete this conversation?')) {
                                        deleteThread(t.id);
                                    }
                                }}
                            >
                                🗑
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            <main className={styles.chatArea}>
                <div className={styles.topBar}>
                    <select
                        className={styles.modelSelect}
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                    >
                        <option value="GPT-4">GPT-4</option>
                        <option value="GPT-3.5">GPT-3.5</option>
                        <option value="Mixtral">Mixtral</option>
                    </select>
                    <div className={styles.settings}>⚙️</div>
                </div>

                <div className={styles.messages}>
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                <div className={styles.inputArea}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask something..."
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            </main>
        </div>
    );
}
