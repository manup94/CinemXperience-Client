import { useContext } from 'react';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'
import { AuthContext } from './../../context/auth.context'
import { ThemeContext } from '../../context/theme.context';

const Navigation = () => {

    const { user, logout } = useContext(AuthContext)

    const { theme, switchTheme } = useContext(ThemeContext)

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
                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                            <NavDropdown.Item>
                                <Link to={'/admin/pass/create'} className='nav-link'> Nueva Sesión </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to={'/admin/combo/create'} className='nav-link'> Nuevo Combo </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                        {
                            user
                                ?
                                <>
                                    <NavDropdown.Item>
                                        <Link onClick={logout} className='nav-link'> Logout </Link>
                                    </NavDropdown.Item>
                                    <Link to={'/profile'} className='nav-link'> hello there, {user.username}! </Link>
                                </>
                                :
                                <>
                                    <NavDropdown title="Auth" id="basic-nav-dropdown">
                                        <NavDropdown.Item>
                                            <Link to={'/signup'} className='nav-link'> Registro </Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item >
                                            <Link to={'/login'} className='nav-link'> Iniciar Sesion </Link>
                                        </NavDropdown.Item>
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