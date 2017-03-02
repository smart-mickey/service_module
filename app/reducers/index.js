import { combineReducers } from 'redux';
import * as ManageServicesReducer from './manage_service'
import * as ServiceViewReducer from './service_view'
import * as AddServiceReducer from './add_service'
import * as StylistsReducer from './stylists'
import * as EditServiceReducer from './edit_service'

export default combineReducers(Object.assign(
  ManageServicesReducer,
  ServiceViewReducer,
  AddServiceReducer,
  StylistsReducer,
  EditServiceReducer
));
