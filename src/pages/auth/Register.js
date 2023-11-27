import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const navigate = useNavigate();
    const [nama_user, setUsername] = useState('');
    const [pw_user, setPassword] = useState('');
    const [no_hp, setNoHP] = useState('');
    const [email_user, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [ttl, setTtl] = useState('');


    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', {
                nama_user : nama_user ,
                pw_user: pw_user,
                no_hp: no_hp,
                email_user: email_user,
                gender: gender,
                ttl: ttl,
            });
            console.log('Pendaftaran berhasil:', response.data);
            navigate('/login');
            window.location.reload();
        } catch (error) {
            console.error('Gagal mendaftar:', error);
        }
    };

    return (
        <div className="container-register">
            <div class="card-foto rounded-3">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
            class="w-100" 
            alt="Sample photo"></img>
            </div>
            <h2 className="mt-3 text-center">Form Pendaftaran</h2>
            <div className="form-group">
                <label>Nama :</label>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Nama "
                    value={nama_user}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>No HP:</label>
                <input
                    className="form-control"
                    type="text"
                    placeholder="No HP"
                    value={no_hp}
                    onChange={(e) => setNoHP(e.target.value)}
                />
            </div>
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
                <label>Gender:</label>
                <select
                    className="form-control"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Select Gender</option>
                    <option value="Pria">Pria</option>
                    <option value="Wanita">Wanita</option>
                </select>
            </div>
            <div className="form-group">
                <label>TTL:</label>
                <input
                    className="form-control"
                    type="date"
                    placeholder="Tanggal Lahir"
                    value={ttl}
                    onChange={(e) => setTtl(e.target.value)}
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
            <div className="register">
            <button className="btn btn-primary mt-3" onClick={handleRegister}>
                Daftar
            </button>
            </div>
        </div>
    );
}

export default Register;
