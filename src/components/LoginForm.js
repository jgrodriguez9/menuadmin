import { useContext } from 'react';
import { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { authContext } from '../context/AuthContext';
import 'firebase/auth'
import "firebase/firestore"
import firebase from 'firebase/app';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { Field, Formik } from 'formik';

function LoginForm(){
    const [message, setMessage] = useState('')
    const { setAuthData } = useContext(authContext)
    const auth = firebase.auth()
    const firebaseDB = firebase.firestore();
    const history = useHistory()

    const shema = Yup.object().shape({
        email: Yup.string()
            .required("Campo requerido"),
        password: Yup.string()
          .required("Campo requerido"),    
    });
        

    return(
        <Col lg="5">
            <Formik initialValues={{email:'' ,password: ''}}
            validationSchema={shema}
            onSubmit={(values, { setSubmitting,setFieldValue }) => { 
                //console.log(values)
                auth.signInWithEmailAndPassword(values.email, values.password)
                .then(response=>{             
                    setSubmitting(false)       
                    console.log(response.user.email)
                    setAuthData(response.user.email)
                    history.push("/")        
                })
                .catch(error => {
                    setSubmitting(false)
                    //console.log(error)
                    // Handle Errors here.                    
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode==='auth/user-not-found') {
                        setMessage("No se encuentra el usuario")
                    } else if(errorCode ==='auth/wrong-password'){
                        setMessage("Contraseña incorrecta")
                    } 
                    else {
                        setMessage(errorMessage)
                    }
                    // ...
                  });
            }}
        >
            {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
        }) => (
            <form className="user" onSubmit={handleSubmit}>                
                    <Card className="shadow px-5 pb-4 pt-0 rounded-lg mt-8 border-0">                           
                        <Card.Body className="text-center">
                            <span className="text-danger d-block">{message}</span> 
                            <Row>
                                <Col md="12">
                                    <div>
                                        <div className="form-group my-4">
                                            <Field 
                                                className={`${errors.email && 'error-bottom'} p-2 input-login w-100 border-top-0 border-right-0 border-left-0 border-radius-0 border-bottom-color-9 outline-0`}
                                                name="email" 
                                                type="email"
                                                placeholder="Correo electrónico" 
                                            />
                                            { errors.email && <div className="invalid-feedback d-block">{errors.email}</div> }  
                                        </div>
                                        <div className="form-group mb-5">
                                            <Field 
                                                className={`${errors.password && 'error-bottom'} p-2 input-login w-100 border-top-0 border-right-0 border-left-0 border-radius-0 border-bottom-color-9 outline-0`}
                                                name="password" 
                                                type="password"
                                                placeholder="Contraseña" 
                                            />
                                            { errors.password && <div className="invalid-feedback d-block">{errors.password}</div> }  
                                                                                                                    
                                        </div>
                                        <Button variant="secondary" className="btn-block my-4 btn-login" type="submit" disabled={isSubmitting}>
                                            {
                                                isSubmitting 
                                                ?  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
                                                : 'Iniciar'
                                            }
                                        </Button> 
                                    </div>
                                </Col>
                            </Row>                            
                        </Card.Body>
                    </Card>                    
                </form> 
            
            )}
            </Formik>  
        </Col>
        
    )
}

export default LoginForm