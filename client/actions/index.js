
export const messageSent = (data) => ({
  type: 'MESSAGE_SENT',
  pipe: true,
  data,
})

export const usernamePicked = (username) => ({
  type: 'USERNAME_PICKED',
  pipe: true,
  data: { username },
})
