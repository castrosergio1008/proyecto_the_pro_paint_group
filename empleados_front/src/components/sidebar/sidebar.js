import React from 'react';
import {Nav, Row} from 'react-bootstrap';
import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserTie, faFillDrip, faAddressCard} from '@fortawesome/free-solid-svg-icons';


export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <Nav defaultActiveKey="/home" className="flex-column" >
                <Row id="div-admin">
                    <h6 id="title-administrator">Administrator</h6>
                </Row>
                <Nav.Link eventKey="link-1" href="/empleados" className="link-sidebar">
                    <FontAwesomeIcon icon={faUserCircle} clasName="iconSidebar"/>  Users</Nav.Link>
                <Nav.Link eventKey="link-2" href="/clientes" className="link-sidebar">
                    <FontAwesomeIcon icon={faUserTie} clasName="iconSidebar"/>  Customers</Nav.Link>
                <Nav.Link eventKey="link-3" href="/materiales" className="link-sidebar">
                    <FontAwesomeIcon icon={faFillDrip} clasName="iconSidebar" />  Materials</Nav.Link>
                <Nav.Link eventKey="link-4" className="link-sidebar">
                    <FontAwesomeIcon icon={faAddressCard} clasName="iconSidebar" /> My profile
                </Nav.Link>
            </Nav>
        );
    }
}
