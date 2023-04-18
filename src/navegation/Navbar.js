import { Link } from "react-router-dom"

function Navbar(){
    return(
        <body>
            <header>
                <nav>
                    <a className="logo"><Link to="/">FISH PARK PROJECT</Link></a>
                    <ul className="nav-list">
                    <Link to="/featured"><li>FEATURED</li></Link>
                    <Link to="/register"><li>REGISTRAR</li></Link>
                    <Link to="/login"><li>ENTRAR</li></Link>
                    </ul>
                </nav>
            </header>
        </body>
    )
}

export default Navbar