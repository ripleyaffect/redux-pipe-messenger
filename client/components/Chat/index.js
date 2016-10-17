import React, { Component } from 'react'
import { connect } from 'react-redux'

import { messageSent } from 'app/actions'

import styles from './styles.css'

function djb2(str){
  var hash = 5381;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
  }
  return hash;
}

function hashStringToColor(str) {
  var hash = djb2(str);
  var r = (hash & 0xFF0000) >> 16;
  var g = (hash & 0x00FF00) >> 8;
  var b = hash & 0x0000FF;
  return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
}

const Message = ({ text, username }) => {
  return <p className={styles.chatMessage}>
    <span
        className={styles.chatMessageUsername}
        style={{ color: hashStringToColor(username) }}
    >{username}</span> {text}
  </p>
}

class MessageList extends Component {
  componentDidUpdate() {
    this.container.scrollTop = this.container.scrollHeight
  }

  render() {
    const { messages } = this.props

    return <div className={styles.chatMessageListContainer} ref={c => this.container = c}>
      <div className={styles.chatMessageList}>
        {messages.map((message, index) => <Message {...message} key={index} />)}
      </div>
    </div>
  }
}
const ConnectedMessageList = connect(({ messages }) => ({ messages }))(MessageList)


class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = { text: '' }
  }

  componentDidMount() {
    this.messageBox.focus()
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { dispatchMessageSent, username } = this.props
    const { text } = this.state

    if (text) {
      this.props.dispatchMessageSent({ text, username })
      this.setState({ text: '' })
    }
  };

  handleMessageChange = (e) => {
    this.setState({ text: e.target.value })
  };

  render() {
    const { messages } = this.props
    const { text } = this.state

    return <div className={styles.chat}>
      <ConnectedMessageList />
      <form className={styles.chatForm} onSubmit={this.handleSubmit}>
        <input
            onChange={this.handleMessageChange}
            ref={c => this.messageBox = c}
            type="text"
            value={text} />
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
