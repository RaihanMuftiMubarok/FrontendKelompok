import "./Body.css";

function BodyA() {
  return (
    <div className="home ">
      <div className="news-container">
        <p className="headline">HEADLINE HARI INI</p>
        <div className="marquee">
          <p>
            Menjelang Pilpres 2024, sejumlah lembaga survei telah mulai
            memberikan penilaiannya atas peluang masing-masing calon presiden
            (capres).
          </p>
        </div>
      </div>

      <div className="container-1 ">
        <div className="container-2 ">
          <b>Berita Utama Lainnya</b>
          <div
            id="carouselExample"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="cards-wrapper">
                  <div class="card">
                    <img
                      src="img/carousel2.jpg"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <p class="card-text">
                        Serangan Udara Israel Hantam Permukiman Gaza, Puluhan
                        Warga Sipil Tewas
                      </p>
                    </div>
                  </div>
                  <div class="card">
                    <img
                      src="img/carousel1.jpg"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <p class="card-text">
                        2 Pesawat TNI AU Jatuh di Pasuruan, Kadispenau:
                        Kemungkinan Tidak Benturan
                      </p>
                    </div>
                  </div>
                  <div class="card">
                    <img
                      src="img/carousel3.jpg"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <p class="card-text">
                        Solidaritas untuk Palestina Bergema di Monumen Nasional,
                        Jakarta, Minggu (5/11/2023).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="carousel-item">
                <div class="cards-wrapper">
                  <div class="card">
                    <img
                      src="img/carousel4.jpg"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <p class="card-text">
                        Jadwal Diubah, Prabowo Bakal Ikuti Uji Publik
                        Capres-Cawapres Muhammadiyah
                      </p>
                    </div>
                  </div>
                  <div class="card">
                    <img
                      src="img/carousel5.jpg"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <p class="card-text">
                        Pilpres 2024: Anies-Muhaimin Nomor Urut 1,
                        Prabowo-Gibran Nomor Urut 2, Ganjar-Mahfud Nomor Urut 3
                      </p>
                    </div>
                  </div>
                  <div class="card">
                    <img
                      src="img/carousel6.jpg"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <p class="card-text">
                        Polri Waspadai Operasi Intelijen Asing pada Pilpres
                        2024, dari Aliran Dana Gelap hingga Serangan Siber
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="cards-wrapper">
                  <div class="card">
                    <img
                      src="img/carousel7.jpg"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <p class="card-text">
                        Komisi X DPR: Guru Harus Kreatif Manfaatkan Perangkat
                        Teknologi Informasi dan Komunikasi (TIK)
                      </p>
                    </div>
                  </div>
                  <div class="card">
                    <img
                      src="img/carousel8.jpg"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <p class="card-text">
                        Jelang Seleksi PTN SNBP 2024, Siswa Kelas 12 Harus
                        Ketahui Aturan Memilih Jurusan Kuliah
                      </p>
                    </div>
                  </div>
                  <div class="card">
                    <img
                      src="img/carousel9.jpg"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body">
                      <p class="card-text">
                        Kemendikbud: Pendidikan Vokasi Sejalan dengan
                        Pembangunan Ekonomi di Indonesia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

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
                      UPDATE TERKINI Konflik Palestina-Israel, Israel Tembakkan
                      Peluru dan Gas Air Mata ke Rumah Sakit
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
                      UPDATE TERKINI Konflik Palestina-Israel, Israel Tembakkan
                      Peluru dan Gas Air Mata ke Rumah Sakit
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
                      src="https://youtu.be/Z64UPZZaiqE"
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
                      Breaking News! Kecelakaan Pesawat TNI AU di Lereng Gunung
                      Bromo Wilayah Pasuruan Jawa Timur
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
export default BodyA;
