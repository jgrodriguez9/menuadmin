import { useContext } from 'react';
import { authContext } from '../context/AuthContext';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { Container, Row } from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import firebase from 'firebase/app'
import "firebase/firestore"
import 'firebase/auth'
import { useEffect } from 'react';
import NuevoMenu from './NuevoMenu';
import Inicio from '../components/Inicio';
import Seccion from './Seccion';

function Dashboard(){
    const { auth } = useContext(authContext);
    const firebaseDB = firebase.firestore();
    

    useEffect(()=>{
        //buscamos si hay menu creado




    },[])
    
    return(
        <>
            <TopBar />
            <Container fluid>
                <Switch>
                    <Route exact path="/"><Inicio firebaseDB={firebaseDB}/></Route>
                    <Route exact path="/menu/:id"><NuevoMenu firebaseDB={firebaseDB}/></Route>
                    <Route exact path="/seccion/:idmenu/:id"><Seccion firebaseDB={firebaseDB}/></Route>                        
                    {/* <Route exact path="/empresas/minerva/top-tarjetas"><TopTarjetaList auth={auth} firebaseDB={firebaseDB}/></Route> */}
                </Switch>
            </Container>
            <Footer /> 
        </>
    )
}

export  default Dashboard