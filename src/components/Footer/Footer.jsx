import { useContext } from 'react'
import './Footer.css'
import { ThemeContext } from '../../context/theme.context'
import Map from '../Map/Map'

const Footer = () => {

    const { theme } = useContext(ThemeContext)

    const themeStyle = {
        backgroundColor: theme === 'dark' ? 'rgb(248 249 250)' : '#212429',
        color: theme === 'dark' ? 'black' : 'white',
    }

    return (
        <footer className='footer' style={themeStyle}>

            <div className='address-container'>
                <address className="address">
                    <p>CinemXperience </p>
                    <p>C/ Gran Via, 23  41300</p>
                    <p>Madrid, España </p>
                    <p> +34 619 193 088</p>
                </address>
            </div>
            <div className='rss-container'>
                <h5>Siguenos:</h5>
                <ul className="logo-container">
                    <li>
                        <a href="#"><img className="rsss-logo" src='../../../twitter.png' alt="twitter-logo"></img></a>
                    </li>
                    <li>
                        <a href="#"><img className="rsss-logo" src='../../../facebook.png' alt="facebook-logo"></img></a>
                    </li>
                    <li>
                        <a href="#"><img className="rsss-logo" src='../../../instagram.png' alt="instagram-logo"></img></a>
                    </li>
                </ul>
            </div>
            <Map></Map>

        </footer>
    )
}

export default Footer