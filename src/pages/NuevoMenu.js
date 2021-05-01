import { Field, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Loading from '../loader/Loading';



export default function NuevoMenu({auth, firebaseDB}){
    const {id} = useParams()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(true)
    const shemaValidate = Yup.object().shape({
        // name_es: Yup.string()
        //     .required('Campo Requerido'),
        // name_en: Yup.string()
        //     .required('Campo Requerido'),
        orden: Yup.number()
            .min(0, "Campo permitido para mayores o iguales a cero")
            .required('Campo Requerido'),
        active: Yup.string()
            .required('Campo Requerido'),
    });
    const [initialValues, setInitialValues] = useState({
        name_es:'',
        name_en:'', 
        orden: 0, 
        active: true
    })

    useEffect(()=>{
        //console.log(id)
        setLoadingData(true)
        if(id!=="000nuevo"){
            firebaseDB.collection("menu").doc(id).get()
            .then(resp=>{
                let obj = {
                    name_es: resp.data().name_es,
                    name_en:resp.data().name_en, 
                    orden: resp.data().orden, 
                    active: resp.data().active
                }
                setInitialValues(obj)
                setLoadingData(false)
            })
        }else{
            setLoadingData(false)
        }
    },[id])


    return (
        <Row className="mt-5">
            {
                loadingData ? <Col xs="12" md="12"><Loading /></Col> :
                <Col xs="12" md="12">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={shemaValidate}
                        onSubmit={(values, { setSubmitting, setFieldValue,setFieldError }) => {  
                            setLoading(true)  
                            if(id==="000nuevo"){
                                values["section"] = []
                                //console.log(values)   
                                firebaseDB.collection("menu").add(values)
                                .then(() => {
                                    //console.log("Document successfully written!");
                                    setLoading(false)
                                    history.replace("/")
                                })
                                .catch((error) => {
                                    setLoading(false)
                                    alert("Error writing document: ", error);
                                }); 
                            }else{
                                firebaseDB.collection("menu").doc(id).set(values, {merge: true})
                                .then(()=>{
                                    setLoading(false)
                                    history.replace("/")
                                })
                                .catch(err=>{
                                    setLoading(false)
                                    alert("Error: "+err)
                                })
                            }                                                                                  
                        }}
                    >{({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue
                    })=>(
                        <Form onSubmit={handleSubmit}>
                            {loading && <Loading texto="Procesando solicitud"/>}
                            <Card className="border-0"> 
                                <Card.Body>
                                    <Row className="mt-5">    
                                        <Col xs="12" md="3">
                                            <Form.Group>
                                                <Form.Label className="label-default">Nombre (ES)</Form.Label>
                                                <Field 
                                                    type="text"
                                                    className={`${errors.name_es && 'input-error'} form-control input-default`}
                                                    name="name_es"
                                                />
                                                {errors.name_es && <Form.Control.Feedback type="invalid" >{errors.name_es}</Form.Control.Feedback>}
                                            </Form.Group>
                                        </Col>
                                        <Col xs="12" md="3">
                                            <Form.Group>
                                                <Form.Label className="label-default">Nombre (EN)</Form.Label>
                                                <Field 
                                                    type="text"
                                                    className={`${errors.name_en && 'input-error'} form-control input-default`}
                                                    name="name_en"
                                                />
                                                {errors.name_en && <Form.Control.Feedback type="invalid" >{errors.name_en}</Form.Control.Feedback>}
                                            </Form.Group>
                                        </Col>
                                        <Col xs="12" md="3">
                                            <Form.Group>
                                                <Form.Label className="label-default">Orden</Form.Label>
                                                <Field 
                                                    type="number"
                                                    className={`${errors.orden && 'input-error'} form-control input-default`}
                                                    name="orden"
                                                />
                                                {errors.orden && <Form.Control.Feedback type="invalid" >{errors.orden}</Form.Control.Feedback>}
                                            </Form.Group>
                                        </Col> 
                                        <Col xs="12" md="3">
                                            <Form.Group>
                                                <Form.Label className="label-default opacity-0">Activo</Form.Label>
                                                <label className="mb-3 form-control border-0">
                                                    <Field type="checkbox" name="active" /> Activo
                                                </label>
                                                {errors.active && <Form.Control.Feedback type="invalid" >{errors.active}</Form.Control.Feedback>}
                                            </Form.Group>
                                        </Col>                                
                                    </Row>
                                    <Row className="mt-3">
                                        <Col xs="12" md="12">
                                            <Button variant="light" type="submit" className="btn-save px-3 border-lg">Guardar</Button>{' '}
                                            <Link to="/" className="text-secondary">Cancelar</Link>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Form>
                    )}
                    </Formik>
                </Col>
            }
        </Row>
    )
}