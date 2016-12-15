import "phoenix_html"

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router'

import Relay from 'react-relay'
import useRelay from 'react-router-relay'

import SkillIndex from './pages/skills/SkillIndex'

const ViewerQuery = {
  viewer: () => Relay.QL`query { viewer }`
};

const router = (
  <Router
    history={ browserHistory }
    render={ applyRouterMiddleware(useRelay) }
    environment={ Relay.Store }
  >
    <Route path="/">
      <Route
        path="skills"
        component="SkillIndex"
        queries={ViewerQuery}>
      </Route>
    </Route>
  </Router>
);

render(router, document.getElementbyId('app'));
