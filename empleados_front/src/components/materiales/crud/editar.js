import React from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import '../../empleados/empleados.buscar.css';
import '../../style.css';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';
import ConfirmationPrompts from '../../prompts/confirmation';

export default class MaterialesEditar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idMaterial: this.props.getIdMaterial(),
            rediret: false,
            message: {
                text:"",
                show: false,
            },
            confirmation:{
                title: 'Modificar Material',
                text: '¿desea modificar el material?',
                show: false,
            },
            loading: false,
            material:{
                nombre: "",
                brillo: "",
                superficie: "",
                precio_galon: "",
                cubrimiento: "",
            },
        };
        this.onExitedMessage = this.onExitedMessage.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    componentDidMount(){
        this.getMaterial();
    }

    getMaterial(){
        this.setState({
            loading: true
        });
        request
        .get(`/materiales/${this.state.idMaterial}`)
        .then((response) => {
            this.setState({
                material: response.data,
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
            material: {
                ...this.state.material, 
                [inicio]: value,
            },
        });
    }
    
    guardarMateriales(){
        this.setState({loading: true});
        request
        .put(`/materiales/${this.state.idMaterial}`, this.state.material)
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
        this.guardarMateriales()
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
                    <h4>Edit material</h4>
                    <Form id="formulario-crear-usuario">
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            value= {this.state.material.nombre}
                            onChange={(e) => this.setValue("nombre", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Bright</Form.Label>
                            <Form.Control 
                            value= {this.state.material.brillo}
                            onChange={(e) => this.setValue("brillo", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Surface</Form.Label>
                            <Form.Control 
                            value= {this.state.material.superficie}
                            onChange={(e) => this.setValue("superficie", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Gallon Price</Form.Label>
                            <Form.Control 
                            value= {this.state.material.precio_galon}
                            onChange={(e) => this.setValue("precio_galon", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Coverage per square meter</Form.Label>
                            <Form.Control 
                            value= {this.state.material.cubrimiento}
                            onChange={(e) => this.setValue("cubrimiento", e.target.value)}/>
                        </Form.Group>
                        <Button id="boton-crear-usuario" 
                        onClick={() => 
                        this.setState({
                            confirmation: { ...this.state.confirmation, show: true,}
                        })}
                        >
                            Save  Edit Material
                        </Button>
                    </Form>
                </Row>
            </Container>
        );
    }
}
