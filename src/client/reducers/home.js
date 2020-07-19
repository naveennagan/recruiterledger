// Reducers are nothing but just pure functions

export default (state = {}, action = { type: "" }) => {
    switch (action.type) {
      case 'MOUNTING':
        return { name: 'Mounting' }
      case 'MOUNTED':
        return { name: 'Mounted ' }
      default:
        return state
    }
  }