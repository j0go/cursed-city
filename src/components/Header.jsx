export default function Header({isOpen}) {
    return (
        <header id="header" className="d-flex flex-column justify-content-center">
            <nav id="navbar" className="navbar nav-menu">
            <ul>
                <li><a href="#hero" className="nav-link scrollto active"><i className="bx bx-home"></i> <span>Home</span></a></li>
                <li><a href="#shuffler" className="nav-link scrollto"><i className="bx bx-server"></i> <span>Shuffler</span></a></li>
            </ul>
            </nav>
        </header>
    )
}