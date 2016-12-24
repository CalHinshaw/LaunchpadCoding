import "phoenix_html"

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import SkillIndex from './pages/skills/SkillIndex'
import NotFound from './pages/misc/NotFound'


const router = (
  <ApolloProvider client={client}>
    <Router history={ browserHistory } >
      <Route path="/">
        <Route path="skills" component={SkillIndex}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </ApolloProvider>
);

render(router, document.getElementById('app'));
