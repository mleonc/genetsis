import React from 'react';
import { Route, Switch } from 'react-router'
import Lista from '../Containers/Lista'
import Datatable from '../Containers/Datatable'


export const Routes = (
  <div className="App">
    <Switch>
      <Route path="/datatable" render={ () => (
        <Datatable />
      )}/>

      <Route path="/" render={ () => (
        <Lista />
      )}/>
    </Switch>
  </div>
);  