import React from "react";
import {
  Navbar,
  Container,
  Nav,
  DropdownButton,
  Dropdown,
  Row,
} from "react-bootstrap";
import "./navbar.css";
import { cerrarSesion } from '../login/login';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import logo from './logo-pro.png';

export default class menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Navbar fixed="top" id="navbar" expand="lg" alt="logo">
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="" id="logo-pro"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="navbar" className="me-auto"></Nav>
            <DropdownButton
              id="dropdown-basic-button"
              title="User"
              variant="dark"
            >
              <Dropdown.Header id="dropdown-header">
                <Row>
                  <FontAwesomeIcon icon={faUserCircle} />
                </Row>
                <Row>#User#</Row>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item
                id="dropdown-item"
                onClick={() => {
                  cerrarSesion();
                }}
              >
                Sing out
              </Dropdown.Item>
              {/*<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
            </DropdownButton>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
