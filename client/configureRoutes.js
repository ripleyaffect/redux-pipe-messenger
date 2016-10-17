import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from 'app/components/App'
import Chat from 'app/components/Chat'

export default () => {
  return <Route path="/" component={App}>
    <IndexRoute component={Chat} />
  </Route>
}