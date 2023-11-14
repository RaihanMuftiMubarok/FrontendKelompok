import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Presenter() {

const [presenter, setPresenter] = useState([]);

const url = "http://localhost:3000/static/";
useEffect(() => {
    fetchData();
}, []);
// const fetchData = async () => {
//     try {
//         const response1 = await axios.get('http://localhost:3000/api/presenter');
//         setPresenter(response1.data.data);

//     } catch (error) {
//         console.error('Kesalahan:', error);
//     }
// };
const fetchData = async () =>{
    const response1 = await axios.get('http://localhost:3000/api/presenter');
    const data1 = await response1.data.data;
    setPresenter(data1);
}

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [nama_presenter, setNamaPresenter] = useState('');
    const [no_hp, setNoHp] = useState('');
    const [gender, setgender] = useState('');
    const [file_presenter, setfile_presenter] = useState(null);
    const [validation, setValidation] = useState({});
    const navigate = useNavigate();

    const handlenama_presenterChange = (e) => {
        setNamaPresenter(e.target.value);
    };
    const handleno_hpChange = (e) => {
        setNoHp(e.target.value);
    };
    const handlegender = (e) => {
        setgender(e.target.value);
    };
    const handlefile_presenterChange = (e) => {
        const file = e.target.files[0];
        setfile_presenter(file);
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('nama_presenter', nama_presenter);
        formData.append('no_hp', no_hp);
        formData.append('gender', gender);
        formData.append('file_presenter', file_presenter);

        try {
            await axios.post('http://localhost:3000/api/presenter/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/presenter');
            fetchData();
        } catch (error) {
            console.error('Kesalahan:', error);
            setValidation(error.response.data);
        }
    };

    const [editData, setEditData] = useState({
        id_presenter:null,
        nama_presenter: '',
        no_hp: '',
        gender:''
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

        formData.append('id_presenter', editData.id_presenter);
        formData.append('nama_presenter', editData.nama_presenter);
        formData.append('no_hp', editData.no_hp);
        formData.append('gender', editData.gender);

        if (editData.file_presenter){
            formData.append('file_presenter', editData.file_presenter);
        }

        try {
            await axios.patch(`http://localhost:3000/api/presenter/update/${editData.id_presenter}`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/presenter');
            fetchData();
            setShowEditModal(false);
        } catch (error) {
            console.error('Kesalahan:', error);
            setValidation(error.response.data);
        }
    };

    const handleDelete = (id_presenter) => {
        axios
        .delete(`http://localhost:3000/api/presenter/delete/${id_presenter}`)
        .then((response) => {
            console.log('Data berhasil dihapus');
            const updatepresenter = presenter.filter((item)=> item.id_presenter !== id_presenter);
            setPresenter(updatepresenter);
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
                <h2>Data presenter</h2>
                <Button  variant="primary" onClick={handleShow}>Tambah </Button>
                </Col>
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama Presenter</th>
                        <th scope="col">No HP</th>
                        <th scope="col">Gender</th>
                        <th scope="col">File</th>
                        <th scope="col" colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { presenter.map((mh, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{mh.nama_presenter}</td>
                            <td>{mh.no_hp}</td>
                            <td>{mh.gender}</td>
                            <td><img src={url + mh.file_presenter} height="100"/></td>
                            <td>
                                <button onClick={() => handleShowEditModal(mh)} className='btn btn-sm btn-info'>
                                    Edit 
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(mh.id_presenter)} className='btn btn-sm btn-danger' >
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
                            <label className="form-label">Nama Presenter:</label>
                            <input type="text" className="form-control" value={nama_presenter} onChange={handlenama_presenterChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">No HP:</label>
                            <input type="text" className="form-control" value={no_hp} onChange={handleno_hpChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">gender:</label>
                            <input type="text" className="form-control" value={gender} onChange={handlegender} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">file_presenter:</label>
                            <input type="file" className="form-control" accept="image/*" onChange={handlefile_presenterChange} />
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
                        <label className="form-label">nama_presenter:</label>
                        <input
                        type="text"
                        className="form-control"
                        value={editData ? editData.nama_presenter : ''}
                        onChange={(e) => handleEditDataChange('nama_presenter', e.target.value)}
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
                        <label className="form-label">gender:</label>
                        <input
                        type="text"
                        className="form-control"
                        value={editData ? editData.gender : ''}
                        onChange={(e) => handleEditDataChange('gender', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">file_presenter:</label>
                        <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => handleEditDataChange('file_presenter', e.target.files[0])}
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

export default Presenter;