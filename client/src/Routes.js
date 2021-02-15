import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Login from "./Login";
import Login2 from "./Login2";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Dashboard2 from "./Dashboard2";
import history from './history';


export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/login" component={Login} />
                    <Route path="/board" component={Login2} />
                    <Route path="/register" component={Register} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/dashboard-board" component={Dashboard2} />
                </Switch>
            </Router>
        )
    }
}