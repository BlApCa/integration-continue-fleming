import axios from 'axios';
import {useEffect, useState} from "react";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users?admin=true`);
            setUsers(response.data.users);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    return (
        <div data-testid="user-list">
            {users.map(user => (
                <div key={user.id} data-testid="user-row">
                    <span>{user.email}</span>
                    <button
                        data-testid="delete-user"
                        onClick={() => handleDelete(user.id)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default UserList;