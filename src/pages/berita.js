import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Berita() {

const [berita, setBerita] = useState([]);
const [admin, setAdmin] = useState([]);

const url = "http://localhost:3000/static/";
useEffect(() => {
    fetchData();
}, []);
const fetchData = async () => {
    try {
        const response1 = await axios.get('http://localhost:3000/api/berita');
        setBerita(response1.data.data);

        const response2 = await axios.get('http://localhost:3000/api/admin');
        setAdmin(response2.data.data);
    } catch (error) {
        console.error('Kesalahan:', error);
    }
};
// const fetchData = async () =>{
//     const response1 = await axios.get('http://localhost:3000/api/berita');
//     const data1 = await response1.data.data;
//     setBerita(data1);

//     const response2 = await axios.get('http://localhost:3000/api/admin');
//     const data2 = await response2.data.data;
//     setAdmin(data2);
// }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [judul_berita, setJudulBerita] = useState('');
    const [jenis_berita, setJenisBerita] = useState('');
    const [tgl_berita, setTglBerita] = useState('');
    const [file_berita, setFileBerita] = useState(null);
    const [id_presenter, setIdPresenter] = useState('');
    const [id_admin, setIdAdmin] = useState('');
    const [validation, setValidation] = useState({});
    const navigate = useNavigate();

    const handlejudul_beritaChange = (e) => {
        setJudulBerita(e.target.value);
    };
    const handlejenis_beritaChange = (e) => {
        setJenisBerita(e.target.value);
    };
    const handletgl_beritaChange = (e) => {
        setTglBerita(e.target.value);
    };
    const handlefile_beritachange = (e) => {
        const file = e.target.files[0];
        setFileBerita(file);
    };
    const handleid_presenter = (e) => {
        setIdPresenter(e.target.value);
    };
    const handleid_admin = (e) => {
        setIdAdmin(e.target.value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('judul_berita', judul_berita);
        formData.append('jenis_berita', jenis_berita);
        formData.append('tgl_berita', tgl_berita);
        formData.append('file_berita', file_berita);
        formData.append('id_presenter', id_presenter);
        formData.append('id_admin', id_admin);

        try {
            await axios.post('http://localhost:3000/api/berita/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/berita');
            fetchData();
        } catch (error) {
            console.error('Kesalahan:', error);
            setValidation(error.response.data);
        }
    };

    const [editData, setEditData] = useState({
        id_m:null,
        judul_berita: '',
        jenis_berita: '',
        tgl_berita: '',
        id_presenter:'',
        id_admin:''
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

        formData.append('id_m', editData.id_m);
        formData.append('judul_berita', editData.judul_berita);
        formData.append('jenis_berita', editData.jenis_berita);
        formData.append('tgl_berita', editData.tgl_berita);
        formData.append('id_presenter', editData.id_presenter);
        formData.append('id_admin', editData.id_admin);

        if (editData.file_berita){
            formData.append('file_berita', editData.file_berita);
        }

        try {
            await axios.patch(`http://localhost:3000/api/berita/update/${editData.id_m}`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/berita');
            fetchData();
            setShowEditModal(false);
        } catch (error) {
            console.error('Kesalahan:', error);
            setValidation(error.response.data);
        }
    };

    const handleDelete = (id_m) => {
        axios
        .delete(`http://localhost:3000/api/berita/delete/${id_m}`)
        .then((response) => {
            console.log('Data berhasil dihapus');
            const updateberita = berita.filter((item)=> item.id_m !== id_m);
            setBerita(updateberita);
        })
        .catch((error) => {
            console.error('Gagal menghapus data:', error);
            alert('Gagal menghapus data. Silahkan coba lagi atau hubungi administrator.');
        });
    };

    return(
        <Container>
            <Row>
                <div className="backgroud bg-dark text-white">
                <Col>
                <h2>Data Berita</h2>
                <Button  variant="primary" onClick={handleShow}>Tambah </Button>
                </Col>
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Judul Berita</th>
                        <th scope="col">Jenis Berita</th>
                        <th scope="col">Tanggal </th>
                        <th scope="col">File</th>
                        <th scope="col">Presenter</th>
                        <th scope="col">Admin</th>
                        <th scope="col" colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { berita.map((berita, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{berita.judul_berita}</td>
                            <td>{berita.jenis_berita}</td>
                            <td>{berita.tgl_berita}</td>
                            <td><img src={url + berita.file_berita} height="100"/></td>
                            <td>{berita.presenter}</td>
                            <td>{berita.admin}</td>
                            <td>
                                <button onClick={() => handleShowEditModal(berita)} className='btn btn-sm btn-info'>
                                    Edit 
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(berita.id_m)} className='btn btn-sm btn-danger' >
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
                            <label className="form-label">Judu Berita:</label>
                            <input type="text" className="form-control" value={judul_berita} onChange={handlejudul_beritaChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Jenis Berita:</label>
                            <input type="text" className="form-control" value={jenis_berita} onChange={handlejenis_beritaChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tanggal:</label>
                            <input type="text" className="form-control" value={tgl_berita} onChange={handletgl_beritaChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">File:</label>
                            <input type="file" className="form-control" accept="image/*" onChange={handlefile_beritachange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Presenter:</label>
                            <select type="text" className="form-control" value={id_presenter} onChange={handleid_presenter}>
                            {admin.map(([presenter]) => (
                                <option key={[presenter].id_presebter} value={[presenter].id_presebter}>
                                    {[presenter].nama_presenter}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">admin:</label>
                            <select type="text" className="form-control" value={id_presenter} onChange={handleid_admin}>
                            {admin.map((admin) => (
                                <option key={admin.id_admin} value={admin.id_admin}>
                                    {admin.nama_admin}
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
                        <label className="form-label">judul_berita:</label>
                        <input
                        type="text"
                        className="form-control"
                        value={editData ? editData.judul_berita : ''}
                        onChange={(e) => handleEditDataChange('judul_berita', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">jenis_berita:</label>
                        <input
                        type="text"
                        className="form-control"
                        value={editData ? editData.jenis_berita : ''}
                        onChange={(e) => handleEditDataChange('jenis_berita', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">tgl_berita:</label>
                        <input
                        type="text"
                        className="form-control"
                        value={editData ? editData.tgl_berita : ''}
                        onChange={(e) => handleEditDataChange('tgl_berita', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">file_berita:</label>
                        <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => handleEditDataChange('file_berita', e.target.files[0])}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">presenter:</label>
                        <select
                        className="form-select"
                        value={editData ? editData.id_presenter : ''}
                        onChange={(e) => handleEditDataChange('id_presenter', e.target.value)}
                        >
                        {admin.map((berita) => (
                            <option key={berita.id_presenter} value={berita.id_presenter}>
                            {berita.nama_presenter}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">admin:</label>
                        <select
                        className="form-select"
                        value={editData ? editData.id_admin : ''}
                        onChange={(e) => handleEditDataChange('id_admin', e.target.value)}
                        >
                        {admin.map((berita) => (
                            <option key={berita.id_admin} value={berita.id_admin}>
                            {berita.nama_admin}
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

export default Berita;