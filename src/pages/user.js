// import { Container, Row, Col, Button, Modal } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// function User() {

// const [user, setUser] = useState([]);

// const url = "http://localhost:3000/static/";
// useEffect(() => {
//     fectData();
// }, []);
// const fectData = async () => {
//     try {
//         const response1 = await axios.get('http://localhost:3000/api/user');
//         const data1 = await response1.data.data;
//         setUser(data1);

//     } catch (error) {
//         console.error('Kesalahan:', error);
//     }
// };
// // const fectData = async () =>{
// //     const response1 = await axios.get('http://localhost:3000/api/user');
// //     const data1 = await response1.data.data;
// //     setUser(data1);
// // }

//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const [nama_user, setNamauser] = useState('');
//     const [no_hp, setNoHp] = useState('');
//     const [email_user, setEmailuser] = useState('');
//     const [gender, setgender] = useState('');
//     const [ttl, setTTL] = useState('');
//     const [pw_user, setPWuser] = useState('');
//     const [file_user, setfile_user] = useState(null);
//     const [validation, setValidation] = useState({});
//     const navigate = useNavigate();

//     const handleNamauserChange = (e) => {
//         setNamauser(e.target.value);
//     };
//     const handleNoHPChange = (e) => {
//         setNoHp(e.target.value);
//     };
//     const handleEmailuserChange = (e) => {
//         setEmailuser(e.target.value);
//     };
//     const handleGenderChange = (e) => {
//         setgender(e.target.value);
//     };
//     const handleTTLChange = (e) => {
//         setTTL(e.target.value);
//     };
//     const handlePWuserChange = (e) => {
//         setPWuser(e.target.value);
//     };
//     const handlefile_userChange = (e) => {
//         const file = e.target.files[0];
//         setfile_user(file);
//     };

    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();

//         formData.append('nama_user', nama_user);
//         formData.append('no_hp', no_hp);
//         formData.append('email_user', email_user);
//         formData.append('gender', gender);
//         formData.append('ttl', ttl);
//         formData.append('pw_user', pw_user);
//         formData.append('file_user', file_user);

//         try {
//             await axios.post('http://localhost:3000/api/user/store', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             navigate('/user');
//             fectData();
//         } catch (error) {
//             console.error('Kesalahan:', error);
//             setValidation(error.response.data);
//         }
//     };

//     const [editData, setEditData] = useState({
//         id_user:null,
//         nama_user: '',
//         no_hp: '',
//         email_user: '',
//         gender:'',
//         ttl:'',
//         pw_user:''
//     });

//     const [showEditModal, setShowEditModal] = useState(false);

//     const handleShowEditModal = (data) => {
//         setEditData(data);
//         setShowEditModal(true);
//         setShow(false);
//     };

//     const handleCloseEditModal = () => {
//         setShowEditModal(false);
//         setEditData(null);
//     };

//     const handleEditDataChange = (field, value) => {
//         setEditData((prevData) => ({
//             ...prevData,
//             [field]: value,
//         }));
//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();

//         formData.append('id_user', editData.id_user);
//         formData.append('nama_user', editData.nama_user);
//         formData.append('no_hp', editData.no_hp);
//         formData.append('email_user', editData.email_user);
//         formData.append('gender', editData.gender);
//         formData.append('ttl', editData.ttl);
//         formData.append('pw_user', editData.pw_user);

//         if (editData.file_user){
//             formData.append('file_user', editData.file_user);
//         }

//         try {
//             await axios.patch(`http://localhost:3000/api/user/update/${editData.id_user}`, formData,{
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             navigate('/user');
//             fectData();
//             setShowEditModal(false);
//         } catch (error) {
//             console.error('Kesalahan:', error);
//             setValidation(error.response.data);
//         }
//     };

//     const handleDelete = (id_user) => {
//         axios
//         .delete(`http://localhost:3000/api/user/delete/${id_user}`)
//         .then((response) => {
//             console.log('Data berhasil dihapus');
//             const updateuser = user.filter((item)=> item.id_user !== id_user);
//             setUser(updateuser);
//         })
//         .catch((error) => {
//             console.error('Gagal menghapus data:', error);
//             alert('Gagal menghapus data. Silahkan coba lagi atau hubungi useristrator.');
//         });
//     };

//     return(
//         <Container>
//             <Row>
                
//             <div className="backgroud ">
//                 <Col>
//                 <h2>Data user</h2>
//                 <Button  variant="primary" onClick={handleShow}>Tambah </Button>
//                 </Col>
//                 <table className="table">
//                 <thead>
//                     <tr>
//                         <th scope="col">No</th>
//                         <th scope="col">Nama user</th>
//                         <th scope="col">No HP</th>
//                         <th scope="col">Email</th>
//                         <th scope="col">Gender</th>
//                         <th scope="col">TTL</th>
//                         <th scope="col">Password</th>
//                         <th scope="col">File</th>
//                         <th scope="col" colSpan={2}>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     { user.map((user, index) => (
//                         <tr>
//                             <td>{index + 1}</td>
//                             <td>{user.nama_user}</td>
//                             <td>{user.no_hp}</td>
//                             <td>{user.email_user}</td>
//                             <td>{user.gender}</td>
//                             <td>{user.ttl}</td>
//                             <td>{user.pw_user}</td>
//                             <td><img src={url + user.file_user} alt={user.file_user}height="100"/></td>
//                             <td>
//                                 <button onClick={() => handleShowEditModal(user)} className='btn btn-sm btn-info'>
//                                     Edit 
//                                 </button>
//                             </td>
//                             <td>
//                                 <button onClick={() => handleDelete(user.id_user)} className='btn btn-sm btn-danger' >
//                                     Hapus
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//                 </table>
//                 </div>
//             </Row>
//             <Modal show={show} onHide={handleClose} >
//                 <Modal.Header closeButton>
//                     <Modal.Title>Tambah Data</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-3">
//                             <label className="form-label">Nama user:</label>
//                             <input type="text" className="form-control" value={nama_user} onChange={handleNamauserChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">No HP:</label>
//                             <input type="text" className="form-control" value={no_hp} onChange={handleNoHPChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Email:</label>
//                             <input type="text" className="form-control" value={email_user} onChange={handleEmailuserChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">gender:</label>
//                             <input type="text" className="form-control" value={gender} onChange={handleGenderChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">ttl:</label>
//                             <input type="date" className="form-control" value={ttl} onChange={handleTTLChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">Password:</label>
//                             <input type="password" className="form-control" value={pw_user} onChange={handlePWuserChange} />
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label">file_user:</label>
//                             <input type="file" className="form-control" accept="image/*" onChange={handlefile_userChange} />
//                         </div>
//                         <button onClick={handleClose} type="submit" className="btn btn-primary">Kirim</button>
//                     </form>
//                 </Modal.Body>
//             </Modal>
//             <Modal show={showEditModal} onHide={handleCloseEditModal}>
//                 <Modal.Header closeButton>
//                 <Modal.Title>Edit Data</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                 <form onSubmit={handleUpdate}>
//                     <div className="mb-3">
//                         <label className="form-label">nama_user:</label>
//                         <input
//                         type="text"
//                         className="form-control"
//                         value={editData ? editData.nama_user : ''}
//                         onChange={(e) => handleEditDataChange('nama_user', e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">no_hp:</label>
//                         <input
//                         type="text"
//                         className="form-control"
//                         value={editData ? editData.no_hp : ''}
//                         onChange={(e) => handleEditDataChange('no_hp', e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Email:</label>
//                         <input
//                         type="text"
//                         className="form-control"
//                         value={editData ? editData.email_user : ''}
//                         onChange={(e) => handleEditDataChange('email_user', e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">gender:</label>
//                         <input
//                         type="text"
//                         className="form-control"
//                         value={editData ? editData.gender : ''}
//                         onChange={(e) => handleEditDataChange('gender', e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">ttl:</label>
//                         <input
//                         type="date"
//                         className="form-control"
//                         value={editData ? editData.ttl : ''}
//                         onChange={(e) => handleEditDataChange('ttl', e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">Password:</label>
//                         <input
//                         type="text"
//                         className="form-control"
//                         value={editData ? editData.pw_user : ''}
//                         onChange={(e) => handleEditDataChange('pw_user', e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label">file_user:</label>
//                         <input
//                         type="file"
//                         className="form-control"
//                         accept="image/*"
//                         onChange={(e) => handleEditDataChange('file_user', e.target.files[0])}
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-primary">
//                         Simpan Perubahan
//                     </button>
//                     </form>
//                 </Modal.Body>
//             </Modal>
//         </Container>
//     )
// }

// export default User;