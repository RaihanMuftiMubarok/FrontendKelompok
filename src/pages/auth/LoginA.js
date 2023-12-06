import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LoginA() {
    const navigate = useNavigate();
    const [email_admin, setEmail] = useState('');
    const [pw_admin, setPassword] = useState('');

    const handleLoginA = async () => {
        try {
            // Periksa apakah email dan password adalah "admin"
            // if (email_admin === 'admin' && pw_admin === 'admin') {
            //     // Arahkan ke rute "/berita"
            //     navigate('/');
            //     return;
            // }

            const response = await axios.post('http://localhost:3000/api/authadmin/login', { email_admin, pw_admin });
            const token = response.data.token;

            if (token) {
                localStorage.setItem('token', token);
                navigate('/beritaA');
                window.location.reload();
            } else {
                console.error('Gagal login: Token tidak diterima');
            }
        } catch (error) {
            if (error.response.status === 401) {
                console.error('Gagal login: Kata sandi atau email salah');
                console.log(email_admin, pw_admin);
            } else {
                console.error('Gagal login: ', error);
            }
        }
    };

    return (
        <div className="container-login">
            <h2 className="mt-5 text-center">Sign in Admin</h2>

            <div className="form-group">
                <label>Email:</label>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Email"
                    value={email_admin}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={pw_admin}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="daftar">
                <button className="btn btn-primary mt-2" onClick={handleLoginA}>Login</button>
                <p className="mt-2">Belum punya akun? <a href="/registerA">Daftar</a></p>
                <div className="login">
                <p className="mt-2"> <a href="/login">Login sebagai User</a></p>
            </div>
            </div>
        </div>
    );
}

export default LoginA;
