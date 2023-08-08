import React from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import '../../empleados/empleados.buscar.css';
import '../../style.css';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';

export default class MaterialesCrear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rediret: false,
            message: {
                text:"",
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
        this.setState({
            loading: true
        });
        request
        .post("/materiales", this.state.material)
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
                    <h4>New material</h4>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={(e) => this.setValue("nombre", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Bright</Form.Label>
                            <Form.Control onChange={(e) => this.setValue("brillo", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Surface</Form.Label>
                            <Form.Control onChange={(e) => this.setValue("superficie", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Gallon price</Form.Label>
                            <Form.Control onChange={(e) => this.setValue("precio_galon", e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Coverage per square meter</Form.Label>
                            <Form.Control onChange={(e) => this.setValue("cubrimiento", e.target.value)}/>
                        </Form.Group>
                        <Button id="boton-crear-usuario" onClick={() => console.log(this.guardarMateriales())}>
                            Save Material
                        </Button>
                    </Form>
                </Row>
            </Container>
        );
    }
}
