import React from 'react'
import { connect } from 'react-redux'

import UsernamePicker from 'app/components/UsernamePicker'

const App = ({ children, username }) => {
  return <div className="app">
    {username ? children : <UsernamePicker />}
  </div>
}

export default connect(
  ({ username }) => ({ username })
)(App)
