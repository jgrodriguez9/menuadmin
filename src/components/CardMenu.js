import { Card, Col, Dropdown, Jumbotron, Row } from "react-bootstrap";
import { FaPencilAlt, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CardMenu({item, onHandleDeleteSection}){
    return (
        <Card className="shadow-sm">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <h6>{item.menu.name_es}</h6>
                    <Link className="font-size-08rem text-secondary" to={`/menu/${item.id}`}><FaPencilAlt /></Link>                    
                </div>                
                <Dropdown.Divider />
                {
                    item.menu.section.length === 0 ?
                    <Row>
                        <Col>
                            <Jumbotron className="text-center">
                                <h5>Crea la primera sección</h5>
                                <Link to={`/seccion/${item.id}/000nuevo`} className="btn btn-link btn-sm">Crear</Link>
                            </Jumbotron>
                        </Col>
                    </Row> :
                    <Row>
                        {
                            item.menu.section.map((sect, i)=>(
                                <Col xs="12" md="12"  key={i} className="mb-2">
                                    <Card className="shadow-sm">
                                        <Card.Body className="py-2">
                                            <div className="d-flex justify-content-between">
                                                <span className="font-weight-bold">
                                                    <Link to={`/seccion/${item.id}/${sect.id}`} className="text-dark">{sect.name_es}</Link>
                                                </span>
                                                <div>
                                                    <span className="text-primary mr-3">{sect.productos.length} producto(s)</span>
                                                    <span 
                                                        className="text-danger cursor-pointer"
                                                        onClick={e=>onHandleDeleteSection(i, item.id)}
                                                        data-testid="test"
                                                    ><FaTimesCircle /></span>
                                                </div>                                                
                                            </div>
                                        </Card.Body>
                                        
                                    </Card>
                                </Col>
                            ))
                        }
                        <Col xs="12" md="12" className="mt-4 text-center">
                            <Link to={`/seccion/${item.id}/000nuevo`} className="btn btn-info btn-sm">Crear nueva sección</Link>
                        </Col>
                    </Row>
                }
            </Card.Body>
        </Card>
    )
}

