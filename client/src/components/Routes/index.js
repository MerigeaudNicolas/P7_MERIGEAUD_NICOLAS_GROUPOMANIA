// import de react + reacr-router-dom

import React from 'react';
import { Route, Switch, } from 'react-router-dom';

// Création des liens vers les pages Home et Profil

import Home from "../../pages/Home"
import Profil from "../../pages/Profil"
import Navbar from '../Navbar';

// Création des routes vers les pages

const index = () => {
    return (
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/profil" component={Profil} />
            </Switch>
        </div>
    );
};

export default index; 