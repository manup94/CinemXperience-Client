import { useContext } from 'react'
import './Footer.css'
import { ThemeContext } from '../../context/theme.context'

const Footer = () => {

    const { theme } = useContext(ThemeContext)

    const themeStyle = {
        backgroundColor: theme === 'dark' ? 'rgb(248 249 250)' : '#212429',
        color: theme === 'dark' ? 'black' : 'white',
    }

    return (
        <footer style={themeStyle}>
            <section>
                <h5>Informacion de Contacto</h5>
                <address className="address">BandoleroShop C/ Arjona, 23  41001 Sevilla, España  +34 (0) 619 193
                    088</address>
                <h5>Siguenos:</h5>
                <ul className="logo-container">
                    <li>
                        <a href="#"><img className="rsss-logo" src="images/icons/twitter.png" alt="twitter-logo"></img></a>
                    </li>
                    <li>
                        <a href="#"><img className="rsss-logo" src="images/icons/facebook.png" alt="facebook-logo"></img></a>
                    </li>
                    <li>
                        <a href="#"><img className="rsss-logo" src="images/icons/instagram.png" alt="instagram-logo"></img></a>
                    </li>
                </ul>
            </section>

        </footer>
    )
}

export default Footer