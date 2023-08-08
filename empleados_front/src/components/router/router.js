import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../login/login';
import PrivateRoute from '../auth/privaterouter';
import Empleados from '../empleados/inicio';
import Clientes from '../clientes/inicio';
import Materiales from '../materiales/inicio';
import Administrador from '../administrador/administrador';

export default function AppRouter() {
        return ( 
            <Router>
                <Switch>
                    <Route exact path={["/", "/login"]} component={Login}/>
                    <Route exact path={["/index"]} component={Login}/>
                    <PrivateRoute exact path = {"/empleados"} component = {Empleados}/>
                    <PrivateRoute exact path = {"/clientes"} component = {Clientes}/>
                    <PrivateRoute exact path = {"/materiales"} component = {Materiales}/>
                    <PrivateRoute exact path = {"/administrador"} component = {Administrador}/>
                    <Route path = {"*"} component = {() => (
                        <h1 style={{marginTop: 300}}>
                        404
                        <br/>
                        Página no encontrada
                        </h1>
                    )} />
                </Switch>
            </Router>
         );
}
