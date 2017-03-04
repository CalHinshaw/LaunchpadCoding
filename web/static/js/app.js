//import "phoenix_html"

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import CodeAnalyser from './components/CodeAnalyser'
import SkillIndex from './pages/skills/SkillIndex'
import ShowSkill from './pages/skills/ShowSkill'
import NotFound from './pages/misc/NotFound'

const client = new ApolloClient();

const router = (
  <ApolloProvider client={client}>
    <Router history={ browserHistory } >
      <Route path="/">
        <Route path="analyse" component={CodeAnalyser} />
        <Route path="skills" component={SkillIndex}/>
        <Route path="skills/:skillId" component={ShowSkill}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </ApolloProvider>
);

render(router, document.getElementById('app'));
