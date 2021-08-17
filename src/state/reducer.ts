import application from './application/reducer'
import { combineReducers } from '@reduxjs/toolkit'
import transactions from './transactions/reducer'
import user from './user/reducer'

const reducer = combineReducers({
  application,
  user,
  transactions,
})

export default reducer
