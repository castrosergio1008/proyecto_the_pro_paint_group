import React from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import '../../empleados/empleados.buscar.css';
import '../../style.css';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';
import ConfirmationPrompts from '../../prompts/confirmation';

export default class ClientesEditar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idCliente: this.props.getIdCliente(),
            rediret: false,
            message: {
                text:"",
                show: false,
            },
            confirmation:{
                title: 'Modificar Cliente',
                text: '¿desea modificar el cliente?',
                show: false,
            },
            loading: false,
            cliente:{
                nombre: "",
                apellido_p: "",
                apellido_m: "",
                telefono: "",
                mail: "",
                direccion: "",
            },
        };
        this.onExitedMessage = this.onExitedMessage.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    componentDidMount(){
        this.getCliente();
    }

    getCliente(){
        this.setState({
            loading: true
        });
        request
        .get(`/clientes/${this.state.idCliente}`)
        .then((response) => {
            this.setState({
                cliente: response.data,
                loading: false,
            });
        })
        .catch((err)  => {
            console.error(err);
            this.setState({
                loading: false
            });
        });
    }
    setValue(inicio, value){
        this.setState({
            cliente: {
                ...this.state.cliente, 
                [inicio]: value,
            },
        });
    }
    
    guardarClientes(){
        this.setState({loading: true});
        request
        .put(`/clientes/${this.state.idCliente}`, this.state.cliente)
        .then((response) => {
            if(response.data.exito){
            this.props.changeTab('buscar');
            }
            this.setState({loading: false});
            })
        .catch((err)  => {
            console.error(err);
            this.setState({loading: true});
        });
    }
    
    onExitedMessage(){
        if(this.state.rediret) this.props.changeTab('buscar');
    }

    onCancel(){
        this.setState({
            confirmation: {
                ...this.state.confirmation,
                show:false,
            },
        })
    }

    onConfirm(){
        this.setState({
            confirmation: {
                ...this.state.confirmation,
                show:false,
            },
        },
        this.guardarClientes()
        );
    }
    render() {
        return (
            <Container>
                <MessagePrompt text={this.state.message.text}
                show={this.state.message.show}
                duration={2500}
                onExited={this.onExitedMessage}/>
                <ConfirmationPrompts
                show={this.state.confirmation.show}
                title={this.state.confirmation.title}
                text= {this.state.confirmation.text}
                onCancel={this.onCancel}
                onConfirm={this.onConfirm}/>
                <Loading show={this.state.loading}/>
                <Row id="row-formulario">
                    <h4>Edit customer</h4>
                    <Form id="formulario-crear-usuario">
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            value= {this.state.cliente.nombre}
                            onChange={(e) => this.setValue("nombre", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control 
                            value= {this.state.cliente.apellido_p}
                            onChange={(e) => this.setValue("apellido_p", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Second Surname</Form.Label>
                            <Form.Control 
                            value= {this.state.cliente.apellido_m}
                            onChange={(e) => this.setValue("apellido_m", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control 
                            value= {this.state.cliente.telefono}
                            onChange={(e) => this.setValue("telefono", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Mail</Form.Label>
                            <Form.Control 
                            value= {this.state.cliente.mail}
                            onChange={(e) => this.setValue("mail", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Addres</Form.Label>
                            <Form.Control 
                            value= {this.state.cliente.direccion}
                            onChange={(e) => this.setValue("direccion", e.target.value)}/>
                        </Form.Group>
                        <Button id="boton-crear-usuario" 
                        onClick={() => 
                        this.setState({
                            confirmation: { ...this.state.confirmation, show: true,}
                        })}
                        >
                            Save  Edit Customer
                        </Button>
                    </Form>
                </Row>
            </Container>
        );
    }
}
