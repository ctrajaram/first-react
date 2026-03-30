import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'

export default function Header() {
    return (
        <header className="header">
            <Link to="/">
                <img src={reactLogo} className="nav-logo" alt="React logo" />
            </Link>
            <nav>
               <ul className="nav-list">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/search">Search</Link></li>
                </ul>
            </nav>
        </header>
    )
}
