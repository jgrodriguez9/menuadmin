import LoginForm from '../components/LoginForm';
import { Container, Row } from 'react-bootstrap';

function Login(){    


    return(
        <div className="bg-login">
            <Container>
                <Row className="align-items-center justify-content-center pt-5 pt-8">
                    <LoginForm/>
                </Row>
            </Container>
        </div>
        
    )
    
}

export default Login