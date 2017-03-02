import * as ManageServiceActions from './manage_service'
import * as ServiceViewActions from './service_view'
import * as AddServiceActions from './add_service'
import * as EditServiceActions from './edit_service'
import * as StylistsActions from './stylists'

export const ActionCreators = Object.assign({},
  ManageServiceActions,
  ServiceViewActions,
  AddServiceActions,
  EditServiceActions,
  StylistsActions
);
