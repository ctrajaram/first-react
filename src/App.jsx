import './App.css'
import Header from './Header'
import Footer from './Footer'
import MainContent from './MainContent'
import Blog from './Blog'


export default function App() {
    return (
        <div className="page">
            <Header />
            <Blog />
            <Footer />
        </div>
    )
}
