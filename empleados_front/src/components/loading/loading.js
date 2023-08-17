import React from 'react'
import { Spinner } from 'react-bootstrap'; 
import './loading.css';
export default class loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            this.setState({ show: this.props.show });
        }
    }

    render() { 
        return ( 
            <>
            {this.state.show ? (
            <div id="loading-backdrop">
                <Spinner animation="border" className="custom-spinner" />
            </div>
            ) : null}
            </>
         );
    }
}
 
