import { useState, useEffect, useRef } from "react";
import styles from "../styles/UserSettings.module.css";

const UserSettings = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState("michalis");
    const [email, setEmail] = useState("michalis@example.com");
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        window.location.href = "/login";
    };

    const handleSave = async () => {
        try {
            const userId = localStorage.getItem("userId");

            const response = await fetch(`http://localhost:8080/api/auth/${userId}/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email }),
            });

            if (!response.ok) throw new Error("Update failed");
            alert("Changes saved ✅");
            setShowModal(false);
        } catch (err) {
            alert("Something went wrong ❌");
            console.error(err);
        }
    };


    // Κλείσιμο μενού όταν κάνεις κλικ έξω
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                !buttonRef.current.contains(e.target)
            ) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className={styles.container}>
                <button
                    className={styles.settings}
                    onClick={(e) => {
                        e.stopPropagation(); // 👈 απαραίτητο
                        setShowMenu(!showMenu);
                    }}
                    title="User settings"
                >
                    ⚙️
                </button>
            </div>

            {showMenu && (
                <div
                    className={styles.menu}
                    onClick={(e) => e.stopPropagation()}
                >
                    <p><strong>Username:</strong> {username}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <button className={styles.editBtn} onClick={() => setShowModal(true)}>Edit</button>
                    <button className={styles.logoutBtn} onClick={handleLogout}>Log out</button>
                </div>
            )}

            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Edit Profile</h3>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <div className={styles.modalButtons}>
                            <button onClick={handleSave}>Save</button>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

};

export default UserSettings;
