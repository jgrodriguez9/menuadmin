import firebase from 'firebase/app'
import 'firebase/storage'
import { Field, Formik } from 'formik';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import * as Yup from 'yup';



export default function NuevoMenu({auth, firebaseDB}){
    const storage = firebase.storage()

    const shemaValidate = Yup.object().shape({
        name: Yup.string()
            .required('Campo Requerido'),
        sesion: Yup.string()
            .required('Campo Requerido'),
        active: Yup.string()
            .required('Campo Requerido'),
    });


    return (
        <Row className="mt-5">
            <Col xs="12" md="12">
                <Formik
                    initialValues={{name:'', sesion: '', active: true}}
                    validationSchema={shemaValidate}
                    onSubmit={(values, { setSubmitting, setFieldValue,setFieldError }) => {    
                        console.log(values)                                                               
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
                        <Card className="border-0"> 
                            <Card.Body>
                                <Row className="mt-5">    
                                    <Col xs="6" md="6">
                                        <Form.Group>
                                            <Form.Label className="label-default">Nombre</Form.Label>
                                            <Field 
                                                type="text"
                                                className={`${errors.name && 'input-error'} form-control input-default`}
                                                name="name"
                                            />
                                            {errors.name && <Form.Control.Feedback type="invalid" >{errors.name}</Form.Control.Feedback>}
                                        </Form.Group>
                                    </Col>
                                    <Col xs="3" md="3">
                                        <Form.Group>
                                            <Form.Label className="label-default">Sesión</Form.Label>
                                            <Field 
                                                as="select"
                                                className={`${errors.sesion && 'input-error'} form-control input-default`}
                                                name="sesion"
                                            >
                                                <option value="">Seleccionar</option>
                                                <option value="AM">AM</option>
                                                <option value="AM">PM</option>
                                            </Field>
                                            {errors.sesion && <Form.Control.Feedback type="invalid" >{errors.sesion}</Form.Control.Feedback>}
                                        </Form.Group>
                                    </Col> 
                                    <Col xs="3" md="3">
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
                                        <Button variant="light" type="submit" className="btn-save px-3 w-25 border-lg">Guardar</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Form>
                )}
                </Formik>
            </Col>
        </Row>
    )




}