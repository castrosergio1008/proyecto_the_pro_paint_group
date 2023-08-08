import React from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import '../empleados.buscar.css';
import '../../style.css';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';

export default class EmpleadosCrear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rediret: false,
            message: {
                text:"",
                show: false,
            },
            loading: false,
            empleado:{
                nombre: "",
                apellido_p: "",
                apellido_m: "",
                telefono: "",
                mail: "",
                direccion: "",
                pass: "",
            },
        };
        this.onExitedMessage = this.onExitedMessage.bind(this);
    }
    setValue(inicio, value){
        this.setState({
            empleado: {
                ...this.state.empleado, 
                [inicio]: value,
            },
        });
    }

    guardarEmpleados(){
        this.setState({
            loading: true
        });
        request
        .post("/empleados", this.state.empleado)
        .then((response) => {
            if(response.data.exito){
            this.setState({
                redirect: response.data.exito,
                message: {
                    text: response.data.msg,
                    show: true,
                },
            });
        }
            this.setState({loading: false});
        })
        .catch((err)  => {
            console.error(err);
            this.setState({
                loading: true
            });
        });
    }
    onExitedMessage(){
        if(this.state.redirect) this.props.changeTab('buscar');
    }
    render() {
        return (
            <Container>
                <MessagePrompt text={this.state.message.text}
                show={this.state.message.show}
                duration={2500}
                onExited={this.onExitedMessage}/>
                <Loading show={this.state.loading}/>
                <Row id="row-formulario">
                    <h4>New user</h4>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={(e) => this.setValue("nombre", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control onChange={(e) => this.setValue("apellido_p", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Second Surname</Form.Label>
                            <Form.Control onChange={(e) => this.setValue("apellido_m", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control onChange={(e) => this.setValue("telefono", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Mail</Form.Label>
                            <Form.Control onChange={(e) => this.setValue("mail", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Addres</Form.Label>
                            <Form.Control onChange={(e) => this.setValue("direccion", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => this.setValue("pass", e.target.value)} />
                        </Form.Group>
                        <Button id="boton-crear-usuario" onClick={() => console.log(this.guardarEmpleados())}>
                            Save User
                        </Button>
                    </Form>
                </Row>
            </Container>
        );
    }
}

