import React from 'react';
import Sidebar from '../sidebar/sidebar';
import './administrador.css';
import '../style.css';
import { Container } from 'react-bootstrap';

export default class Administrador extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <Container className="container-one">
                <Sidebar className="sidebar-lateral" />
                <div className="div-one">
                    <h1 style={{ marginTop: 100 }}>Administrador</h1>
                </div>
            </Container>
        );
    }
}

