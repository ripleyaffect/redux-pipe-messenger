import React, { Component } from 'react'
import { connect } from 'react-redux'

import { usernamePicked } from 'app/actions'

class UsernamePicker extends Component {
  componentWillMount() {
    let name = prompt("Pick a username")
    while (!name) {
      name = prompt("Username cannot be empty. Pick a username")
    }
    this.props.dispatchUsernamePicked(name)
  }

  render() {
    return <div />
  }
}

export default connect(
  null,
  {
    dispatchUsernamePicked: usernamePicked
  }
)(UsernamePicker)
