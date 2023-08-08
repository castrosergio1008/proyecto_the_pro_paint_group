import React from 'react';
import { Nav, Container, Row } from 'react-bootstrap';
import '../empleados/empleados.buscar.css';
import '../style.css';
import Sidebar from '../sidebar/sidebar';
import ClientesBuscar from '../clientes/crud/buscar';
import ClientesCrear from '../clientes/crud/crear';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ClientesEditar from '../clientes/crud/editar';

export default class Clientes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: "buscar",
            _id: null,
        };
        this.changeTab = this.changeTab.bind(this);
        this.setIdCliente = this.setIdCliente.bind(this);
        this.getIdCliente = this.getIdCliente.bind(this);
    }
    changeTab(tab){
        this.setState({currentTab: tab});
    }
    setIdCliente(id){
        this.setState({_id: id});
    }

    getIdCliente(){
        return this.state._id;
    }
    render() {
        return (
            <Container className="container-one">
                <Sidebar className="sidebar-lateral" />
                <Container className="div-one">
                    <Row id="row-manageUsers-inicio">
                        <FontAwesomeIcon icon={faUserCircle} id="icono-user" />
                        <h4 id="title-manageUsers">Manage Customers</h4>
                        <Nav id="nav-crud" fill variant="tabs" defaultActiveKey="/buscar"
                        onSelect={(eventKey) => this.setState({currentTab: eventKey})}>
                            <Nav.Item>
                                <Nav.Link eventKey="buscar">Search</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="crear">Create</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Row>
                    <Row>
                        {this.state.currentTab === "buscar" ? 
                        (<ClientesBuscar changeTab={this.changeTab}
                        setIdCliente = {this.setIdCliente}/>) : 
                        this.state.currentTab === "crear" ?
                        (<ClientesCrear changeTab={this.changeTab} />) :
                        (<ClientesEditar changeTab={this.changeTab}
                        getIdCliente = {this.getIdCliente}/>)
                    }
                    </Row>
                </Container>
            </Container>
        );
    }
}