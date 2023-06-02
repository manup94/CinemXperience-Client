import { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'
import { AuthContext } from './../../context/auth.context'
import { ThemeContext } from '../../context/theme.context';
import * as Switch from '@radix-ui/react-switch';
import './Navigation.css'

const Navigation = () => {

    const { user, logout } = useContext(AuthContext)

    const { theme, switchTheme } = useContext(ThemeContext)

    const variant = theme === 'light' ? 'dark' : 'light'

    const [isNavbarVisible, setIsNavbarVisible] = useState(true);

    const [prevScrollPos, setPrevScrollPos] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setIsNavbarVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);



    return (

        <div className='navbar-container'>
            <Navbar
                bg={variant}
                variant={variant}
                expand="lg"
                className={`navbar ${isNavbarVisible ? 'visible' : 'hidden'}`}
                key={user?.username}>

                <Container>
                    <Navbar.Brand>
                        <Link to={'/'} className='nav-link'> CinemXperience </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to={'/combos'} className='nav-link'> Combos </Link>
                            {
                                user?.role === 'ADMIN'
                                    ?
                                    <>
                                        <NavDropdown title="Panel de Admin" id="basic-nav-dropdown" className="custom-nav-dropdown">
                                            <NavDropdown.Item as={'span'}>
                                                <Link to={'/admin/pass/create'} className='dropdown-item'> Nueva Sesión </Link>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item as={'span'}>
                                                <Link to={'/admin/combo/create'} className='dropdown-item'> Nuevo Combo </Link>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item as={'span'}>
                                                <Link to={'/admin/pass'} className='dropdown-item'> Lista de sesiones </Link>
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                    :
                                    <>
                                    </>
                            }
                            {
                                user
                                    ?
                                    <>
                                        <NavDropdown.Item as={'span'}>
                                            <Link onClick={logout} className='nav-link'> Logout </Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={'span'}>
                                            <Link to={'/profile'} className='nav-link'> {user?.username}! </Link>
                                        </NavDropdown.Item>
                                    </>
                                    :
                                    <>
                                        <NavDropdown title="Auth" id="basic-nav-dropdown" className="custom-nav-dropdown">
                                            <NavDropdown.Item as={'span'}>
                                                <Link to={'/signup'} className='dropdown-item'> Registro </Link>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item as={'span'}>
                                                <Link to={'/login'} className='dropdown-item'> Iniciar Sesion </Link>
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                            }
                        </Nav>
                        <div className='justify-content-end'>
                            <form>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label className="Label" htmlFor="airplane-mode" style={{ paddingRight: 15 }}>
                                    </label>
                                    <Switch.Root onClick={switchTheme} className="SwitchRoot" id="airplane-mode">
                                        <Switch.Thumb className="SwitchThumb"> </Switch.Thumb>
                                    </Switch.Root>
                                </div>
                            </form>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation