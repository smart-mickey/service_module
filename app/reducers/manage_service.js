import * as types from '../actions/types'
import createReducer from '../lib/createReducer'

export const Screen = createReducer('', {
  [types.APP_STARTED](state, action) {
    return action.name
  },
});