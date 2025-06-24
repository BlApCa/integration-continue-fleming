import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = ({ onLoginSuccess }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/login`, credentials);
            if (response.data.success) {
                onLoginSuccess();
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="admin-login-form">
            <input
                type="email"
                data-testid="admin-email"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                placeholder="Email"
            />
            <input
                type="password"
                data-testid="admin-password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="Password"
            />
            <button type="submit" data-testid="admin-login">Login</button>
        </form>
    );
};

export default AdminLogin;