import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Saran() {

const [saran, setSaran] = useState([]);
const [user, setUser] = useState([]);

const url = "http://localhost:3000/static/";
useEffect(() => {
    fetchData();
}, []);
const fetchData = async () => {
    try {
        const response1 = await axios.get('http://localhost:3000/api/saran');
        setSaran(response1.data.data);

        const response2 = await axios.get('http://localhost:3000/api/user');
        setUser(response2.data.data);
    } catch (error) {
        console.error('Kesalahan:', error);
    }
};
// const fetchData = async () =>{
//     const response1 = await axios.get('http://localhost:3000/api/saran');
//     const data1 = await response1.data.data;
//     setSaran(data1);

//     const response2 = await axios.get('http://localhost:3000/api/user');
//     const data2 = await response2.data.data;
//     setuser(data2);
// }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isi_saran, setIsiSaran] = useState('');
    const [id_user, setIdUser] = useState('');
    const [validation, setValidation] = useState({});
    const navigate = useNavigate();

    const handleIsiSaranChange = (e) => {
        setIsiSaran(e.target.value);
    };
    const handleIdUserChange = (e) => {
        setIdUser(e.target.value);
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('isi_saran', isi_saran);
        formData.append('id_user', id_user);

        try {
            await axios.post('http://localhost:3000/api/saran/store', formData, {
                
            });
            navigate('/saran');
            fetchData();
        } catch (error) {
            console.error('Kesalahan:', error);
            setValidation(error.response.data);
        }
    };

    const [editData, setEditData] = useState({
        id_saran:null,
        isi_saran: '',
        id_user:''
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

        formData.append('id_saran', editData.id_saran);
        formData.append('isi_saran', editData.isi_saran);
        formData.append('id_user', editData.id_user);

        try {
            await axios.patch(`http://localhost:3000/api/saran/update/${editData.id_saran}`, formData,{
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            navigate('/saran');
            fetchData();
            setShowEditModal(false);
        } catch (error) {
            console.error('Kesalahan:', error);
            setValidation(error.response.data);
        }
    };

    const handleDelete = (id_saran) => {
        axios
        .delete(`http://localhost:3000/api/saran/delete/${id_saran}`)
        .then((response) => {
            console.log('Data berhasil dihapus');
            const updatesaran = saran.filter((item)=> item.id_saran !== id_saran);
            setSaran(updatesaran);
        })
        .catch((error) => {
            console.error('Gagal menghapus data:', error);
            alert('Gagal menghapus data. Silahkan coba lagi atau hubungi administrator.');
        });
    };

    return(
        <Container>
            <Row>
                <Col>
                <h2>Data Komentar</h2>
                <Button  variant="primary" onClick={handleShow}>Tambah </Button>
                </Col>
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Isi Komentar</th>
                        <th scope="col">user</th>
                        <th scope="col" colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { saran.map((saran, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{saran.isi_saran}</td>
                            <td>{saran.nama_user}</td>
                            <td>
                                <button onClick={() => handleShowEditModal(saran)} className='btn btn-sm btn-info'>
                                    Edit 
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(saran.id_saran)} className='btn btn-sm btn-danger' >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </Row>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">isi_saran:</label>
                            <input type="text" className="form-control" value={isi_saran} onChange={handleIsiSaranChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">user:</label>
                            <select type="text" className="form-control" value={id_user} onChange={handleIdUserChange}>
                            {user.map((user) => (
                                <option key={user.id_user} value={user.id_user}>
                                    {user.nama_user}
                                </option>
                            ))}
                            </select>
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
                        <label className="form-label">isi_saran:</label>
                        <input
                        type="text"
                        className="form-control"
                        value={editData ? editData.isi_saran : ''}
                        onChange={(e) => handleEditDataChange('isi_saran', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">user:</label>
                        <select
                        className="form-select"
                        value={editData ? editData.id_user : ''}
                        onChange={(e) => handleEditDataChange('id_user', e.target.value)}
                        >
                        {user.map((user) => (
                            <option key={user.id_user} value={user.id_user}>
                            {user.id_user}
                            </option>
                        ))}
                        </select>
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

export default Saran;