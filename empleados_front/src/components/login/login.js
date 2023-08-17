import React from 'react';
import axios from 'axios';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import app from '../../app.json';
import './login.css';
import {isNull} from 'util';
import Cookies from "universal-cookie";
import {calcularExpiracionSesion} from '../helper/helper';
import Loading from '../loading/loading';

const {APIHOST} = app;
const cookies = new Cookies();

export function cerrarSesion(){
    cookies.remove('_s', { path: '/' });
    // Redireccionar a la página de inicio de sesión
    window.location.href = "/login";
}
export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Loading: false,
            usuario: '',
            pass: '',
        };
    }
    iniciarSesion() {
        this.setState({loading: true});
        axios.post(`${APIHOST}/usuarios/login/`, {
            usuario: this.state.usuario,
            pass: this.state.pass,
        })
        .then((response) => {
            if (isNull(response.data.token)) {
                alert("usuario o contraseña invalidos");
            }else {
                cookies.set('_s', response.data.token, {
                    path: "/",
                    expires: calcularExpiracionSesion(),
                });
                this.props.history.push(window.open("/administrador"));
                
            }
            this.setState({loading: false});
        })
        .catch((error) => {
            console.log(error);
            this.setState({loading: false});
    });
}

    render() {
        return (
            <Container id="login-container">
                <Loading show = {this.state.loading}/>
                <Row>
                    <Col id = "col-ct">
                        <Row>
                            <Col
                                sm="12"
                                sx="12"
                                md={{ span: 3, offset: 4 }}
                                lg={{ span: 3, offset: 4 }}
                                xl={{ span: 3, offset: 4 }}
                                id="col-sign">
                                <h2>Sign in</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col id='col-login'
                                sm="12"
                                sx="12"
                                md={{ span: 3, offset: 4 }}
                                lg={{ span: 3, offset: 4 }}
                                xl={{ span: 3, offset: 4 }}>
                                <Form>
                                    <Form.Group>
                                        <Form.Label className="Form-Label">Email address</Form.Label>
                                        <Form.Control
                                            onChange={(e) =>
                                                this.setState({ usuario: e.target.value })} />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label className="Form-Label">Password</Form.Label>
                                        <Form.Control type="password" name="password" autocomplete="current-password"
                                            onChange={(e) =>
                                                this.setState({ pass: e.target.value })} />
                                    </Form.Group>
                                    <Button id="login-button"
                                        type="submit"
                                        onClick={() => {
                                            this.iniciarSesion();
                                        }}>
                                        login
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Container>
        );
    }
}