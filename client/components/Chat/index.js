import React, { Component } from 'react'
import { connect } from 'react-redux'

import { messageSent } from 'app/actions'

const Message = ({ text, username }) => {
  return <p>{username}: {text}</p>
}

class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = { text: '' }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { dispatchMessageSent, username } = this.props
    const { text } = this.state

    this.props.dispatchMessageSent({ text, username })
    this.setState({ text: '' })
  };

  handleMessageChange = (e) => {
    this.setState({ text: e.target.value })
  };

  render() {
    const { messages } = this.props
    const { text } = this.state

    return <div className="chat">
      {messages.map((message, index) => <Message {...message} key={index} />)}
      <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleMessageChange} value={text} />
        <input type="submit" value="Send" />
      </form>
    </div>
  }
}

export default connect(
  state => state,
  {
    dispatchMessageSent: messageSent,
  }
)(Chat)
