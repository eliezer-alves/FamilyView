import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import newPerson from './pages/NewPerson';
import updatePerson from './pages/UpdatePerson';
import Person from './pages/Person'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/persons/new" component={newPerson} />;
                <Route path="/persons/update" component={updatePerson} />;
                <Route path="/person/" component={Person} />;
} />
            </Switch>
        </BrowserRouter>
    );
}
