import { Container, Row, Col, Button, Modal, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");
function BeritaA() {
  const [berita, setBerita] = useState([]);
  const [presenter, setPresenter] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [beritaTerpilih, setBeritaTerpilih] = useState(null);
  const [tampilkanDeskripsiModal, setTampilkanDeskripsiModal] = useState(false);

  const url = "http://localhost:3000/static/";
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response1 = await axios.get("http://localhost:3000/api/berita/beritaA");
      const data1 = await response1.data.data;
      setBerita(data1);

      const response2 = await axios.get("http://localhost:3000/api/presenter/admin");
      const data2 = await response2.data.data;
      setPresenter(data2);

      const response3 = await axios.get("http://localhost:3000/api/authadmin");
      const data3 = await response3.data.data;
      setAdmin(data3);
    } catch (error) {
      console.error("Kesalahan:", error);
    }
  };

  const tutupModalDeskripsi = () => setTampilkanDeskripsiModal(false);

  const penanganKlikDeskripsi = (berita) => {
    setBeritaTerpilih(berita);
    setTampilkanDeskripsiModal(true);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [judul_berita, setJudulBerita] = useState("");
  const [jenis_berita, setJenisBerita] = useState("");
  const [tgl_berita, setTglBerita] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file_berita, setFileBerita] = useState(null);
  const [id_presenter, setIdPresenter] = useState("");
  const [id_admin, setIdAdmin] = useState("");
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
  const handleDeskripsiChange = (e) => {
    setDeskripsi(e.target.value);
  };
  const handleFileBeritaChange = (e) => {
    const file = e.target.files[0];
    setFileBerita(file);
  };
  const handleIdPresenterChange = (e) => {
    setIdPresenter(e.target.value);
  };
  const handleIdAdminChange = (e) => {
    setIdAdmin(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = {
    //   judul_berita: judul_berita,
    //   jenis_berita: jenis_berita,
    //   tgl_berita: tgl_berita,
    //   file_berita: file_berita,
    //   id_presenter: id_presenter,
    //   id_admin: id_admin,
    // };
    const formData = new FormData();

    formData.append("judul_berita", judul_berita);
    formData.append("jenis_berita", jenis_berita);
    formData.append("tgl_berita", tgl_berita);
    formData.append("deskripsi", deskripsi);
    formData.append("file_berita", file_berita);
    formData.append("id_presenter", id_presenter);
    formData.append("id_admin", id_admin);

    try {
      await axios.post("http://localhost:3000/api/berita/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/beritaA");
      fetchData();
    } catch (error) {
      console.error("Kesalahan:", error);
      setValidation(error.response.data);
    }
  };

  const [editData, setEditData] = useState({
    id_berita: null,
    judul_berita: "",
    jenis_berita: "",
    tgl_berita: "",
    deskripsi: "",
    id_presenter: "",
    id_admin: "",
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

    formData.append("id_berita", editData.id_berita);
    formData.append("judul_berita", editData.judul_berita);
    formData.append("jenis_berita", editData.jenis_berita);
    formData.append("tgl_berita", editData.tgl_berita);
    formData.append("deskripsi", editData.deskripsi);
    formData.append("id_presenter", editData.id_presenter);
    formData.append("id_admin", editData.id_admin);

    if (editData.file_berita) {
      formData.append("file_berita", editData.file_berita);
    }

    try {
      await axios.patch(
        `http://localhost:3000/api/berita/update/${editData.id_berita}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/beritaA");
      fetchData();
      setShowEditModal(false);
    } catch (error) {
      console.error("Kesalahan:", error);
      setValidation(error.response.data);
    }
  };

  const handleDelete = (id_berita) => {
    axios
      .delete(`http://localhost:3000/api/berita/delete/${id_berita}`, {})
      .then((response) => {
        console.log("Data berhasil dihapus");
        const updateberita = berita.filter(
          (item) => item.id_berita !== id_berita
        );
        setBerita(updateberita);
      })
      .catch((error) => {
        console.error("Gagal menghapus data:", error);
        alert(
          "Gagal menghapus data. Silahkan coba lagi atau hubungi administrator."
        );
      });
  };

  return (
    <Container>
      <Row>
        <div className="backgroud   ">
          <div className="home ">
            <div className="news-container">
              <p className="headline">HEADLINE HARI INI</p>
              <div className="marquee">
                <p>
                  Menjelang Pilpres 2024, sejumlah lembaga survei telah mulai
                  memberikan penilaiannya atas peluang masing-masing calon
                  presiden (capres).
                </p>
              </div>
            </div>

            <div className="container-2 ">
              <b>Berita Terkini</b>
              <Row className="justify-content-start flex-nowrap overflow-auto">
                {berita.map((berita, index) => (
                  <Col
                    key={index}
                    className="mb-3"
                    style={{ flex: "0 0 auto", maxWidth: "18rem" }}
                  >
                    <Card>
                      <Card.Body>
                        <Card.Img
                          src={url + berita.file_berita}
                          alt={berita.judul_berita}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <Card.Title>{berita.judul_berita}</Card.Title>
                        <Card.Text>{berita.jenis_berita}</Card.Text>
                        <Card.Text>{berita.tgl_berita}</Card.Text>

                        <Card.Text>
                          Presenter: {berita.nama_presenter}
                        </Card.Text>
                        <Card.Text>
                          Upload by admin: {berita.nama_admin}
                        </Card.Text>
                        <Card.Text>
                          <a
                            href="#"
                            onClick={() => penanganKlikDeskripsi(berita)}
                          >
                            Baca Selengkapnya
                          </a>
                        </Card.Text>
                        {/* Tambahkan tombol edit dan hapus di sini jika diperlukan */}
                        <td>
                          <button
                            onClick={() => handleShowEditModal(berita)}
                            className="btn btn-sm btn-warning"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pencil-square"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                              />
                            </svg>
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(berita.id_berita)}
                            className="btn btn-sm btn-danger"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg>
                          </button>
                        </td>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Modal
                show={tampilkanDeskripsiModal}
                onHide={tutupModalDeskripsi}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Selengkapnya</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {beritaTerpilih && (
                    <>
                      <img
                        src={url + beritaTerpilih.file_berita}
                        alt={beritaTerpilih.judul_berita}
                        style={{
                          width: "100%",
                          maxHeight: "250px",
                          objectFit: "cover",
                        }}
                      />
                      <p>{beritaTerpilih.deskripsi}</p>
                    </>
                  )}
                </Modal.Body>
              </Modal>
              <Button variant="primary" onClick={handleShow}>
                Tambah{" "}
              </Button>
              <div className="container-yt border-5">
                <b>Jelang Akhir Tahun</b>
                <div class="card-video mb-3">
                  <div class="row ">
                    <div class="col-md-3">
                      <div class="embed-responsive embed-responsive-16by9">
                        <iframe
                          class="embed-responsive-item"
                          src="https://www.youtube.com/embed/07hTE8I6x_A"
                          width="100%"
                        ></iframe>
                      </div>
                    </div>
                    <div class="col-md-5">
                      <div class="card-body">
                        <h5 class="card-title">
                          Update terkini konflik Palestina vs Israel
                        </h5>
                        <p class="card-text">
                          UPDATE TERKINI Konflik Palestina-Israel, Israel
                          Tembakkan Peluru dan Gas Air Mata ke Rumah Sakit
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-video mb-3">
                  <div class="row ">
                    <div class="col-md-3">
                      <div class="embed-responsive embed-responsive-16by9">
                        <iframe
                          class="embed-responsive-item"
                          src="https://www.youtube.com/embed/aeb_cS8jyXg"
                          width="100%"
                        ></iframe>
                      </div>
                    </div>
                    <div class="col-md-5">
                      <div class="card-body">
                        <h5 class="card-title">Korupsi BTS Kominfo</h5>
                        <p class="card-text">
                          Terungkap! Saksi Blak blakan Ada Makelar Tawarkan
                          Setop Perkara Korupsi BTS Johnny Plate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-video mb-3">
                  <div class="row ">
                    <div class="col-md-3">
                      <div class="embed-responsive embed-responsive-16by9">
                        <iframe
                          class="embed-responsive-item"
                          src="https://www.youtube.com/embed/tLC-A_CVzUA"
                          width="100%"
                        ></iframe>
                      </div>
                    </div>
                    <div class="col-md-5">
                      <div class="card-body">
                        <h5 class="card-title">
                          Kronologi Jatuhnya 2 Pesawat TNI AU
                        </h5>
                        <p class="card-text">
                          Breaking News! Kecelakaan Pesawat TNI AU di Lereng
                          Gunung Bromo Wilayah Pasuruan Jawa Timur
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Col>{/* <h2>Data Berita</h2> */}</Col>
        </div>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Judul Berita:</label>
              <input
                type="text"
                className="form-control"
                value={judul_berita}
                onChange={handleJudulBeritaChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Jenis Berita:</label>
              <input
                type="text"
                className="form-control"
                value={jenis_berita}
                onChange={handleJenisBeritaChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tanggal:</label>
              <input
                type="date"
                className="form-control"
                value={tgl_berita}
                onChange={handleTglBeritaChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Deskripsi:</label>
              <input
                type="text"
                className="form-control"
                value={deskripsi}
                onChange={handleDeskripsiChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">File:</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleFileBeritaChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Presenter:</label>
              <select
                type="text"
                className="form-control"
                value={id_presenter}
                onChange={handleIdPresenterChange}
              >
                {presenter.map((presenter) => (
                  <option
                    key={presenter.id_presenter}
                    value={presenter.id_presenter}
                  >
                    {presenter.nama_presenter}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">admin:</label>
              <select
                type="text"
                className="form-control"
                value={id_admin}
                onChange={handleIdAdminChange}
              >
                {admin.map((admin) => (
                  <option key={admin.id_admin} value={admin.id_admin}>
                    {admin.nama_admin}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleClose}
              type="submit"
              className="btn btn-primary"
            >
              Kirim
            </button>
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
                value={editData ? editData.judul_berita : ""}
                onChange={(e) =>
                  handleEditDataChange("judul_berita", e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">jenis_berita:</label>
              <input
                type="text"
                className="form-control"
                value={editData ? editData.jenis_berita : ""}
                onChange={(e) =>
                  handleEditDataChange("jenis_berita", e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tangga;l:</label>
              <input
                type="date"
                className="form-control"
                value={editData ? editData.tgl_berita : ""}
                onChange={(e) =>
                  handleEditDataChange("tgl_berita", e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Deskripsi:</label>
              <input
                type="text"
                className="form-control"
                value={editData ? editData.deskripsi : ""}
                onChange={(e) =>
                  handleEditDataChange("deskripsi", e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">file_berita:</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) =>
                  handleEditDataChange("file_berita", e.target.files[0])
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">presenter:</label>
              <select
                className="form-select"
                value={editData ? editData.id_presenter : ""}
                onChange={(e) =>
                  handleEditDataChange("id_presenter", e.target.value)
                }
              >
                {presenter.map((presenter) => (
                  <option
                    key={presenter.id_presenter}
                    value={presenter.id_presenter}
                  >
                    {presenter.nama_presenter}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Admin:</label>
              <select
                className="form-select"
                value={editData ? editData.id_admin : ""}
                onChange={(e) =>
                  handleEditDataChange("id_admin", e.target.value)
                }
              >
                {admin.map((admin) => (
                  <option
                    key={admin.id_admin}
                    value={admin.id_admin}
                  >
                    {admin.nama_admin}
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
  );
}

export default BeritaA;
