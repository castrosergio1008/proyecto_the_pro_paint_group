import React from 'react';
import { Row, Container } from 'react-bootstrap';
import '../../empleados/empleados.buscar.css';
import '../../style.css';
import DataGrid from '../../grid/grid';
import ConfirmationPrompts from '../../prompts/confirmation';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';

const columns = [{
    dataField: '_id',
    text: 'ID',
    hidden: true,
}, {
    dataField: 'nombre',
    text: 'Name of product',
}, {
    dataField: 'brillo',
    text: 'Bright',
}, {
    dataField: 'superficie',
    text: 'Surface',
}, {
    dataField: 'precio_galon',
    text: 'Gallon price',
}, {
    dataField: 'cubrimiento',
    text: 'Coverage per square meter',
}];

export default class MaterialesBuscar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            idMaterial: null,
            message:{
                text:'',
                show: false,
            },
            confirmation: {
                title: 'Eliminar Material',
                text: '¿desea eliminar el material?',
                show: false,
            }
        };
        this.onClickEditButton = this.onClickEditButton.bind(this);
        this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }
    componentDidMount() {

    }

    onClickEditButton(row){
        this.props.setIdMaterial(row._id);
        this.props.changeTab('editar');
    }

    onClickDeleteButton(row){
        this.setState({
            idMaterial: row._id,
            confirmation: {
                ...this.state.confirmation,
                show:true,
            },
        });
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
        this.eliminarMaterial()
        );
    }
    eliminarMaterial(){
        this.setState({loading:true});
        request
        .delete(`/materiales/${this.state.idMaterial}`)
        .then((response) => {
            this.setState({
                loading: false,
                message:{
                    text: response.data.msg,
                    show: true,
                },
            });
            this.setState({loading:false});
            if(response.data.exito) this.reloadPage();
        })
        .catch((err) => {
            console.error(err);
            this.setState({loading:false});
        });
    }
    reloadPage(){
        setTimeout(() => {
            window.location.reload();
        }, 2500)
    }
    render() {
        return (
        <Container>
             <ConfirmationPrompts
                show={this.state.confirmation.show}
                title={this.state.confirmation.title}
                text= {this.state.confirmation.text}
                onCancel={this.onCancel}
                onConfirm={this.onConfirm}/>
            <MessagePrompt
                text={this.state.message.text}
                show={this.state.message.show}
                duration={2500}
                onExited={this.onExitedMessage}
            />
            <Loading show={this.state.loading} />
            <Row>
                <DataGrid url="/materiales" columns={columns} 
                showEditButton={true}
                showDeleteButton={true}
                onClickEditButton = {this.onClickEditButton}
                onClickDeleteButton = {this.onClickDeleteButton} 
                />
            </Row>
        </Container>
        );
    }
}