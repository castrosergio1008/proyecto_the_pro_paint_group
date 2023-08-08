import React from 'react';
import { Nav, Container, Row } from 'react-bootstrap';
import '../empleados/empleados.buscar.css';
import '../style.css';
import Sidebar from '../sidebar/sidebar';
import EmpleadosBuscar from '../empleados/crud/buscar';
import EmpleadosCrear from '../empleados/crud/crear';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import EmpleadosEditar from '../empleados/crud/editar';

export default class Empleados extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: "buscar",
            _id: null,
        };
        this.changeTab = this.changeTab.bind(this);
        this.setIdEmpleado = this.setIdEmpleado.bind(this);
        this.getIdEmpleado = this.getIdEmpleado.bind(this);
    }
    changeTab(tab){
        this.setState({currentTab: tab});
    }
    setIdEmpleado(id){
        this.setState({_id: id});
    }

    getIdEmpleado(){
        return this.state._id;
    }
    render() {
        return (
            <Container className="container-one">
                <Sidebar className="sidebar-lateral" />
                <Container className="div-one">
                    <Row id="row-manageUsers-inicio">
                        <FontAwesomeIcon icon={faUserCircle} id="icono-user" />
                        <h4 id="title-manageUsers">Manage Users</h4>
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
                        (<EmpleadosBuscar changeTab={this.changeTab}
                        setIdEmpleado = {this.setIdEmpleado}/>) : 
                        this.state.currentTab === "crear" ?
                        (<EmpleadosCrear changeTab={this.changeTab} />) :
                        (<EmpleadosEditar changeTab={this.changeTab}
                        getIdEmpleado = {this.getIdEmpleado}/>)
                    }
                    </Row>
                </Container>
            </Container>
        );
    }
}

