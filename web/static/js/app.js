import "phoenix_html"

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router'

import Relay from 'react-relay'
import useRelay from 'react-router-relay'

import SkillIndex from './pages/skills/SkillIndex'
import NotFound from './pages/misc/NotFound'

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
        component={SkillIndex}
        queries={ViewerQuery}>
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

render(router, document.getElementById('app'));
