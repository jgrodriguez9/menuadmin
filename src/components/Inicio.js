import { useState } from "react"
import { Col, Jumbotron, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import CardMenu from "./CardMenu"

export default function Inicio({firebaseDB}){
    const [menuses, setMenuses]  = useState([])
    return (
        <Row>
            {
                menuses.length === 0 ? 
                <Col xs="12" md="12">
                    <Jumbotron className="my-5">
                        <div className="text-center">
                            <h2>Es hora de crear nuestro primer menú</h2>
                            <Link to="/nuevomenu" className="btn btn-info">Crear menú</Link>
                        </div>
                    </Jumbotron>
                </Col> :
                menuses.map((item,i)=>(
                    <Col xs="12" md="6" key={i}>
                        <CardMenu item={item}/>
                    </Col>
                ))
            }
        </Row>
    )
}