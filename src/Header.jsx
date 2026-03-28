import reactLogo from './assets/react.svg'
export default function Header() {
    return (
        <header className="header">
            <img src={reactLogo} className="nav-logo" alt="React logo" /> 
            <nav>
               <ul className="nav-list">
                    <li>Pricing</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </header>
    )
}