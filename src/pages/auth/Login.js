import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [email_user, setEmail] = useState('');
    const [pw_user, setPassword] = useState('');

    const handleLogin = async () => {
        try{
            const response = await axios.post('http://localhost:3000/api/auth/login', { email_user, pw_user });
            const token = response.data.token;
            
            if (token) {
                localStorage.setItem('token', token);
                navigate('/');
                window.location.reload();
            } else {
                console.error('Gagal login : Token tidak diterima');
            }
        } catch (error) {
            if (error.response.status === 401 ) {
                console.error('Gagal login : Kata sandi atau email salah');
                console.log(email_user,pw_user)
            } else {
                console.error('Gagal login : ', error);
            }
        }
    };

    return(
        <div className="container-login">
            <h2 className="mt-5 text-center">Sign in</h2>
            
            <div className="form-group">
                <label>Email:</label>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Email"
                    value={email_user}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={pw_user}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="daftar">
            <button className="btn btn-primary mt-2" onClick={handleLogin}>Login</button>
            <p className="mt-2">Belum punya akun? <a href="/register">Daftar</a></p>
            </div>
        </div>
    );
}

export default Login;