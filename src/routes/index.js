import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import React from 'react';
import Main from '../pages/main';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
    </Switch>
  </BrowserRouter>
);

export default Router;
