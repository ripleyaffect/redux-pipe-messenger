import { combineReducers } from 'redux'

export const messages = (state=[], action) => {
  switch (action.type) {
    case 'MESSAGE_SENT':
    case 'MESSAGE_RECIEVED':
      return state.concat(action.data)
    default:
      return state
  }
}

export const username = (state='', action) => {
  switch (action.type) {
    case 'USERNAME_PICKED':
      return action.data.username
    default:
      return state
  }
}

export const app = combineReducers({
  messages,
  username,
})
