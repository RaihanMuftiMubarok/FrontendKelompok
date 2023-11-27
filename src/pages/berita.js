import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const token = localStorage.getItem('token');
function Berita() {

const [berita, setBerita] = useState([]);
const [presenter, setPresenter] = useState([]);

const url = "http://localhost:3000/static/";
useEffect(() => {
    fetchData();
}, []);

const fetchData = async () => {
    try {
        const headers = {
            Authorization: `Bearer  ${token}`,
        };
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response1 = await axios.get('http://localhost:3000/api/berita');
        const data1 = await response1.data.data;
        setBerita(data1);
        
        const response2 = await axios.get('http://localhost:3000/api/presenter');
        const data2 = await response2.data.data;
        setPresenter(data2);
    } catch (error) {
        console.error('Kesalahan:', error);
    }
};

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [judul_berita, setJudulBerita] = useState('');
    const [jenis_berita, setJenisBerita] = useState('');
    const [tgl_berita, setTglBerita] = useState('');
    const [file_berita, setFileBerita] = useState(null);
    const [id_presenter, setIdPresenter] = useState('');
    const [validation, setValidation] = useState({});
    const navigate = useNavigate();

    const handleJudulBeritaChange = (e) => {
        setJudulBerita(e.target.value);
    };
    const handleJenisBeritaChange = (e) => {
        setJenisBerita(e.target.value);
    };
    const handleTglBeritaChange = (e) => {
        setTglBerita(e.target.value);
    };
    const handleFileBeritaChange = (e) => {
        const file = e.target.files[0];
        setFileBerita(file);
    };
    const handleIdPresenterChange = (e) => {
        setIdPresenter(e.target.value);
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('judul_berita', judul_berita);
        formData.append('jenis_berita', jenis_berita);
        formData.append('tgl_berita', tgl_berita);
        formData.append('file_berita', file_berita);
        formData.append('id_presenter', id_presenter);

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
        id_berita:null,
        judul_berita: '',
        jenis_berita: '',
        tgl_berita: '',
        id_presenter:''
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

        formData.append('id_berita', editData.id_berita);
        formData.append('judul_berita', editData.judul_berita);
        formData.append('jenis_berita', editData.jenis_berita);
        formData.append('tgl_berita', editData.tgl_berita);
        formData.append('id_presenter', editData.id_presenter);

        if (editData.file_berita){
            formData.append('file_berita', editData.file_berita);
        }

        try {
            await axios.patch(`http://localhost:3000/api/berita/update/${editData.id_berita}`, formData,{
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

    const handleDelete = (id_berita) => {
        axios
        .delete(`http://localhost:3000/api/berita/delete/${id_berita}`,{

        })
        .then((response) => {
            console.log('Data berhasil dihapus');
            const updateberita = berita.filter((item)=> item.id_berita !== id_berita);
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
                <div className="backgroud  text-white">
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
                            <td>{berita.nama_presenter}</td>
                            <td>
                                <button onClick={() => handleShowEditModal(berita)} className='btn btn-sm btn-info'>
                                    Edit 
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(berita.id_berita)} className='btn btn-sm btn-danger' >
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
                            <label className="form-label">Judul Berita:</label>
                            <input type="text" className="form-control" value={judul_berita} onChange={handleJudulBeritaChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Jenis Berita:</label>
                            <input type="text" className="form-control" value={jenis_berita} onChange={handleJenisBeritaChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tanggal:</label>
                            <input type="date" className="form-control" value={tgl_berita} onChange={handleTglBeritaChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">File:</label>
                            <input type="file" className="form-control" accept="image/*" onChange={handleFileBeritaChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Presenter:</label>
                            <select type="text" className="form-control" value={id_presenter} onChange={handleIdPresenterChange}>
                            {presenter.map((presenter) => (
                                <option key={presenter.id_presenter} value={presenter.id_presenter}>
                                    {presenter.nama_presenter}
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
                        type="date"
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
                        {presenter.map((presenter) => (
                            <option key={presenter.id_presenter} value={presenter.id_presenter}>
                            {presenter.nama_presenter}
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
