import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import * as Yup from 'yup';
import Loading from "../loader/Loading";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Seccion({firebaseDB}){
    const {id} = useParams()
    const {idmenu} = useParams()
    const [product, setProduct] = useState([
        {
            name_es: '',
            name_en: '',
            precio: '',
            active: true,
            promocion: false,
            orden: 0
        }

    ])
    const [loading, setLoading] = useState(true)
    const [initialValues, setInitialValues] = useState({
        id: new Date().getTime(),
        name_es: '',
        name_en: '',
        active: true,
        orden: 0,
    })
    //console.log(initialValues.id)
    const [textoLoading, setTextoLoading] = useState("Cargando")
    const history = useHistory()

    const shemaValidate = Yup.object().shape({
        name_es: Yup.string()
            .required('Campo Requerido'),
        name_en: Yup.string()
            .required('Campo Requerido'),
        orden: Yup.number()
            .min(0, "Campo permitido para mayores o iguales a cero")
            .required('Campo Requerido'),
        active: Yup.string()
            .required('Campo Requerido'),
    });

    useEffect(()=>{
        setTextoLoading("Cargando")
        setLoading(true)
        //console.log(id)
        //console.log(idmenu)

        const menuS = async () =>{
            const menuCollection = await firebaseDB.collection("menu").doc(idmenu).get()
            if(menuCollection.data()){
                //console.log(menuCollection.data().section)
                if(menuCollection.data().section.findIndex(el=>el.id===parseInt(id)) !== -1){
                    let i = menuCollection.data().section.findIndex(el=>el.id===parseInt(id))
                    //console.log('ok')
                    let section = menuCollection.data().section[i]

                    let obj = {
                        id: section.id,
                        name_es: section.name_es,
                        name_en: section.name_en,
                        active: section.active,
                        orden: section.orden,
                        productos: section.productos
                    }
                    setProduct(obj.productos)
                    setInitialValues(obj)
                    setLoading(false)
                }else{
                    setLoading(false)
                }                
            }else{
                setLoading(false)
            }            
        }

        menuS()
    },[id, idmenu, firebaseDB])

    const handleUpdateProduct = (value, index, property) =>{        
        let arr = [...product]
        arr[index][property] = value        
        setProduct(arr)
    }

    const onHadleAddProduct = e =>{
        let arr = [...product]
        let obj = {
            name_es: '',
            name_en: '',
            precio: '',
            active: true,
            promocion: false,
            orden: 0
        }
        arr.push(obj)
        setProduct(arr)
    }

    const onClickDeleteProduct = (index) =>{
        let arr = [...product]
        arr.splice(index, 1)
        setProduct(arr)
    }

    return (
        <>
            {
                loading ? <Loading texto={textoLoading}/> :
                <Row className="mt-5">
                    <Col xs="12" md="12">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={shemaValidate}
                            onSubmit={(values, { setSubmitting, setFieldValue,setFieldError }) => {  
                                //setLoading(true)
                                setTextoLoading("Procesando solicitud")
                                setLoading(true)
                                let sec = {
                                    id: values.id,
                                    name_es: values.name_es,
                                    name_en: values.name_en,
                                    active: values.active,
                                    orden: values.orden,
                                    productos: product
                                }  
                                //console.log(sec)
                                
                                
                                //buscamos la section que estamos actualizando
                                //si no existe lo agregamos como nuevo
                                firebaseDB.collection("menu").doc(idmenu).get()
                                .then(resp=>{
                                   // console.log(resp.data())
                                    let seccions = resp.data().section
                                    if(resp.data().section.findIndex(el=>el.id===parseInt(id)) !== -1){
                                        let indexS = resp.data().section.findIndex(el=>el.id===parseInt(id))                                         
                                        seccions[indexS] = sec                                        
                                        firebaseDB.collection("menu").doc(idmenu).set({
                                            section: seccions
                                        }, {merge: true})
                                    }else{
                                        seccions.push(sec)
                                        firebaseDB.collection("menu").doc(idmenu).set({
                                            section: seccions
                                        }, {merge: true})
                                    }
                                    setLoading(false)
                                    history.replace("/")
                                    
                                })
                                .catch(error=>{
                                    alert("Error: "+error)
                                    setLoading(false)
                                })                                                     
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
                                        <h4>Sección</h4>
                                        <Row >    
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
                                            <Col xs="12" md="3">
                                                <Form.Group>
                                                    <Form.Label className="label-default">Observación</Form.Label>
                                                    <Field 
                                                        as="textarea"
                                                        rows="3"
                                                        className={`${errors.observacion && 'input-error'} form-control input-default`}
                                                        name="observacion"
                                                    />
                                                    {errors.observacion && <Form.Control.Feedback type="invalid" >{errors.observacion}</Form.Control.Feedback>}
                                                </Form.Group>
                                            </Col>                                
                                        </Row>
                                        <Row className="my-2">
                                            <Col xs="12" md="12">
                                                <h4>Productos</h4>
                                                <Table responsive>
                                                    <thead>
                                                        <tr>
                                                            <th width="25%">Nombre (ES)</th>
                                                            <th width="25%">Nombre (EN)</th>
                                                            <th width="10%">Precio</th>
                                                            <th width="10%" className="text-center">Activo</th>
                                                            <th width="10%" className="text-center">Promoción</th>
                                                            <th width="10%">Orden</th>
                                                            <th width="10%">
                                                                <span 
                                                                    className="cursor-pointer text-info font-size-08rem"
                                                                    onClick={onHadleAddProduct}
                                                                >
                                                                    <FaPlusCircle /> Agregar nuevo
                                                                </span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            product.map((p, i)=>(
                                                                <tr key={i}>
                                                                    <td>
                                                                        <Form.Control 
                                                                            type="text"
                                                                            size="sm" 
                                                                            value={p.name_es} 
                                                                            onChange={e=>handleUpdateProduct(e.target.value, i, "name_es")} 
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <Form.Control
                                                                            type="text" 
                                                                            size="sm" 
                                                                            value={p.name_en} 
                                                                            onChange={e=>handleUpdateProduct(e.target.value, i, "name_en")} 
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <Form.Control 
                                                                            type="number"
                                                                            min="0"
                                                                            size="sm" 
                                                                            value={p.precio} 
                                                                            onChange={e=>handleUpdateProduct(e.target.value, i, "precio")} 
                                                                        />
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <input 
                                                                            type="checkbox"
                                                                            checked={p.active} 
                                                                            onChange={e=>handleUpdateProduct(e.target.checked, i, "active")} 
                                                                        />
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <input 
                                                                            type="checkbox"
                                                                            checked={p.promocion} 
                                                                            onChange={e=>handleUpdateProduct(e.target.checked, i, "promocion")} 
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <Form.Control 
                                                                            type="number"
                                                                            min="0"
                                                                            size="sm" 
                                                                            value={p.orden} 
                                                                            onChange={e=>handleUpdateProduct(e.target.value, i, "orden")} 
                                                                        />
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span 
                                                                            className="font-size-08rem text-danger"
                                                                            onClick={e=>onClickDeleteProduct(i)}
                                                                        >
                                                                                <FaTrash />
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </Table>
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
                </Row>
            }
        </>
        
    )
}

