import React from 'react';
import axios from 'axios';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import app from '../../app.json';
import './login.css';
import {isNull} from 'util';
import Cookies from "universal-cookie";
import {calcularExpiracionSesion} from '../helper/helper';

const {APIHOST} = app;
const cookies = new Cookies();

export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            pass: '',
        };
    }
    iniciarSesion() {
        alert("iniciando sesión");
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
            }
        })
        .catch((error) => {
            console.log(error);
    });
}
    render() {
        return (
            <Container id="login-container">
                <Row>
                    <Col>
                        <Row>
                            <Col
                                sm="12"
                                sx="12"
                                md={{ span: 3, offset: 4 }}
                                lg={{ span: 3, offset: 4 }}
                                xl={{ span: 3, offset: 4 }}>
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
                                                 {
                                            this.state.usuario
                                        }
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label className="Form-Label">Password</Form.Label>
                                        <Form.Control type="password"
                                            onChange={(e) =>
                                                this.setState({ pass: e.target.value })} />
                                                {
                                            this.state.pass
                                        }
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