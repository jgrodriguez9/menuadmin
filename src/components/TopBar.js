import { useContext } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import 'firebase/auth'
import { NavLink } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import firebase from 'firebase/app'
import 'firebase/auth'
import { RiLogoutBoxRLine } from "react-icons/ri";

function TopBar(){
    const { setAuthData } = useContext(authContext);
    const fireAuth = firebase.auth();

    const logout=e=>{
        fireAuth.signOut();
        setAuthData(null);
    }
    
    return(
        <Navbar bg="light" expand="lg" className="py-2 shadow-sm">
            <NavLink exact to="/" className="navbar-brand px-3">
                Administración
                {/* <img src="" alt="Logo" className="w-150p" /> */}
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {/* <Nav className="mr-auto">
                    <NavLink exact to="/empresas/minerva" className="nav-link px-3 ft-top" activeClassName="active">Inicio</NavLink>
                    <NavLink exact to="/empresas/minerva/tarjetas" className="nav-link px-3 ft-top" activeClassName="active">Tarjetas</NavLink>
                    <NavLink exact to="/empresas/minerva/media" className="nav-link px-3 ft-top" activeClassName="active">Media</NavLink>                                
                </Nav> */}
                <Nav className="ml-auto">
                <NavDropdown title="" className="icon-logout drop-right">
                    <NavDropdown.Item as="button" onClick={e=>logout()} className="font-weight-bold"><RiLogoutBoxRLine className="text-blue mb-1 icon-1-3rem"/> Salir</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                
            </Navbar.Collapse>

        </Navbar>
    )
}

export default TopBar