import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Admin from "../pages/Admin";
import Berita from "../pages/berita";
import Presenter from "../pages/Presenter";
import Saran from "../pages/Saran";

function Routing() {
    return (
        <Router>
            <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
    <a class="navbar-brand" href="#">BeritaDy</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <Link class="nav-link active" to="/admin" >admin</Link>
        </li>
        <li class="nav-item">
            <Link class="nav-link" to="/berita" >berita</Link>
        </li>
        <li class="nav-item">
            <Link class="nav-link" to="/presenter" >presenter</Link>
        </li>
        <li class="nav-item">
            <Link class="nav-link" to="/saran" >saran</Link>
        </li>
        </ul>
    </div>
    </div>
</nav>
            <Routes>
                <Route path="/admin" element={<Admin/>} />
                <Route path="/berita" element={<Berita/>} /> 
                <Route path="/presenter" element={<Presenter/>} /> 
                <Route path="/saran" element={<Saran/>} /> 
            </Routes>
            </div>
        </Router>
    );
}

export default Routing;