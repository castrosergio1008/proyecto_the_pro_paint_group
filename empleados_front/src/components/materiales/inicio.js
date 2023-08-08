import React from 'react';
import { Nav, Container, Row } from 'react-bootstrap';
import '../empleados/empleados.buscar.css';
import '../style.css';
import Sidebar from '../sidebar/sidebar';
import MaterialesBuscar from '../materiales/crud/buscar';
import MaterialesCrear from '../materiales/crud/crear';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import MaterialesEditar from '../materiales/crud/editar';

export default class Materiales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: "buscar",
            _id: null,
        };
        this.changeTab = this.changeTab.bind(this);
        this.setIdMaterial = this.setIdMaterial.bind(this);
        this.getIdMaterial = this.getIdMaterial.bind(this);
    }
    changeTab(tab){
        this.setState({currentTab: tab});
    }
    setIdMaterial(id){
        this.setState({_id: id});
    }

    getIdMaterial(){
        return this.state._id;
    }
    render() {
        return (
            <Container className="container-one">
                <Sidebar className="sidebar-lateral" />
                <Container className="div-one">
                    <Row id="row-manageUsers-inicio">
                        <FontAwesomeIcon icon={faUserCircle} id="icono-user" />
                        <h4 id="title-manageUsers">Manage Materials</h4>
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
                        (<MaterialesBuscar changeTab={this.changeTab}
                        setIdMaterial = {this.setIdMaterial}/>) : 
                        this.state.currentTab === "crear" ?
                        (<MaterialesCrear changeTab={this.changeTab} />) :
                        (<MaterialesEditar changeTab={this.changeTab}
                        getIdMaterial = {this.getIdMaterial}/>)
                    }
                    </Row>
                </Container>
            </Container>
        );
    }
}
