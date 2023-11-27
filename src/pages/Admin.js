import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Admin() {

const [admin, setAdmin] = useState([]);

const url = "http://localhost:3000/static/";
useEffect(() => {
    fectData();
}, []);
const fectData = async () => {
    try {
        const response1 = await axios.get('http://localhost:3000/api/admin');
        const data1 = await response1.data.data;
        setAdmin(data1);

    } catch (error) {
        console.error('Kesalahan:', error);
    }
};
// const fectData = async () =>{
//     const response1 = await axios.get('http://localhost:3000/api/Admin');
//     const data1 = await response1.data.data;
//     setAdmin(data1);
// }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [nama_admin, setNamaAdmin] = useState('');
    const [no_hp, setNoHp] = useState('');
    const [email_admin, setEmailAdmin] = useState('');
    const [gender, setgender] = useState('');
    const [ttl, setTTL] = useState('');
    const [pw_admin, setPWAdmin] = useState('');
    const [file_admin, setfile_Admin] = useState(null);
    const [validation, setValidation] = useState({});
    const navigate = useNavigate();

    const handleNamaAdminChange = (e) => {
        setNamaAdmin(e.target.value);
    };
    const handleNoHPChange = (e) => {
        setNoHp(e.target.value);
    };
    const handleEmailAdminChange = (e) => {
        setEmailAdmin(e.target.value);
    };
    const handleGenderChange = (e) => {
        setgender(e.target.value);
    };
    const handleTTLChange = (e) => {
        setTTL(e.target.value);
    };
    const handlePWAdminChange = (e) => {
        setPWAdmin(e.target.value);
    };
    const handlefile_AdminChange = (e) => {
        const file = e.target.files[0];
        setfile_Admin(file);
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('nama_admin', nama_admin);
        formData.append('no_hp', no_hp);
        formData.append('email_admin', email_admin);
        formData.append('gender', gender);
        formData.append('ttl', ttl);
        formData.append('pw_admin', pw_admin);
        formData.append('file_admin', file_admin);

        try {
            await axios.post('http://localhost:3000/api/admin/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/admin');
            fectData();
        } catch (error) {
            console.error('Kesalahan:', error);
            setValidation(error.response.data);
        }
    };

    const [editData, setEditData] = useState({
        id_admin:null,
        nama_admin: '',
        no_hp: '',
        email_admin: '',
        gender:'',
        ttl:'',
        pw_admin:''
    });

    const [showEditModal, setShowEditModal] = useState(false);

    const handleShowEditModal = (data) => {
        setEditData(data);
        setShowEditModal(true);
        setShow(false);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditData(null);
    };

    const handleEditDataChange = (field, value) => {
        setEditData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('id_admin', editData.id_admin);
        formData.append('nama_admin', editData.nama_admin);
        formData.append('no_hp', editData.no_hp);
        formData.append('email_admin', editData.email_admin);
        formData.append('gender', editData.gender);
        formData.append('ttl', editData.ttl);
        formData.append('pw_admin', editData.pw_admin);

        if (editData.file_admin){
            formData.append('file_admin', editData.file_admin);
        }

        try {
            await axios.patch(`http://localhost:3000/api/admin/update/${editData.id_admin}`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/admin');
            fectData();
            setShowEditModal(false);
        } catch (error) {
            console.error('Kesalahan:', error);
            setValidation(error.response.data);
        }
    };

    const handleDelete = (id_admin) => {
        axios
        .delete(`http://localhost:3000/api/admin/delete/${id_admin}`)
        .then((response) => {
            console.log('Data berhasil dihapus');
            const updateAdmin = admin.filter((item)=> item.id_admin !== id_admin);
            setAdmin(updateAdmin);
        })
        .catch((error) => {
            console.error('Gagal menghapus data:', error);
            alert('Gagal menghapus data. Silahkan coba lagi atau hubungi administrator.');
        });
    };

    return(
        <Container>
            <Row>
                
            <div className="backgroud ">
                <Col>
                <h2>Data Admin</h2>
                <Button  variant="primary" onClick={handleShow}>Tambah </Button>
                </Col>
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama Admin</th>
                        <th scope="col">No HP</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Tanggal Lahir</th>
                        <th scope="col">Password</th>
                        <th scope="col">File</th>
                        <th scope="col" colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { admin.map((admin, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{admin.nama_admin}</td>
                            <td>{admin.no_hp}</td>
                            <td>{admin.email_admin}</td>
                            <td>{admin.gender}</td>
                            <td>{admin.ttl}</td>
                            <td>{admin.pw_admin}</td>
                            <td><img src={url + admin.file_admin} height="100" alt={admin.file_admin}/></td>
                            <td>
                                <button onClick={() => handleShowEditModal(admin)} className='btn btn-sm btn-info'>
                                    Edit 
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(admin.id_admin)} className='btn btn-sm btn-danger' >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
                </div>
            </Row>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nama Admin:</label>
                            <input type="text" className="form-control" value={nama_admin} onChange={handleNamaAdminChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">No HP:</label>
                            <input type="text" className="form-control" value={no_hp} onChange={handleNoHPChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input type="text" className="form-control" value={email_admin} onChange={handleEmailAdminChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">gender:</label>
                            <select type="text" className="form-control" value={gender} onChange={handleGenderChange}>
                                <option selected>Select Gender</option>
                                <option value="1">Pria</option>
                                <option value="2">Wanita</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tanggal lahir:</label>
                            <input type="date" className="form-control" value={ttl} onChange={handleTTLChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input type="password" className="form-control" value={pw_admin} onChange={handlePWAdminChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">file_Admin:</label>
                            <input type="file" className="form-control" accept="image/*" onChange={handlefile_AdminChange} />
                        </div>
                        <button onClick={handleClose} type="submit" className="btn btn-primary">Kirim</button>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label className="form-label">nama_admin:</label>
                        <input
                        type="text"
                        className="form-control"
                        value={editData ? editData.nama_admin : ''}
                        onChange={(e) => handleEditDataChange('nama_admin', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">no_hp:</label>
                        <input
                        type="text"
                        className="form-control"
                        value={editData ? editData.no_hp : ''}
                        onChange={(e) => handleEditDataChange('no_hp', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                        type="text"
                        className="form-control"
                        value={editData ? editData.email_admin : ''}
                        onChange={(e) => handleEditDataChange('email_admin', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">gender:</label>
                        <select className="form-control"
                        value={editData ? editData.gender : ''}
                        onChange={(e) => handleEditDataChange('gender', e.target.value)}>
                                <option selected>Select Gender</option>
                                <option value="1">Pria</option>
                                <option value="2">Wanita</option>
                            </select>
                        
                    </div>
                    <div className="mb-3">
                        <label className="form-label">ttl:</label>
                        <input
                        type="date"
                        className="form-control"
                        value={editData ? editData.ttl : ''}
                        onChange={(e) => handleEditDataChange('ttl', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                        type="text"
                        className="form-control"
                        value={editData ? editData.pw_admin : ''}
                        onChange={(e) => handleEditDataChange('pw_admin', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">file_Admin:</label>
                        <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => handleEditDataChange('file_admin', e.target.files[0])}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Simpan Perubahan
                    </button>
                    </form>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default Admin;