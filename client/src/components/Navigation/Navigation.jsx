import { useContext } from 'react';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'
import { AuthContext } from './../../context/auth.context'
import { ThemeContext } from '../../context/theme.context';
import './Navigation.css'

const Navigation = () => {

    const { user, logout } = useContext(AuthContext)

    const { theme, switchTheme } = useContext(ThemeContext)

    const themeStyle = {
        backgroundColor: theme === 'dark' ? 'rgb(248 249 250)' : '#212429',
        color: theme === 'dark' ? 'black' : 'white',
    }

    const variant = theme === 'light' ? 'dark' : 'light'



    return (


        <Navbar bg={variant} variant={variant} expand="lg" className='mb-5'>
            <Container>
                <Navbar.Brand>
                    <Link to={'/'} className='nav-link'> CinemXperience </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to={'/pass'} className='nav-link'> Sesiones </Link>
                        <Link to={'/combos'} className='nav-link'> Combos </Link>
                        <NavDropdown title="Admin" id="basic-nav-dropdown" className="custom-nav-dropdown">
                            <Link to={'/admin/pass/create'} className='dropdown-item'> Nueva Sesión </Link>
                            <Link to={'/admin/combo/create'} className='dropdown-item'> Nuevo Combo </Link>
                        </NavDropdown>
                        {
                            user
                                ?
                                <>
                                    <NavDropdown.Item>
                                        <Link onClick={logout} className='nav-link'> Logout </Link>
                                    </NavDropdown.Item>
                                    <Link to={'/profile'} className='nav-link'> {user.username}! </Link>
                                </>
                                :
                                <>
                                    <NavDropdown title="Auth" id="basic-nav-dropdown" className="custom-nav-dropdown">
                                        <Link to={'/signup'} className='dropdown-item'> Registro </Link>
                                        <Link to={'/login'} className='dropdown-item'> Iniciar Sesion </Link>
                                    </NavDropdown>
                                </>
                        }
                    </Nav>
                    <div className='justify-content-end'>
                        <Navbar.Text onClick={switchTheme}>
                            {theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}
                        </Navbar.Text>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation