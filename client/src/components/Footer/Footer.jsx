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
        <footer style={themeStyle}>Todo los derechos reservados</footer>
    )
}

export default Footer